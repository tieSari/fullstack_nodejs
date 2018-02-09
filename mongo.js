const mongoose = require('mongoose')

const url = 'mongodb://r....a:r...8@ds227858.mlab.com:27858/puhelinluettelo'


mongoose.connect(url)
mongoose.Promise = global.Promise

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

if(process.argv[2] == undefined)
{
    Person
  .find({})
  .then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}
else
{
const person = new Person({
    name: process.argv[2],
    number: process.argv[3]
  })

  console.log(`lisätään henkilö ${person.name} numero ${person.number} luetteloon`)
  
  person
    .save()
    .then(response => {
        console.log(`lisätty henkilö ${person.name} numero ${person.number} luetteloon`)
      mongoose.connection.close()
    })
}

// const formatPerson = (person) => {
//     return {
//       name: person.name,
//       number: person.number,
//       id: person._id
//     }
//   }

 
  // module.exports = Person