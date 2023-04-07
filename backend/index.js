const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const port = 3000;

let rooms = {};
let sockets = [];
let deck = [];

class Deck {
  constructor() {
    this.deck = [];
    this.reset(); //Add 24 cards to the deck
    this.shuffle(); //Suffle the deck
  } //End of constructor

  reset() {
    this.deck = [];
    const suits = ['heart', 'diamond', 'club', 'spade'];
    const values = ['A', 9, 10, 'J', 'Q', 'K'];

    for (let suit in suits) {
      for (let value in values) {
        this.deck.push({ suit: suits[suit], value: values[value] });
      }
    }
  } //End of reset()

  shuffle() {
    let numberOfCards = this.deck.length;
    for (var i = 0; i < numberOfCards; i++) {
      let j = Math.floor(Math.random() * numberOfCards);
      let tmp = this.deck[i];
      this.deck[i] = this.deck[j];
      this.deck[j] = tmp;
    }
  } //End of shuffle()

  deal(num) {
    const cards = [];

    for (let i = 0; i < num; i++) {
      cards.push(this.deck.pop());
    }
    return cards;
  } //End of deal()

  isEmpty() {
    return this.deck.length == 0;
  } //End of isEmpty()

  length() {
    return this.deck.length;
  } //End of length()
} //End of Deck Class

///////////////////// SOCKET.IO //////////////////////

io.on('connect_error', (err) => {
  console.log(`connect_error due to ${err.message}`);
});

