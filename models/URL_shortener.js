const mongoose = require('mongoose')
const Schema = mongoose.Schema
const URL_shortenerSchema = new Schema({
  URL: { type: String, required: true },
  shortURL: { type: String, required: true },
})
module.exports = mongoose.model('URL_shortener', URL_shortenerSchema)