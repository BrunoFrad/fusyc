const mysql = require('mysql')
const fs = require('fs')

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database: 'fusyc'
});
  
connection.connect(); 

connection.query('SELECT Usernames, Passwords FROM users', function(err, result, fields) {
    if (err) throw err;
    console.log(result)
});
  
connection.end();

const express = require('express')
const app = express()

app.get('/api/login', (req, res) => {
    console.log("Login request received!")
})

app.get('/', (req, res) => { 
    console.log("Connected to the server!")
})

app.listen(3000)