//import { Schema } from 'mongoose';

const mongoose = require('mongoose')
console.log(process.env.NODE_ENV)

if ( process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV !== 'production' ) {
    require('dotenv').config()
  }
const url = process.env.MONGODB_URI
//console.log(url)

mongoose.connect(url)
mongoose.Promise = global.Promise

var Schema = mongoose.Schema


const personSchema = new Schema({
    name:   String,
    number: String
})

 personSchema.statics.format = function(person)
 {
     const formattedPerson = { number: person.number, name: person.name, id: person._id }
     return formattedPerson
 }

 personSchema.query.byName = function(name)
 {
     return this.find({name: new RegExp(name, 'i')})
 }

const Person = mongoose.model('Person', personSchema);



 
   module.exports = Person