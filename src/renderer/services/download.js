import request from 'request'
import fs from 'fs'
import path from 'path'
import store from '../store'

export const download = (item) => {
  console.log('Starting download', item)
  let canceled = false

  const cancel = store.subscribe((mutation, state) => {
    if (state.Queue.cancels.indexOf(item.postId) !== -1 && !canceled) {
      canceled = true
      store.commit('removeCancel', item.postId)
      req.abort()
      updateStatus({downloadState: 'CANCELED', downloadProgress: 0, speed: 0, downloaded: 0})
      fs.unlinkSync(tmpFilename)
    }
  })

  if (!fs.existsSync(item.tempDir)) {
    console.log('Creating directory', item.tempDir)
    fs.mkdirSync(item.tempDir)
  }

  let downloaded = 0
  const updateStatus = (status) => {
    const base = {
      feedId: item.feedId,
      postId: item.postId
    }
    store.commit('updateStatus', Object.assign(base, status))
  }

  updateStatus({downloadState: 'DOWNLOADING', downloadProgress: 0, speed: 0, downloaded: 0})

  const tmpFilename = path.join(item.tempDir, `${item.file}.incomplete`)
  const filename = path.join(item.dir, item.file)
  let lastRefreshed

  const file = fs.createWriteStream(tmpFilename)
  file.on('close', () => {
    cancel()
    if (fs.existsSync(tmpFilename)) {
      if (!fs.existsSync(item.dir)) {
        console.log('Creating directory', item.dir)
        fs.mkdirSync(item.dir)
      }
      fs.renameSync(tmpFilename, filename)
      updateStatus({downloadState: 'FINISHED', downloadProgress: 100, speed: 0})
      store.commit('updatePostDownloaded', {feedId: item.feedId, postId: item.postId})
    }
  })

  let chunkStarted = Date.now()
  const chunks = []
  const req = request.get(item.url)
  req.on('response', response => {
    response.on('data', chunk => {
      downloaded += chunk.length
      const chunkSpeed =
        chunk.length / 1024 / ((Date.now() - chunkStarted) / 1000)
      if (chunkSpeed !== Infinity) {
        chunks.push(chunkSpeed)
      }
      chunkStarted = Date.now()
      while (chunks.length > 100) {
        chunks.shift()
      }
      if (!lastRefreshed || lastRefreshed < Date.now() - 500) {
        const progress = (100.0 * downloaded / item.size).toFixed(2)
        const speed = chunks.reduce((s, c) => s + c, 0) / chunks.length
        updateStatus({downloadState: 'DOWNLOADING', downloadProgress: progress, speed: speed.toFixed(2), downloaded})
        lastRefreshed = Date.now()
      }
    })
  })
  req.pipe(file)
}
