const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const URL_shortener = require('./modules/URL_shortener')

router.use('/', home)
router.use('/URL_shortener', URL_shortener)

module.exports = router