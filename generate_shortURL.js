function generateShortURL() {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'

  let collection = []
  collection = collection.concat(...lowerCaseLetters).concat(...upperCaseLetters).concat(...numbers)

  let garbled = ''
  for (let i = 0; i <= 4; i++) {
    const index = Math.floor(Math.random() * collection.length)
    garbled += collection[index]
  }

  const shortURL = 'http://localhost:3000/URL_shortener/' + garbled
  return shortURL
}

module.exports = generateShortURL