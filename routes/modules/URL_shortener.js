const express = require('express')
const router = express.Router()

const URL_shortener = require('../../models/URL_shortener')
const generateShortURL = require('../../generate_shortURL')

// 產生 shortURL 並新增到資料庫 (若 URL 在資料庫中，則取出且不新增)
router.post('/', (req, res) => {
  const URL = req.body.URL
  const shortURL = generateShortURL()
// 輸入相同網址時，產生一樣的縮址
  URL_shortener.findOne(req.body)
    .lean()
    .then(URLItem => {
      if (URLItem) {
        res.render('index', { URL, shortURL: URLItem.shortURL })
      } else {
        URL_shortener.create({ URL, shortURL })
          .then(() => res.render('index', { URL, shortURL }))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
})

// 在瀏覽器中輸入 shortURL 時，導向原本的 URL
router.get('/:garbled', (req, res) => {
  const garbled = req.params.garbled
  URL_shortener.findOne({ shortURL: { $regex: garbled } })
    .lean()
    .then(URLItem => res.redirect(URLItem.URL))
    .catch(err => console.log(err))
})

module.exports = router