const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors')

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'test',
    database: 'fusyc'
});

let loginSuccessful = "false"
let query

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173'
}))

app.post('/api/login', (req, res) => {
    
    const { username, password } = req.body;
    
    const query = "SELECT * FROM users WHERE Username = ? AND Password = ?";
    connection.query(query, [username, password], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }

        if (result.length > 0) {
            console.log("Login Concluído!");
            loginSuccessful = "true"
            res.json({success: loginSuccessful})
        } else {
            loginSuccessful = "false"
            console.log("Login Falho");
            res.json({success: loginSuccessful})
        }
    });
});

app.post('/api/register', (req, res) => {
    const { username, password } = req.body;

    query = "SELECT * FROM users WHERE Username = ?";
    connection.query(query, [username], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }

        else if(result.length == 0) {
            query = "INSERT INTO users (Username, Password) VALUES (?, ?)";
            connection.query(query, [username, password], (err, result) => {
                if (err) {
                    console.error("Database error:", err);
                    console.log("ERROR : ", err);
                    return res.status(500).json({ success: false, message: "Internal server error" });
                }
        console.log("User registered successfully", result);
        res.redirect('http://localhost:5173/login.html');
        });}
        else {
            success = false;
        }
    })
    
    
});

app.get('/', (req, res) => { 
    console.log("Connected to the server!");
    res.send("Server is running");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
