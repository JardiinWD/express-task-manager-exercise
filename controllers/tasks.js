

/** Controller function for handling the retrieval of all tasks
 * @param {Object} req - Express request object. Contains information about the client's request.
 * @param {Object} res - Express response object. Used to send a response to the client.
 */
const getAllTasks = (req, res) => {
    // Sending a simple response indicating the retrieval of all items
    res.send('All items');
}

// Exporting the getAllTasks function to make it available for use in other parts of the application
module.exports = {
    getAllTasks
}
