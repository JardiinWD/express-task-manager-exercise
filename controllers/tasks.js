// Importing Task Model
const Task = require('../models/Task')

/** Controller function for handling the retrieval of all tasks
 * @param {Object} req - Express request object. Contains information about the client's request.
 * @param {Object} res - Express response object. Used to send a response to the client.
 */
const getAllTasks = async (req, res) => {
    try {
        // Get All Tasks from MongoDB Collection
        const tasks = await Task.find({})
        // Retrieves all tasks from the MongoDB collection
        res.status(200).json({
            status: 'success',
            amount: tasks.length,
            tasks
        })
    } catch (error) {
        // Handling errors and sending an error response
        res.status(500).json({
            status: 'fail',
            mongodb_error: error.code, // MongoDB error code, if applicable
            message: error.message // Error message describing the issue
        });
    }
}

/** Controller function for creating a new task
 * @param {Object} req - Express request object. Contains information about the client's request.
 * @param {Object} res - Express response object. Used to send a response to the client.
 */
const createTask = async (req, res) => {
    try {
        // Creating a new task in the database based on the request body
        const task = await Task.create(req.body);
        // Sending a successful response with the created task
        res.status(201).json({
            task // Sends the created task in the response
        });
    } catch (error) {
        // Handling errors and sending an error response
        res.status(500).json({
            status: 'fail',
            mongodb_error: error.code, // MongoDB error code, if applicable
            message: error.message // Error message describing the issue
        });
    }
}


/** Controller function for retrieving a single task by its ID
 * @param {Object} req - Express request object. Contains information about the client's request.
 * @param {Object} res - Express response object. Used to send a response to the client.
 */
const getTask = async (req, res) => {
    try {
        // Extracting the task ID from the request parameters
        const { id: taskID } = req.params;
        // Retrieving a task from the database based on the task ID
        const task = await Task.findOne({
            _id: taskID
        });
        // Handling the case where no task with the specified ID is found
        if (!task) {
            // Sends a failure response if no task is found
            return res.status(404).json({
                status: 'fail',
                message: `No task with id : ${taskID}`
            });
        }

        // Sending a successful response with the retrieved task
        res.status(200).json({
            status: 'success',
            tasks: task
        });
    } catch (error) {
        // Handling errors and sending an error response
        res.status(500).json({
            status: 'fail',
            mongodb_error: error.code, // MongoDB error code, if applicable
            message: error.message // Error message describing the issue
        });
    }
}


/** Controller function for updating a single task by its ID
 * @param {Object} req - Express request object. Contains information about the client's request.
 * @param {Object} res - Express response object. Used to send a response to the client.
 */
const updateTask = async (req, res) => {
    try {
        // Extracting the task ID from the request parameters
        const { id: taskID } = req.params;
        // Updating a task in the MongoDB collection by finding it based on its ID and applying the changes from the request body
        const task = await Task.findOneAndUpdate(
            { _id: taskID }, // Specifies the criteria for finding the task by its ID
            req.body, // Contains the updated data to be applied to the found task
            {
                new: true, // Returns the modified document rather than the original
                runValidators: true // Ensures that validation rules defined in the schema are applied
            }
        );

        // Handling the case where no task with the specified ID is found
        if (!task) {
            // Sends a failure response if no task is found
            return res.status(404).json({
                status: 'fail',
                message: `No task with id : ${taskID}`
            });
        }

        // Sending a successful response with the retrieved task
        res.status(200).json({
            id: taskID,
            data: req.body
        })
    } catch (error) {
        // Handling errors and sending an error response
        res.status(500).json({
            status: 'fail',
            mongodb_error: error.code, // MongoDB error code, if applicable
            message: error.message // Error message describing the issue
        });
    }
}

/** Controller function for deleting a single task by its ID
 * @param {Object} req - Express request object. Contains information about the client's request.
 * @param {Object} res - Express response object. Used to send a response to the client.
 */
const deleteTask = async (req, res) => {
    try {
        // Extracting the task ID from the request parameters
        const { id: taskID } = req.params
        // Retrieving a task from the database based on the task ID
        const task = await Task.findOneAndDelete({
            _id: taskID
        })
        // Handling the case where no task with the specified ID is found
        if (!task) {
            // Sends a failure response if no task is found
            return res.status(404).json({
                status: 'fail',
                message: `Cannot find and delete the task with id : ${taskID}`
            });
        }
        // Sending a successful response with the retrieved task
        res.status(200).json({
            status: 'success',
            message: 'Task successfully deleted!',
            task,
        });

    } catch (error) {
        // Handling errors and sending an error response
        res.status(500).json({
            status: 'fail',
            mongodb_error: error.code, // MongoDB error code, if applicable
            message: error.message // Error message describing the issue
        });
    }
}

/** Controller function for updating a single task by its ID
 * @param {Object} req - Express request object. Contains information about the client's request.
 * @param {Object} res - Express response object. Used to send a response to the client.
 */
const editTask = async (req, res) => {
    try {
        // Extracting the task ID from the request parameters
        const { id: taskID } = req.params;
        // Updating a task in the MongoDB collection by finding it based on its ID and applying the changes from the request body
        const task = await Task.findOneAndUpdate(
            { _id: taskID }, // Specifies the criteria for finding the task by its ID
            req.body, // Contains the updated data to be applied to the found task
            {
                new: true, // Returns the modified document rather than the original
                runValidators: true, // Ensures that validation rules defined in the schema are applied
                overwrite: true
            }
        );

        // Handling the case where no task with the specified ID is found
        if (!task) {
            // Sends a failure response if no task is found
            return res.status(404).json({
                status: 'fail',
                message: `No task with id : ${taskID}`
            });
        }

        // Sending a successful response with the retrieved task
        res.status(200).json({
            id: taskID,
            data: req.body
        })
    } catch (error) {
        // Handling errors and sending an error response
        res.status(500).json({
            status: 'fail',
            mongodb_error: error.code, // MongoDB error code, if applicable
            message: error.message // Error message describing the issue
        });
    }
}


// Exporting the getAllTasks function to make it available for use in other parts of the application
module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    editTask
}
