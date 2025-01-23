const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'test',
    database: 'fusyc'
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
            res.redirect('http://localhost:5173/index.html');
        } else {
            console.log("Login Falho");
            res.redirect('http://localhost:5173/login.html');
        }
    });
});

app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    
    const query = "INSERT INTO users (Username, Password) VALUES (?, ?)";
    connection.query(query, [username, password], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
        console.log("User registered successfully", result);
        res.redirect('http://localhost:5173');
    });
});

app.get('/', (req, res) => { 
    console.log("Connected to the server!");
    res.send("Server is running");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
