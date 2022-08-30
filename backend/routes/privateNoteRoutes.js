const express = require('express')
const router = express.Router()
const {getNotes, postNote, updateNote, deleteNote, getNote} = require('../controllers/privateNoteController')
const {protect} = require('../middleware/authMiddleware')

//router.get('/usernotes', protect, getUserNotes)
router.get('/', protect, getNotes)

router.get('/:id', protect, getNote) 


router.post('/', protect, postNote)

router.put('/', protect, updateNote)

router.delete('/', protect, deleteNote)

module.exports = router