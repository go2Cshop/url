const express = require('express')
const router = express.Router()

const URL_shortener = require('../../models/URL_shortener')
const generateShortURL = require('../../generate_shortURL')

// 產生 shortURL 並新增到資料庫 (若 URL 在資料庫中，則取出且不新增)
router.post('/', (req, res) => {
  const URL = req.body.URL
  const shortURL = generateShortURL()

  URL_shortener.findOne(req.body)
    .lean()
    .then(URLItem => {
      // 若 .findOne(req.body) 沒有找到，URLItem 為 null
      if (URLItem) {
        // 輸入相同網址時，產生一樣的縮址
        res.render('index', { shortURL: URLItem.shortURL, URL })
      } else {
        URL_shortener.create({ URL, shortURL })
          .then(() => res.render('index', { shortURL, URL }))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
})

// 在瀏覽器中輸入 shortURL 時，導向原本的 URL
router.get('/:garbled', (req, res) => {
  const garbled = req.params.garbled
  // 在所有的 URLItem 中，找到 shortURL 有包含特定字串的 URLItem
  URL_shortener.findOne({ shortURL: { $regex: garbled } })
    .lean()
    .then(URLItem => res.redirect(URLItem.URL))
    .catch(err => console.log(err))
})

module.exports = router