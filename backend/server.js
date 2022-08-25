const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'UPDATE', 'DELETE', 'PATCH', 'OPTIONS', 'PUT']
}))
app.listen(process.env.PORT, () => {
    console.log("App started on port " + process.env.PORT)
})
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//connect to database
mongoose.connect(process.env.MONGODB_URI, () => {
    console.log('connected to database!')
})

app.use('/api/notes', require('./routes/noteRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('frontend/build'))
}