// Requiring the 'express' module
const express = require('express');
// Creating an instance of an Express Router
const router = express.Router();
// Requiring the 'tasks' controller functions
const {
    getAllTasks,
    getTask,
    updateTask,
    deleteTask,
    createTask
} = require('../controllers/tasks');

// Defining routes for task operations

/**
 * Route for retrieving all tasks and creating a new task
 * @route {GET} /tasks
 * @route {POST} /tasks
 * @param {Object} req - Express request object. Contains information about the client's request.
 * @param {Object} res - Express response object. Used to send a response to the client.
 */
router.route('/').get(getAllTasks).post(createTask);

/**
 * Route for retrieving, updating, and deleting a specific task by its ID
 * @route {GET} /tasks/:id
 * @route {PATCH} /tasks/:id
 * @route {DELETE} /tasks/:id
 * @param {Object} req - Express request object. Contains information about the client's request.
 * @param {Object} res - Express response object. Used to send a response to the client.
 */
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

// Exporting the router to make it available for use in other parts of the application
module.exports = router;
