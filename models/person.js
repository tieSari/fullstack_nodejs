//import { Schema } from 'mongoose';

const mongoose = require('mongoose')

const url = 'mongodb://rautasa:raut2828@ds227858.mlab.com:27858/puhelinluettelo'


mongoose.connect(url)
mongoose.Promise = global.Promise

var Schema = mongoose.Schema


const personSchema = new Schema({
    name: String,
    number: String
})

 personSchema.statics.format = function(person)
 {
     const formattedPerson = { number: person.number, name: person.name, id: person._id }
     return formattedPerson
 }

const Person = mongoose.model('Person', personSchema);



 
   module.exports = Person