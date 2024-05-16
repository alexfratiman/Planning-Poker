import {createServer} from "http";
import {Server} from "socket.io";
import mysql from 'mysql2';

const httpServer = createServer()

const io = new Server(httpServer, {
  cors: {
    origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5500", "http://127.0.0.1:5500"]
  }
})

io.on('connection', socket => {
  console.log(`User ${socket.id} connected`)

  socket.on('submit vote', data => {
    console.log('vote received', data);
    // When a vote is received, update the database record for this user.
    // 
    con.query(`UPDATE votes SET vote = ${data.selectedCard}, hasVoted = true WHERE username = '${data.username}' AND sessionID = '${data.sessionID}'`, (err, result) => {
      console.log(err, result);
      // When each vote is recorded, let's check if all the votes have 
      // now been submitted in the session. 
      // 
      con.query(`SELECT * FROM votes WHERE sessionID='${data.sessionID}'`, (err, participants) => {
        console.log('vote status', participants);
        // Is p.hasVoted true for every participant in the session?
        if (participants.every((p) => p.hasVoted)) {
          console.log('vote complete');
          io.emit('vote complete', participants);
        } else {
          console.log('votes pending');
        }
      });
    });
  });

  // you join a session, we write to the database
  // you vote, we write to the database - the server checks if everyone has voted or not.
  // if everyone has voted, the server should emit all votes to all players.

  socket.on('join session', (data) => {
    console.log('session joined', data);
    con.query(`INSERT INTO votes (username, sessionID, vote, hasVoted) VALUES ('${data.username}', '${data.sessionID}', null, false)`, (err, result) => {
      console.log(err, result);
      // io.emit('join session', data);
    });
  });
});

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