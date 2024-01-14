// Importing Task Model
const Task = require('../models/Task')
// Importing the Async Wrapper
const asyncWrapper = require('../middleware/asyncWrapper')
// Importing custom error handler
const { createCustomError } = require('../errors/custom-error')


/** Controller function for handling the retrieval of all tasks
 * @param {Object} req - Express request object. Contains information about the client's request.
 * @param {Object} res - Express response object. Used to send a response to the client.
 */
const getAllTasks = asyncWrapper(async (req, res) => {
    // Get All Tasks from MongoDB Collection
    const tasks = await Task.find({})
    // Retrieves all tasks from the MongoDB collection
    res.status(200).json({
        status: 'success',
        amount: tasks.length,
        tasks
    })
})

/** Controller function for creating a new task
 * @param {Object} req - Express request object. Contains information about the client's request.
 * @param {Object} res - Express response object. Used to send a response to the client.
 */
const createTask = asyncWrapper(async (req, res) => {
    // Creating a new task in the database based on the request body
    const task = await Task.create(req.body);
    // Sending a successful response with the created task
    res.status(201).json({
        task // Sends the created task in the response
    });

    /* 
    catch (error) {
    // Handling errors and sending an error response
    res.status(500).json({
        status: 'fail',
        mongodb_error: error.code, // MongoDB error code, if applicable
        message: error.message // Error message describing the issue
    });
} */

})


/** Controller function for retrieving a single task by its ID
 * @param {Object} req - Express request object. Contains information about the client's request.
 * @param {Object} res - Express response object. Used to send a response to the client.
 */
const getTask = asyncWrapper(async (req, res, next) => {
    // Extracting the task ID from the request parameters
    const { id: taskID } = req.params;
    // Retrieving a task from the database based on the task ID
    const task = await Task.findOne({
        _id: taskID
    });
    // Handling the case where no task with the specified ID is found
    if (!task) return next(createCustomError(`No task with id : ${taskID}`, 404))

    // Sending a successful response with the retrieved task
    res.status(200).json({
        status: 'success',
        tasks: task
    });

    /* 
    catch (error) {
        // Handling errors and sending an error response
        res.status(500).json({
            status: 'fail',
            mongodb_error: error.code, // MongoDB error code, if applicable
            message: error.message // Error message describing the issue
        });
    }
    */

})


/** Controller function for updating a single task by its ID
 * @param {Object} req - Express request object. Contains information about the client's request.
 * @param {Object} res - Express response object. Used to send a response to the client.
 */
const updateTask = asyncWrapper(async (req, res) => {
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
    if (!task) return next(createCustomError(`No task with id : ${taskID}`, 404))

    // Sending a successful response with the retrieved task
    res.status(200).json({
        id: taskID,
        data: req.body
    })

    /* 
    catch (error) {
        // Handling errors and sending an error response
        res.status(500).json({
            status: 'fail',
            mongodb_error: error.code, // MongoDB error code, if applicable
            message: error.message // Error message describing the issue
        });
    } 
    */
})

/** Controller function for deleting a single task by its ID
 * @param {Object} req - Express request object. Contains information about the client's request.
 * @param {Object} res - Express response object. Used to send a response to the client.
 */
const deleteTask = asyncWrapper(async (req, res) => {
    // Extracting the task ID from the request parameters
    const { id: taskID } = req.params
    // Retrieving a task from the database based on the task ID
    const task = await Task.findOneAndDelete({
        _id: taskID
    })
    // Handling the case where no task with the specified ID is found
    if (!task) return next(createCustomError(`Cannot find and delete the task with id : ${taskID}`, 404))
    // Sending a successful response with the retrieved task
    res.status(200).json({
        status: 'success',
        message: 'Task successfully deleted!',
        task,
    });

    /* 
        catch (error) {
            // Handling errors and sending an error response
            res.status(500).json({
                status: 'fail',
                mongodb_error: error.code, // MongoDB error code, if applicable
                message: error.message // Error message describing the issue
            });
        }
    */

})

/** Controller function for updating a single task by its ID
 * @param {Object} req - Express request object. Contains information about the client's request.
 * @param {Object} res - Express response object. Used to send a response to the client.
 */
const editTask = asyncWrapper(async (req, res) => {
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
    if (!task) return next(createCustomError(`No task with id : ${taskID}`, 404))

    // Sending a successful response with the retrieved task
    res.status(200).json({
        id: taskID,
        data: req.body
    })

    /* 
    catch (error) {
        // Handling errors and sending an error response
        res.status(500).json({
            status: 'fail',
            mongodb_error: error.code, // MongoDB error code, if applicable
            message: error.message // Error message describing the issue
        });
    }
    */

})


// Exporting the getAllTasks function to make it available for use in other parts of the application
module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    editTask
}
