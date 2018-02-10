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
//const mongoose = require('mongoose')


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


app.get('/api/persons', (req, res) => {
  Person
  .find({})
  .then(persons => {
    persons.forEach(person => {
      console.log(person)
    })
    res.json(persons.map(Person.format))
    //mongoose.connection.close()
  })
   .catch(error => {
     console.log(error)
     res.status(500).send({ error: 'persons get did not succeed' })
   })
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Person
  .findById(id)
  .then(person => {
    if(person){
      console.log(person)
    res.json(Person.format(person))
    }
    else{
      res.status(404).end()
    }
    //mongoose.connection.close()
  })
  .catch(error => {
    console.log(error)
    res.status(400).send({ error: 'malformatted id' })
  })
})

app.put('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const body = req.body
  const person = {
    name: body.name,
    number: body.number
  }

  Person
  .findByIdAndUpdate(id, person, {new: true})
    .then(savedPerson => {
        console.log(person)
        res.json(Person.format(savedPerson))
       // mongoose.connection.close()
      })
      .catch(error => {
        console.log(error)
        res.status(400).send({ error: 'malformatted id' })
      })
})

app.delete('/api/persons/:id', (request, response) => {
  Person
    .findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      response.status(400).send({ error: 'malformatted id' })
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
      .catch(error => {
        console.log(error)
        res.status(500).send({ error: 'person save did not succeed' })
      })
  })



app.get('/info', (req, res) => {
  Person
  .find({})
  .then(persons => {
    res.send('<div>puhelinluettelossa '+persons.length +' henkilön tiedot</div>' +
    '<div>' + new Date() +'</div>')
    //mongoose.connection.close()
  })
})

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})