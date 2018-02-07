const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const morgan = require('morgan')
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'))


morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body)
})


let persons =  [
    {
      "name": "Martti Tienari",
      "number": "040-123456",
      "id": 2
    },
    {
      "name": "Arto Järvinen",
      "number": "040-123456",
      "id": 3
    },
    {
      "name": "Lea Kutvonen",
      "number": "040-123456",
      "id": 4
    }
  ]


app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if ( person ) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const personsLeft = persons.splice(id,1)

  if ( personsLeft.length > 0  ) {
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body)
   if (body.name === undefined) {
    return response.status(400).json({error: 'name missing'})
  }
     if (body.number === undefined) {
    return response.status(400).json({error: 'number missing'})
     }

    if(persons.map(person => person.name).includes(body.name)){
        return response.status(400).json({error: 'name must be unique'})
    }

function generateId()
{
    return Math.floor((Math.random() * 10000))
}

 const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }
persons = persons.concat(person)

  response.json(person)
  
})



app.get('/info', (req, res) => {
  res.send('<div>puhelinluettelossa '+persons.length +' henkilön tiedot</div>' +
  '<div>' + new Date() +'</div>')
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})