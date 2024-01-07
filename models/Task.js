// Importing Mongoose
const mongoose = require('mongoose')

// INSERT COMMENT HERE
const TaskSchema = new mongoose.Schema({
    // INSERT COMMENT HERE
    name: String,
    // INSERT COMMENT HERE
    completed: Boolean
})

// INSERT COMMENT HERE
module.exports = mongoose.model('Task', TaskSchema)