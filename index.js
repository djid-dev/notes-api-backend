const express = require('express')
const logger = require('./middleware/loggerMiddleware')
const notFoundMiddleware = require('./middleware/notFoundMiddleware')

const cors = require('cors')

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2022-01-10',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2022-01-11',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2022-01-12',
    important: true
  },
  {
    id: 4,
    content: 'Lorem ipsum dolor sit amet   elit. Quisquam, quos.',
    date: '2022-01-12',
    important: true
  }
]

const app = express()

app.use(cors())

app.use(express.json())

app.use(logger)

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find((note) => note.id === id)

  note ? res.json(note) : res.status(404).end()
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter((note) => note.id !== id)
  res.status(204).end()
})

app.post('/api/notes', (req, res) => {
  const note = req.body

  if (!note.content || !note) {
    return res.status(400).json({ error: 'note.content is missing' })
  }

  const ids = notes.map((note) => note.id)

  const maxId = Math.max(...ids)
  const newNote = {
    id: maxId + 1,
    content: note.content,
    date: new Date().toISOString(),
    important: typeof note.important !== 'undefined' ? note.important : false
  }
  notes = notes.concat(newNote)
  res.status(201).json(newNote)
})

app.use(notFoundMiddleware)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
