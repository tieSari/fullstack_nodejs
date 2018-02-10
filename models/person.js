const mongoose = require('mongoose')

const url = 'mongodb://rautasa:raut2828@ds227858.mlab.com:27858/puhelinluettelo'


mongoose.connect(url)
mongoose.Promise = global.Promise

const Person = mongoose.model('Person', {
  name: String,
  number: String
})


 
   module.exports = Person