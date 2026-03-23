// const express = require('express');
// const app = express();

// const { open } = require('sqlite');
// const sqlite3 = require('sqlite3');

// const path = require('path');

// const projectFolder = path.join(__dirname, '..')

// let db;

// app.use(express.static(path.join(projectFolder, 'styles')))
// app.use(express.urlencoded({ extended: true }));



// async function loadDatabase() {
//     db = await open({ filename: 'data.db', driver: sqlite3.Database });

//     await db.exec(`CREATE TABLE IF NOT EXISTS usuarios (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         nome TEXT,
//         idade INTEGER
//         )`)

//     app.listen(3000, () => {
//         console.log(`server running in the port 3000`);
//     })
// }

// loadDatabase()

// app.get('/', (req, res) => {
//     res.sendFile(path.join(projectFolder, 'index.html'))
// });

// app.post('/cadastro', async (req, res) => {
//     const { name, age } = req.body;
//     await db.run(`INSERT INTO usuarios (nome, idade) VALUES (?, ?)`, [name, age]);

//     res.send(`<h1>Sucess Added the user ${name} with de age ${age}</h1>`)

// });



// app.get('/usuarios', async (req, res) => {
//     const usersList = await db.all('SELECT * FROM usuarios');
//     res.json(usersList)
// })

const express = require("express");
const app = express();

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require('path');

const projectFolder = path.join(__dirname, '..');

let db;

app.use(express.static(path.join(projectFolder, "styles")));
app.use(express.urlencoded({ extended: true }));

async function initDatabase() {
    db = await open({ filename: './data.db', driver: sqlite3.Database });
    await db.exec(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER
        )`);

    app.listen(3000, () => {
        console.log("Server running in the port 3000");
    })

}

initDatabase();

app.get('/', (req, res) => {
    res.sendFile(path.join(projectFolder, "form.html"));
})


app.post('/sign', async (req, res) => {
    const { name, age } = req.body;
    await db.run(`INSERT INTO users (name, age) VALUES (?, ?)`, [name, age]);
    res.send("data sended")
})

app.get('/users', async (req, res) => {
    const usersList = await db.all('SELECT * FROM users')
    res.json(usersList);
})
























