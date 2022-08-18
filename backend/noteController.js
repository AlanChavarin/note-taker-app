const e = require('express');
const asyncHandler = require('express-async-handler')
const Note = require('./noteModel')

const getNote = asyncHandler(async (req, res) => {
    const note = await Note.find({_id: req.params.id})
    res.status(200).json(note)
})

const getNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({})
    res.status(200).json(notes)
})

const postNote = asyncHandler(async (req, res) => {
    console.log(req.body)
    if(!req.body.name){
        res.status(400)
        throw new Error('Please add a name field')
    }

    const note = await Note.create({
        name: req.body.name,
        text: req.body.text
    })

    res.status(200).json(note)
    
})

const updateNote = asyncHandler(async (req, res) => {
    if(!req.body.id){
        res.status(400)
        throw new Error('Please add an id field')
    }
    const note = await Note.findById(req.body.id)
    if(!note){
        res.status(400)
        throw new Error('Note with given id was not found.')
    }

    const updatedNote = await Note.findByIdAndUpdate(req.body.id, req.body, {new: true})

    res.status(200).json(updatedNote)

})

const deleteNote = asyncHandler(async (req, res) => {
    if(!req.body.id){
        res.status(400)
        throw new Error('Please add an id field')
    }
    const note = await Note.findById(req.body.id)
    if(!note){
        res.status(400)
        throw new Error('Note with given id was not found.')
    }

    await Note.findByIdAndDelete(req.body.id)

    res.status(200).json(note)
})

module.exports = {
    getNotes,
    postNote,
    updateNote,
    deleteNote,
    getNote
}