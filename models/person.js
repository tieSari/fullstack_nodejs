//import { Schema } from 'mongoose';

const mongoose = require('mongoose')
const url = process.env.MONGODB_URI


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