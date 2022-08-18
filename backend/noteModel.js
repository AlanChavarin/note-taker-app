const mongoose = require('mongoose')
const noteSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    text: String,
})

module.exports = mongoose.model('Notes', noteSchema)