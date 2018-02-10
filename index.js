const express = require('express')
const app = express()
const Person = require('./models/person')
const cors = require('cors')
app.use(cors())
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const morgan = require('morgan')
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'))
app.use(express.static('build'))


morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body)
})

// let persons =  [
//     {
//       "name": "Martti Tienari",
//       "number": "040-123456",
//       "id": 2
//     },
//     {
//       "name": "Arto Järvinen",
//       "number": "040-123456",
//       "id": 3
//     },
//     {
//       "name": "Lea Kutvonen",
//       "number": "040-123456",
//       "id": 4
//     }
//   ]

  //  const formatPerson = (person) => {    
  // const formattedPerson = { number: person.number, name: person.name, id: person._id }
  
  //   return formattedPerson
  //     }

app.get('/api/persons', (req, res) => {
  //res.json(persons)
  Person
  .find({})
  .then(persons => {
    persons.forEach(person => {
      console.log(person)
    })
    res.json(persons.map(Person.format))
    mongoose.connection.close()
  })
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Person
  .findById(id)
  .then(person => {
      console.log(person)
    res.json(Person.format(person))
    mongoose.connection.close()
  })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Person
  .findById(id)
  .then(person => {
  Person
  .deleteOne(person)
  .then(deletedInfo => {
      console.log(deletedInfo)
    res.json(deletedInfo)
    mongoose.connection.close()
  })
})
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  console.log(body)
   if (body.name === undefined) {
    return res.status(400).json({error: 'name missing'})
  }
      if (body.number === undefined) {
     return res.status(400).json({error: 'number missing'})
      }

    // if(persons.map(person => person.name).includes(body.name)){
    //     return response.status(400).json({error: 'name must be unique'})
    // }

    const person = new Person({
      name: body.name,
      number: body.number
    })
  
    person
      .save()
      .then(savedPerson => {
        res.json(Person.format(savedPerson))
      })
  })



app.get('/info', (req, res) => {
  Person
  .find({})
  .then(persons => {
    res.send('<div>puhelinluettelossa '+persons.length +' henkilön tiedot</div>' +
    '<div>' + new Date() +'</div>')
    mongoose.connection.close()
  })
})

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})