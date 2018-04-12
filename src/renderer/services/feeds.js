import crypto from 'crypto'
import rp from 'request-promise-native'
import url from 'url'
import path from 'path'
import xml2js from 'xml2js'
import { format, isAfter } from 'date-fns'
import log from 'electron-log'
import store from '../store'

const hash = str =>
  crypto
    .createHash('sha256')
    .update(str, 'utf8')
    .digest()
    .toString('hex')

const parseFeed = xml => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, (err, result) => {
      if (err) {
        return reject(err)
      }

      try {
        const f = result.rss.channel[0]
        const link = f.link[0]
        let feed = {
          title: f.title[0],
          description: f.description[0],
          id: hash(link),
          link,
          url: null,
          lastChanged: new Date().toString()
        }

        let posts = []
        const items = f.item
        for (let i = 0; i < items.length; i++) {
          if (items[i].enclosure) {
            const postUrl = items[i].enclosure[0].$.url
            const parsedUrl = url.parse(postUrl)
            const filename = path.basename(parsedUrl.pathname)
            const guid = items[i].guid[0]._ || items[i].guid[0]
            const post = {
              id: hash(feed.id + guid + postUrl + items[i].pubDate[0]),
              feedId: feed.id,
              title: items[i].title[0],
              pubDate: items[i].pubDate[0],
              description: items[i].description ? items[i].description[0] : '',
              url: postUrl,
              filename,
              size: items[i].enclosure[0].$.length,
              isRead: false
            }
            posts.push(post)
          }
        }
        posts = filterOldPosts(posts)
        sortPosts(posts)
        resolve({feed, posts})
      } catch (e) {
        log.error('Parsing feed xml failed', e)
        log.error('Xml:', xml)
        reject(e)
      }
    })
  })
}

export const filterOldPosts = (posts) => {
  const min = store.getters.getIgnoreOlderThanDateTime
  return posts.filter(p => isAfter(format(p.pubDate), min))
}

export const fetchFeed = url => {
  log.debug(`Loading feed url ${url}`)
  const options = {
    url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.121 Safari/537.36 Vivaldi/1.95.1077.41'
    }
  }
  return rp(options)
    .then(parseFeed)
    .then(({feed, posts}) => ({feed: {...feed, url}, posts}))
}

export const sortPosts = posts => {
  posts.sort((a, b) => {
    const adate = new Date(a.pubDate)
    const bdate = new Date(b.pubDate)
    return adate === bdate ? 0 : adate < bdate ? 1 : -1
  })
}
