const express = require('express')
const router = express.Router()
const {getNotes, postNote, updateNote, deleteNote, getNote} = require('./noteController')

router.get('/:id', getNote) 

router.get('/', getNotes)

router.post('/', postNote)

router.put('/', updateNote)

router.delete('/', deleteNote)

module.exports = router