io.on('connection', (socket) => {
  console.log(`a user connected: ${socket.id}`);
  const ip =
    socket.handshake.headers['x-forwarded-for'] ||
    socket.conn.remoteAddress.split(':')[3];
  console.log(ip);

  //////////

  socket.on('join_or_create', ({ room, name }, callback) => {
    try {
      socket.join(room);
      socket.name = name;
      socket.room = room;
      socket.seat = null;

      if (!sockets[room]) {
        sockets[room] = {
          player: {},
          players: [],
          deck: [],
          start: false,
          dealer: '',
          suit: '',
          discard: [],
        };
      }
      const player = {
        id: socket.id,
        name,
        seatID: socket.seat,
        seatPosition: '',
        room,
        clickedCard: {},
        hand: {
          discard: [],
          cards: [],
          pickedCard: '',
        },
        dealer: false,
        turn: false,
        seatArrangement: [
          { seatID: 1, seatPosition: 'south', name: '', id: '', team: 'team1' },
          { seatID: 3, seatPosition: 'north', name: '', id: '', team: 'team1' },
          { seatID: 2, seatPosition: 'west', name: '', id: '', team: 'team2' },
          { seatID: 4, seatPosition: 'east', name: '', id: '', team: 'team2' },
        ],
      };

      sockets[room].player[socket.id] = player;
      sockets[room].players.push(player);

      io.in(room).emit('player_count', io.sockets.adapter.rooms.get(room).size);
      io.in(room).emit('all_players', sockets[room].players);
      io.in(room).emit('update', `${name} has joined room ${room}`);

      const response = {
        success: true,
        playerDetails: sockets[room].player[socket.id],
        players: sockets[room].players,
      };

      // console.log('currentplayer', sockets[room].player[socket.id]);

      callback(response);

      console.log(`${name} joined room ${room}`);
    } catch (err) {
      const response = {
        success: false,
        message: err.message,
      };

      callback(response);
      console.log(err.message);
    }
  });

  /////////////////////////////////////////////////

  ///start game///////////////////////////////////

  /////////////////////////////////////////////////

  socket.on('start_game', (room) => {
    try {
      sockets[room].start = true;
      sockets[room].deck = new Deck();

      // deal 5 cards to each player
      Object.values(sockets[room].player).forEach((player) => {
        player.hand.cards = sockets[room].deck
          .deal(5)
          .map((card) => ({ ...card }));
        sockets[room].players.push(player);
      });
      console.log('all player in server', sockets[room].players);

      const dealer = sockets[room].dealer;
      io.in(room).emit('game_started', {
        dealer,
        playerData: sockets[room].player[socket.id],
        deck: sockets[room].deck,
        start: sockets[room].start,
        allPlayers: sockets[room].players,
      });
    } catch (error) {
      console.error(`Error starting game in room ${room}:`, error);
    }
  });

  ////////////////////////////////////////////////////////

  // socket.on('save_players_data', (allPlayers, roomID) => {
  //   sockets[roomID].player[socket.id] = allPlayers.find(
  //     (p) => p.id === socket.id,
  //   );
  //   io.to(roomID).emit('players_data_saved', sockets[roomID].player[socket.id]);
  // });

  ////////////////////////////////////////////////////////////////

  socket.on('get_dealer', ({ playerId, roomID }) => {
    // Update the dealer state for the game room
    sockets[roomID].dealer = playerId;
    sockets[roomID].player[socket.id].isDealer = true;
    // Emit a 'dealer_set' event to all the players in the room
    io.in(roomID).emit('dealer_set', playerId);
  });

  ////////////////////////////////////////////////////////////

  socket.on(
    'take_seat',
    ({ userId, room, seat, allPlayers, playerDetails }) => {
      const player = sockets[room].players.find((p) => p.id === userId);

      if (!player) {
        console.error(`Player with ID ${userId} not found in room ${room}.`);
        return;
      }

      sockets[room].players = allPlayers;
      sockets[room].player[socket.id] = playerDetails;

      const updatedPlayers = sockets[room].players.map((p) => {
        if (p.id === player.id) {
          return {
            ...p,
            seatID: seat.id,
            seatPosition: seat.position,
            playerID: socket.id,
            seatArrangement: playerDetails.seatArrangement,
          };
        }
        return p;
      });

      console.log('player details are', sockets[room].player[socket.id]);
      io.in(room).emit('get_players', allPlayers, playerDetails);
      io.in(room).emit('updated_players', updatedPlayers);
    },
  );

  //////////////////////////////////////////////////////////

  // socket.on('sitting_arranged', (allPlayers, roomID) => {
  //   if (sockets[roomID]) {
  //     sockets[roomID].players = allPlayers;
  //     console.log('sitting arranged');
  //     io.in(roomID).emit('sitting_arranged', sockets[roomID].players);
  //   } else {
  //     console.log(`Room ${roomID} not found in sockets array`);
  //   }
  // });

  ////////////////////////////////////////////////////////////

  socket.on('card_clicked', (updatedClickedCard, roomID) => {
    const openCard = sockets[roomID].deck.pop(1);
    sockets[roomID].openCard = openCard;
    sockets[roomID].player[socket.id].clickedCard = updatedClickedCard;
    io.to(roomID).emit('clicked_card_updated', updatedClickedCard);
  });

  ////////////////////////////////////////

  // Update clickedCard in the backend and emit updated data to all clir
  socket.on('update', (props) => {
    const { roomID, allPlayers, clickedCard } = props;
    sockets[roomID].players = allPlayers;
    sockets[roomID].player[socket.id].clickedCard = clickedCard;
    io.to(roomID).emit('updated_data', {
      allPlayers,
      clickedCard,
      cards: sockets[roomID].deck,
      allPlayers: sockets[roomID].players,
    });
  });

  //////////////////////////////////////////////////////////////

  socket.on('get_deck', (room) => {
    const newDeck = new Deck();
    sockets[room].deck = newDeck.deck;
    io.emit('receive_deck', sockets[room].deck);
  });

  //////////////////////////////////////////////////////////////

  socket.on('seat_update', (updatedSeats) => {
    // Broadcast the updated seats to all connected users
    io.emit('seat_update', updatedSeats);
  });

  /////////////////////////////////////////////////////////////

  socket.on('update_all_players', (updatedPlayers, roomID) => {
    // broadcast the updated allPlayers array to all clients in the same room
    io.to(roomID).emit('all_players_updated', updatedPlayers);
  });

  //////////////

  //disconnect

  //////////

  //////////

  socket.on('leave_room', ({ name, room }) => {
    try {
      socket.leave(room);
      delete socket.room;
      delete socket.nickname;
      if (sockets[room]) {
        io.in(room).emit('update', `${name} has left room ${room}`);
        io.in(room).emit(
          'player_count',
          io.sockets.adapter.rooms.get(room).size,
        );
        sockets[room].names.splice(sockets[room].names.indexOf(name), 1);
        console.log(`${name} has left ${room}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  });
  console.log('All sockets', sockets);
});

server.listen(port, () => console.log('server running on port:' + port));
