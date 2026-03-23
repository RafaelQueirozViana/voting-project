

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
























