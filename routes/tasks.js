// Requiring the 'express' module
const express = require('express');
// Creating an instance of an Express Router
const router = express.Router();
// Requiring the 'getAllTasks' function from the 'tasks' controller
const { getAllTasks } = require('../controllers/tasks');

// Defining a route for the root path ('/')
// Handling GET requests on the root path by calling the 'getAllTasks' controller function
router.route('/').get(getAllTasks);

// Exporting the router to make it available for use in other parts of the application
module.exports = router;
