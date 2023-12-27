// Requiring the 'express' and 'morgan' modules
const express = require('express')
const morgan = require('morgan')
// Creating an Express application
const app = express()
// Use morgan
app.use(morgan('dev'))
const tasks = require(`${__dirname}/routes/tasks`)

// Middleware
app.use(express.json())


// Routes
app.get('/api/v1/hello', (req, res) => {
    res.send('Task Manager App')
})

app.use('/api/v1/tasks', tasks)

// Routes Structure

// app.get('/api/v1/tasks')         - get all the tasks
// app.post('/api/v1/tasks')        - create a new task
// app.get('/api/v1/tasks/:id')     - get a single task
// app.patch('/api/v1/tasks/:id')   - update task
// app.delete('/api/v1/tasks/:id')  - delete task


// Setting the server to listen on port 6575
const port = 6575
app.listen(port, () => {
    console.log(`Server is listening on port : ${port}`)
})
