const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId
const noteSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    text: String,
    owner: ObjectId,
    public: Boolean
})

module.exports = mongoose.model('Notes', noteSchema)