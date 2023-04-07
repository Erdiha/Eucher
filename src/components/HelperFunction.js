export const seatStyles = (position) => {
  switch (position) {
    case 'north':
      return '-top-16 left-1/2 -translate-x-9 ';
    case 'south':
      return '-bottom-16 left-1/2 -translate-x-9';
    case 'east':
      return 'top-1/2 -right-10 -translate-y-14';
    case 'west':
      return 'top-1/2 -translate-y-14 -left-10';
    default:
      return null;
  }
};

export const arrangeSeats = (seats, currentUserId) => {
  const currentUserSeat = seats.find((seat) => seat.playerID === currentUserId);

  if (currentUserSeat.id === 1 && currentUserSeat.position === 'south') {
    return seats;
  }

  const numSeats = seats.length;
  const seatCopy = [...seats];

  const offset = (currentUserSeat.id - 1) * -1; // calculate the offset for rotating the seats
  const rotatedSeats = seatCopy.map((seat) => {
    const newSeatId = ((seat.id - 1 + offset + numSeats) % numSeats) + 1; // calculate the new seat ID after rotation
    let newPosition = seat.position;

    if (currentUserSeat.position === 'north' && seat.position === 'west') {
      newPosition = 'south';
    } else if (
      currentUserSeat.position === 'south' &&
      seat.position === 'east'
    ) {
      newPosition = 'north';
    } else if (
      currentUserSeat.position === 'east' &&
      seat.position === 'north'
    ) {
      newPosition = 'west';
    } else if (
      currentUserSeat.position === 'west' &&
      seat.position === 'south'
    ) {
      newPosition = 'east';
    }

    return {
      ...seat,
      id: newSeatId,
      position: newPosition,
    };
  });

  return rotatedSeats;
};

/////////currentuser/////////

export function currentUser(players, id) {
  return players?.find((player) => player?.id === id);
}

let tempTeam = '';

export const findPlayerWithHighestCard = (clickedCard, allPlayers) => {
  const startingCards = clickedCard.map((card) => card.startingCard);
  // console.log(
  //   'this is in find player with highest card',

  //   startingCards,
  // );
  let highestCard = 0;
  let playerWithHighestCard = null;
  let winnerCard = null;

  for (let i = 0; i < clickedCard.length; i++) {
    const card = clickedCard[i].startingCard;
    const user = clickedCard[i].player;

    const cardValue = card.value;

    let numericalValue = null;

    // console.log('this is the card value', cardValue);
    switch (cardValue) {
      case 'A':
        numericalValue = 14;
        break;
      case 'K':
        numericalValue = 13;
        break;
      case 'Q':
        numericalValue = 12;
        break;
      case 'J':
        numericalValue = 11;
        break;
      default:
        numericalValue = parseInt(cardValue);
    }
    // console.log('this is the numerical value', numericalValue);
    if (numericalValue > highestCard) {
      highestCard = numericalValue;
      playerWithHighestCard = user;
      winnerCard = card;
    }
  }

  const winner = allPlayers.find(
    (player) => player.id === playerWithHighestCard,
  ).name;
  // console.log('this is the player with highest card', winner);
  return { winner, winnerCard };
};

export const shuffleDeck = (newCards) => {
  for (let i = newCards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let temp = newCards[i];
    newCards[i] = newCards[j];
    newCards[j] = temp;
  }
  return newCards;
};

export const findUser = (allPlayers, player) => {
  return allPlayers.find((p) => p.name === player);
};

export const sittingCSS = (id) => {
  switch (id) {
    case 1:
      return '-bottom-0';
    case 2:
      return '-left-10 -rotate-90';
    case 3:
      return '-top-0';
    case 4:
      return '-right-10 -rotate-90';
    default:
      return null;
  }
};

export const names = [
  'Bruce',
  'Clark',
  'Diana',
  'Hal',
  'Erdi',
  'Erdem',
  'Fatma',
  'Furkan',
  'Gizem',
  'Gül',
  'Gülşah',
  'Gülşen',
  'Gülsüm',
];
