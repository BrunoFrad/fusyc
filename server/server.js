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
    let successController = false;

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
        successController = true;
        return res.json({success : successController});
        });}
        else {
            successController = false;
            return res.json({success : successController});
        }

        console.log(successController)
        

    })
    
    
});

app.post('/api/editplaylist', (req, res) => {
    const { songlist, name } = req.body;
    query = "SELECT * FROM ? WHERE NAME = ?";
    songlist.forEach(song => {
        connection.query(query, [name, song], (err, result) => {
            if (result.length = 0) {
                query = 'INSERT INTO ? (NAME) VALUES (?)'
                connection.query(query, [name, song])
            }
        })


    });
})

app.post('/api/newplaylist', (req, res) => {

    const {name, songsArr} = req.body

    query = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = ?;"
    connection.query(query, [name] , (err, result) => {

        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }

        if(result.length > 0) {
            res.json({success : false});
        }else if (result == 0) {
            query = "CREATE TABLE " + name + " (NAME varchar(255), SONGS varchar(255));";
            connection.query(query, (err, result) => {
                console.log("table created")
                for(song in songsArr) {
                    console.log(songsArr[song])
                    connection.query("INSERT INTO " + name + " (NAME) " + "VALUES(" + songsArr[song] + ");");
                }
            });
            res.json({success : true});
        }
    })

})

app.get('/api/playlists', (req, res) => {
    const query = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='fusyc'";
    
    connection.query(query, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
        
        let responseContent = [];
        let pendingQueries = result.length;
        
        if (pendingQueries === 0) {
            return res.json({ result: responseContent });
        }
        
        result.forEach((table) => {
            if (table.TABLE_NAME !== 'users') {
                const songQuery = `SELECT NAME FROM ${table.TABLE_NAME}`;
                
                connection.query(songQuery, (err, resul) => {
                    if (err) {
                        console.error("Database error:", err);
                    }
                    
                    let songList = resul ? resul.map(row => row.NAME) : [];
                    
                    responseContent.push({
                        name: table.TABLE_NAME,
                        songs: songList,
                    });
                    
                    pendingQueries--;
                    if (pendingQueries === 0) {
                        res.json({ result: responseContent });
                    }
                });
            } else {
                pendingQueries--;
                if (pendingQueries === 0) {
                    res.json({ result: responseContent });
                }
            }
        });
    });
});


app.get('/', (req, res) => { 
    console.log("Connected to the server!");
    res.send("Server is running");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
