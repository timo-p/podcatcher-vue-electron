import crypto from 'crypto'
import rp from 'request-promise-native'
import url from 'url'
import path from 'path'
import xml2js from 'xml2js'

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
      const f = result.rss.channel[0]
      const link = f.link[0]
      let feed = {
        title: f.title[0],
        description: f.description[0],
        id: hash(link),
        link,
        url: null,
        lastChanged: new Date().toString(),
        posts: []
      }

      const items = f.item
      for (let i = 0; i < items.length; i++) {
        if (items[i].enclosure) {
          const postUrl = items[i].enclosure[0].$.url
          const parsedUrl = url.parse(postUrl)
          const filename = path.basename(parsedUrl.pathname)
          const post = {
            id: hash(feed.id + items[i].guid[0]._),
            title: items[i].title[0],
            pubDate: items[i].pubDate[0],
            description: items[i].description[0],
            url: postUrl,
            filename,
            size: items[i].enclosure[0].$.length,
            isRead: false
          }
          feed.posts.push(post)
        }
      }
      sortPosts(feed.posts)
      resolve(feed)
    })
  })
}

export const fetchFeed = url => {
  return rp(url)
    .then(parseFeed)
    .then(feed => Object.assign({}, feed, { url }))
}

export const sortPosts = posts => {
  posts.sort((a, b) => {
    const adate = new Date(a.pubDate)
    const bdate = new Date(b.pubDate)
    return adate === bdate ? 0 : adate < bdate ? 1 : -1
  })
}
