const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database: 'fusyc'
});


const app = express()
app.use(bodyParser.urlencoded({extended:true}))

app.get('/api/login', (req, res) => {
    console.log("Login request received!")
})

app.post('/api/register', (req, res) => {
    
    connection.connect()

    connection.query("INSERT INTO users (Username, Password) VALUES ('" + req.body.username + "', '" + req.body.password + "');", function (err, result, fields) {
        if (err) throw err;
        console.log(result)
    });

    connection.end()

})

app.get('/', (req, res) => { 
    console.log("Connected to the server!")
})

app.listen(3000)