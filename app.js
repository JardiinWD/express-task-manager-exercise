// Requiring the 'express' module
const express = require('express')
// Importing the dotenv package for environment variable configuration
const dotenv = require('dotenv');
// Configuring dotenv and specifying the path for the environment variables file
dotenv.config({ path: './config.env' })
// Creating an Express application
const app = express();
// Requiring the 'morgan' module 
const morgan = require('morgan');
// Use morgan
app.use(morgan('dev'))
// Requiring the tasks routes
const tasks = require(`${__dirname}/routes/tasks`)
// Requiring the 'connectDB' function from the 'db/connect' module
const connectDB = require(`${__dirname}/db/connect`);
// Middleware
app.use(express.json())
// Routes
app.use('/api/v1/tasks', tasks)

// Routes Structure

// app.get('/api/v1/tasks')         - get all the tasks
// app.post('/api/v1/tasks')        - create a new task
// app.get('/api/v1/tasks/:id')     - get a single task
// app.patch('/api/v1/tasks/:id')   - update task
// app.delete('/api/v1/tasks/:id')  - delete task

// Setting the MongoDB URI
const mongoDbUri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTER}/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
// Setting the server to listen on process.env.SERVER_PORT
const port = process.env.SERVER_PORT || 3375

// Function to start the server after connecting to the database
const start = async () => {
    try {
        // Connecting to the database
        await connectDB(mongoDbUri);
        // Starting the Express app and listening on the specified port
        app.listen(port, () => {
            console.log(`App is currently running on port: ${port}`);
        });
    } catch (error) {
        // Handling errors during the startup process
        console.error(error.message);
    }
}

// Calling the 'start' function to initiate the server startup process
start();



