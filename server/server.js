const express = require('express')
const app = express()

app.get('/api/login', (req, res) => {
    console.log("Login request received!")
})

app.get('/', (req, res) => { 
    console.log("Connected to the server!")
})

app.listen(3000)