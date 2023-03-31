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

const createDeck = () => {
  const suits = ['spade', 'heart', 'diamond', 'club'];
  const values = ['A', '9', '10', 'J', 'Q', 'K'];
  const deck = [];

  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push({ suit: suits[i], value: values[j] });
    }
  }

  return deck;
};

const shuffleDeck = (deck) => {
  const shuffledDeck = [...deck];
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }
  return shuffledDeck;
};

const getFilteredDeck = (deck, clickedCards) => {
  const filteredDeck = deck.filter(
    (card) =>
      !clickedCards?.some(
        (clicked) =>
          clicked?.startingCard?.suit === card.suit &&
          clicked?.startingCard?.value === card.value,
      ),
  );

  // Get the clicked card by finding the last card in the clickedCards array
  const clickedCard = clickedCards[clickedCards.length - 1];

  // Remove the clicked card from the filtered deck
  const newDeck = filteredDeck.filter(
    (card) =>
      !(
        card.suit === clickedCard?.startingCard.suit &&
        card.value === clickedCard?.startingCard.value
      ),
  );

  return { filteredDeck: newDeck, clickedCard };
};

function popCardFromDeck(deck) {
  if (deck.length === 0) {
    // If the deck is empty, return null
    return null;
  }
  const poppedCard = deck.pop();

  // Update the deck state

  return { poppedCard, deck };
}

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
      socket.seat = '';
      if (!sockets[room]) {
        sockets[room] = {};
        sockets[room].players = [];
        sockets[room].start = false;
      }
      const player = {
        room: socket.room,
        name: socket.name,
        seat: socket.seat,
        id: socket.id,
      };
      sockets[room].players = [...sockets[room].players, player];
      io.in(room).emit('player_count', io.sockets.adapter.rooms.get(room).size);
      io.to(room).emit('current_player', player);
      io.in(room).emit('all_players', sockets[room].players);
      io.in(room).emit('update', `${name} has joined room ${room}`);
      callback({
        success: true,
        players: sockets[room].players,
        playerDetails: player,
      });
      console.log(`${name} joined room ${room}`);
    } catch (err) {
      callback({ success: false, message: err.message });
      console.log(err.message);
    }
  });

  ////////////////

  socket.on('get_deck', () => {
    if (deck.length === 0) {
      deck = shuffleDeck(createDeck());
    }
    io.emit('receive_deck', deck);
  });

  socket.on('card_clicked', (clickedCard) => {
    const data = popCardFromDeck(deck); // assuming 'deck' is already defined
    const player = socket.id;
    const updatedClickedCard = [
      ...clickedCard,
      { startingCard: data.poppedCard, player },
    ];
    socket.emit('card_popped', data.poppedCard);
    io.emit('update_clicked_cards', updatedClickedCard);
    io.emit('update_deck', {
      user: socket.id,
      card: data.poppedCard,
      deck: data.deck,
    }); // emit to all clients
  });

  // socket.on('update_clicked_cards', (updatedClickedCards) => {
  //   console.log(`Clicked cards updated: ${updatedClickedCards}`);
  //   io.emit('update_clicked_cards', updatedClickedCards);
  // });

  socket.on('seat_update', (updatedSeats) => {
    // Broadcast the updated seats to all connected users
    io.emit('seat_update', updatedSeats);
  });

  //share shuffled cards
  socket.on('shuffle_deck', (cards) => {
    deck = shuffleDeck(cards);
    io.emit('shuffled_deck', deck);
  });

  //disconnect
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
