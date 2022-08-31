const asyncHandler = require('express-async-handler')
const Note = require('../models/noteModel')

const getNote = asyncHandler(async (req, res) => {
    const note = await Note.findOne({_id: req.params.id})
    if(!req.user._id.equals(note.owner)){
        console.log(1)
        res.status(400)
        throw new Error('You are not authorized to access this note.')
    }
    res.status(200).json({
        name: note.name,
        text: note.text
    })
})

const getNotes = asyncHandler(async (req, res) => {
    //console.log(req.user._id)
    if(!req.user._id){
        res.status(400)
        throw new Error('We did not get your user ID')
    }
    const notes = await Note.find({owner: req.user._id})
    res.status(200).json(notes)

})

const postNote = asyncHandler(async (req, res) => {
    //console.log('test')
    //console.log(req.body)
    if(!req.body.name){
    res.status(400)
    throw new Error('Please add a name field')
    }

    const note = await Note.create({
        name: req.body.name,
        text: req.body.text,
        owner: req.user._id,
        public: false
    })

    res.status(200).json(note)
})
    

const updateNote = asyncHandler(async (req, res) => {
    if(req.user._id.equals(req.body.id)){
        console.log('yeah')
    }
    if(!req.body.id){
        res.status(400)
        throw new Error('Please add an id field')
    }
    const note = await Note.findById(req.body.id)
    if(!note){
        res.status(400)
        throw new Error('Note with given id was not found.')
    }
    if(!note.owner.equals(req.user._id)){
        res.status(400)
        throw new Error('You are not authorized to access this note.')
    }
    const updatedNote = await Note.findByIdAndUpdate(req.body.id, req.body, {new: true})

    res.status(200).json(updatedNote)

})

const deleteNote = asyncHandler(async (req, res) => {
    console.log('delete note fired')
    if(!req.body.id){
    res.status(400)
    throw new Error('Please add an id field')
    }
    const note = await Note.findById(req.body.id)
    if(!note){
        res.status(400)
        throw new Error('Note with given id was not found.')
    }
    if(!req.user._id.equals(note.owner)){
        res.status(400)
        throw new Error('Not authorized to delete that note.')
    }
    
    await Note.findByIdAndDelete(req.body.id)

    res.status(200).json(note)

})

module.exports = {
    getNotes,
    postNote,
    updateNote,
    deleteNote,
    getNote,
    //getUserNotes
}