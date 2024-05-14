import {createServer} from "http";
import {Server} from "socket.io";
import mysql from 'mysql';

const httpServer = createServer()

const io = new Server(httpServer, {
  cors: {
    origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5500", "http://127.0.0.1:5500"]
  }
})

io.on('connection', socket => {
  console.log(`User ${socket.id} connected`)

  socket.on('message', data => {
    io.emit('message', `${data}`)
  })

  socket.on('submit vote', data => {
    con.query(`INSERT INTO votes (username, sessionID, vote, hasVoted) VALUES ('${data.username}', '${data.sessionID}', '${data.selectedCard}', true)`, () => {
      io.emit('submit vote', data);
    });
  })
})

httpServer.listen(3500, () => console.log('listening on port 5500'))

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "ppdb"
});

// check if connection works

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//create the database, ppdb

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("CREATE DATABASE ppdb", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });
// });


//uncomment the database par of var con, create sessions table

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "CREATE TABLE sessions(sessionID VARCHAR(255), hostuserID VARCHAR(255))";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });

//create votes table

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "CREATE TABLE votes(username VARCHAR(12), sessionID VARCHAR(255), vote VARCHAR(2), hasVoted TINYINT(1))";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });