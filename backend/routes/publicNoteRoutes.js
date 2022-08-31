const express = require('express')
const router = express.Router()
const {getNotes, getNote, updateNote, postNote, deleteNote} = require('../controllers/publicNoteController')

router.get('/', getNotes)

router.get('/:id', getNote)

router.post('/', postNote)

router.put('/', updateNote)

router.delete('/', deleteNote)

module.exports = router