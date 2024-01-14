// Importing Mongoose
const mongoose = require('mongoose');

// Defining the schema for the 'Task' model
const TaskSchema = new mongoose.Schema({
    // Field for the name of the task (assumed to be a string)
    name: {
        type: String, // Type of the 'name' field is a string
        required: [true, 'Must provide a name'], // 'name' field is required with a custom error message if not provided
        trim: true, // Trims leading and trailing whitespaces from the 'name' field
        maxlength: [20, 'Name can\'t be more than 20 characters!'], // Maximum length of the 'name' field is 20 characters with a custom error message
        unique: [true, 'Name must be unique!'] // 'name' field must be unique with a custom error message
    },
    // Field for the completion status of the task (assumed to be a boolean)
    completed: {
        type: Boolean, // Type of the 'completed' field is a boolean
        default: false // Default value for the 'completed' field is false
    }
});

// Creating and exporting the 'Task' model using the defined schema
module.exports = mongoose.model('Task', TaskSchema);
