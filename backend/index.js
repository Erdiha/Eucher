const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = 3000;

let allPlayers = [];
let allRooms = [];

io.on('connection', (socket) => {
  console.log(`a user connected: ${socket.id}`);

  socket.on('create game', ({ room, username },callback) => {
    socket.join(room);

    allRooms[room] = {
      players: [{ id: socket.id, name: username }],
      seats: [
        { id: 1, position: 'A1', playerId: null },
        { id: 2, position: 'A2', playerId: null },
        { id: 3, position: 'B1', playerId: null },
        { id: 4, position: 'B2', playerId: null },
        // add more seats as needed
      ],
      turn: null,
      cards: [],
    };
    allPlayers[socket.id] = { room, team: null, seat: null };
    console.log('allRooms', allRooms, 'allPlayers', allPlayers);
    io.to(room).emit('rooms', Object.keys(allRooms));

    // emit the updated players list to the user who creates the room
    io.to(socket.id).emit('players', allRooms[room].players);
    
    return callback({
      success: true,
      message: `Welcome ${username} to room ${room}`,
      players: allRooms[room].players,
    });
  });

  socket.on('join room', ({ room, username }, callback) => {
    if (Object.keys(allRooms).includes(room)) {
      socket.join(room);
      allRooms[room].players.push({ id: socket.id, name: username });
      allPlayers[socket.id] = { room, team: null, seat: null };
      console.log('allRooms', allRooms, 'allPlayers', allPlayers);

      // emit the updated player list to all users in the room
      io.to(room).emit('players', allRooms[room].players);

      return callback({
        success: true,
        message: `Welcome ${username} to room ${room}`,
        players: allRooms[room].players,
      });
    } else {
      return callback({
        success: false,
        message: `Room ${room} does not exist.`,
      });
    }
  });

  // socket.on('select seat', ({ room, seatId }) => {
  //   const player = allPlayers[socket.id];
  //   const roomSeats = allRooms[room].seats;
  //   const selectedSeat = roomSeats.find((seat) => seat.id === seatId);

  //   if (selectedSeat && !selectedSeat.playerId) {
  //     selectedSeat.playerId = player.id;
  //     player.seat = selectedSeat;
  //     io.to(room).emit('seat selected', {
  //       playerId: player.id,
  //       seat: selectedSeat,
  //     });
  //   }
  // });

  console.log('allRooms', allRooms, 'allPlayers', allPlayers);

  io.on('disconnect', function () {
    console.log('A user disconnected: ' + socket.id);
    allPlayers = allPlayers.filter((player) => player !== socket.id);
  });
});

server.listen(port, () => console.log('server running on port:' + port));
