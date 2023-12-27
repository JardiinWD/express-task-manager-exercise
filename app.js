// Requiring the 'express' and 'morgan' modules
const express = require('express')
const morgan = require('morgan')
// Creating an Express application
const app = express()
// Use morgan
app.use(morgan('dev'))

// Routes
app.get('/api/v1/hello', (req, res) => {
    res.send('Task Manager App')
})

// Setting the server to listen on port 6575
const port = 6575
app.listen(port, () => {
    console.log(`Server is listening on port : ${port}`)
})
