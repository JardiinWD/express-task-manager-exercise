

/** Controller function for handling the retrieval of all tasks
 * @param {Object} req - Express request object. Contains information about the client's request.
 * @param {Object} res - Express response object. Used to send a response to the client.
 */
const getAllTasks = (req, res) => {
    // Sending a simple response indicating the retrieval of all items
    res.send('Get all tasks');
}

/** Controller function for INSERT COMMENT HERE
 * @param {Object} req - Express request object. Contains information about the client's request.
 * @param {Object} res - Express response object. Used to send a response to the client.
 */
const createTask = (req, res) => {
    res.json(req.body)
}

/** Controller function for INSERT COMMENT HERE
 * @param {Object} req - Express request object. Contains information about the client's request.
 * @param {Object} res - Express response object. Used to send a response to the client.
 */
const getTask = (req, res) => {
    res.json({
        id: req.params.id
    })
}

/** Controller function for INSERT COMMENT HERE
 * @param {Object} req - Express request object. Contains information about the client's request.
 * @param {Object} res - Express response object. Used to send a response to the client.
 */
const updateTask = (req, res) => {
    res.send('Update a task')
}

/** Controller function for INSERT COMMENT HERE
 * @param {Object} req - Express request object. Contains information about the client's request.
 * @param {Object} res - Express response object. Used to send a response to the client.
 */
const deleteTask = (req, res) => {
    res.send('Delete a task')
}

// Exporting the getAllTasks function to make it available for use in other parts of the application
module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}
