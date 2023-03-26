const express = require('express');
const app = express();
const mysql = require('mysql')
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const path = require('path');
const rootDir = path.join(__dirname, '..');
/*
let con = mysql.createConnection({
    host: 'localhost',
    user: 'g4o2',
    database: 'sql12561191',
    password: 'g4o2'
});
*/
/*
var con = mysql.createConnection({
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12561191',
    database: 'sql12561191',
    password: process.env.DB_PASS
});
*/

app.use('/\*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Content-Type")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT")
    res.header("Access-Control-Allow-Credentials", "true")
    next()
})

app.use(express.static(path.join(rootDir, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(rootDir, 'public', 'index.html'));
});

app.get('/api', (req, res) => {
    data = [
        { message: "api" }
    ];
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data, null, 3));
});

io.on('connection', (socket) => {
    socket.on('user-connect', (username) => {
        console.log(`User ${username} connected`);
        // io.emit('user-connect', username);
        socket.broadcast.emit('user-connect', username);
    })
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
})

server.listen(3000, () => {
    console.log('listening on *:3000');
}); 