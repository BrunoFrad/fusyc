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
    const { songlist, name, genre, username, link } = req.body;
    let query = "SELECT * FROM ?? WHERE NAME = ?";
    for(index in songlist) {
        connection.query(query, [name, songlist[index]], (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).send('Database query error');
            }

            if (result && result.length === 0) {
                query = `INSERT INTO ?? (NAME, GENRE, Id) VALUES (?, ?, ?, ?)`;
                connection.query(query, [name, songlist[index], genre[index], username, link[index]], (err) => {
                    if (err) {
                        console.error('Error inserting song:', err);
                        return res.status(500).send('Error inserting song');
                    }
                    console.log(`Song ${songlist[index]} inserted`);
                });
            } else {
                console.log(`Song ${songlist[index]} already exists`);
            }

            console.log(genre);
        });
    }
});

app.post('/api/newplaylist', (req, res) => {
    const { name, songsArr, genre, username, link } = req.body;

    if (!name || !Array.isArray(songsArr) || !Array.isArray(genre) || songsArr.length !== genre.length) {
        return res.status(400).json({ success: false, message: "Invalid input data" });
    }

    const queryCheck = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = ?;";
    connection.query(queryCheck, [name], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }

        if (result.length > 0) {
            return res.json({ success: false, message: "Table already exists" });
        } else {
            const createTableQuery = `CREATE TABLE \`${name}\` (Id varchar(255), NAME varchar(255), LINK varchar(255), GENRE varchar(255))`;
            connection.query(createTableQuery, (err) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ success: false, message: "Internal server error" });
                }

                console.log("Table created successfully");

                for(index in songsArr) {
                    connection.query(`INSERT INTO ?? (NAME, GENRE, Id, LINK) VALUES (?, ?, ?, ?)`, [name, songsArr[index], genre[index], username, link[index]])
                }
                    if (err) {
                        console.error("Database error:", err);
                        return res.status(500).json({ success: false, message: "Internal server error" });
                    }

                })
            }
        });
});

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
                    
                    connection.query(`SELECT GENRE FROM ${table.TABLE_NAME}`, (err, result) => {

                        connection.query(`SELECT LINK FROM ${table.TABLE_NAME}`, (err, resu) => {

                            if (err) {
                                console.error("Database error:", err);
                            }
    
                            let genreList = result ? result.map(row => row.GENRE) : [];
                            let linkList = resu ? resu.map(row => row.LINK) : [];
                            console.log("Ok + ", linkList)
    
                            responseContent.push({
                                name: table.TABLE_NAME,
                                songs: songList,
                                genre : genreList,
                                link : linkList,
                            });
    
                            console.log(responseContent)
    
                            pendingQueries--;
                            if (pendingQueries === 0) {
                                res.json({ result: responseContent });
                            }

                        })

                    })
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
