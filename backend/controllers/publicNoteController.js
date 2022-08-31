const asyncHandler = require('express-async-handler')
const Note = require('../models/noteModel')

const getNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({public: true})
    res.status(200).json(notes)
})

const getNote = asyncHandler(async (req, res) => {
    if(!req.params.id){
        res.status(400)
        throw new Error('Please send a note id')
    }
    const note = await Note.findById(req.params.id)
    if(!note){
        res.status(400)
        throw new Error('Note with that id could not be found')
    }
    res.status(200).json(note)
})

const postNote = asyncHandler(async (req, res) => {
    if(!req.body.name){
        res.status(400)
        throw new Error('Please create a note with name')
    }
    const note = await Note.create({
        name: req.body.name,
        text: req.body.text,
        public: true
    })
    res.status(200).json(note)
})

const updateNote = asyncHandler(async (req, res) => {
    if(!req.body.id){
        res.status(400)
        throw new Error('Please send a note id')
    }
    const note = await Note.findByIdAndUpdate(req.body.id, req.body, {new: true})
    res.status(200).json(note)
})

const deleteNote = asyncHandler(async (req, res) => {
    if(!req.body.id){
        res.status(400)
        throw new Error('Please send a note id')
    }
    const note = await Note.findByIdAndDelete(req.body.id)
    res.status(200).json(note)
})


module.exports = {
    getNotes,
    getNote,
    updateNote,
    postNote,
    deleteNote
}         