
/** Controller function for handling the retrieval of all tasks
 * @param {Object} req - Express request object. Contains information about the client's request.
 * @param {Object} res - Express response object. Used to send a response to the client.
 */
const notFound = (req, res) => {
    res.status(404).send('Route does not exist')
}

module.exports = notFound