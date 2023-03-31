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

export function currentUser(players, id) {
  return players.find((player) => player.id === id);
}

let tempTeam = '';

export const gameSittingStyle = (player, socket) => {
  const { team, position, name } = player;

  if (player.id === socket) {
    tempTeam = player.team;
    return `bottom-0  h-[220px]`;
  }
  if (player.id !== socket && player.team === tempTeam) {
    return 'z-50';
  }

  switch (position) {
    case 'east':
      return 'z-0 right-0';
    case 'west':
      return 'z-0';
    default:
      return null;
  }
};
export const shuffleCards = (cards) => {
  const shuffledCards = [...cards];

  for (let i = shuffledCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
  }

  return shuffledCards;
};

export function createDeck() {
  const suits = ['heart', 'spade', 'diamond', 'club'];
  const values = ['A', '9', '10', 'J', 'Q', 'K'];
  const deck = [];
  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push({ suit, value });
    });
  });
  return deck;
}
export const findPlayerWithHighestCard = (clickedCard) => {
  let highestCard = null;
  let playerWithHighestCard = null;

  for (let i = 0; i < clickedCard.length; i++) {
    const card = clickedCard[i].startingCard;
    const cardValue = card.value;
    let numericalValue = parseInt(cardValue);
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
    }
    if (!highestCard || numericalValue > highestCard.numericalValue) {
      highestCard = { ...card, numericalValue };
      playerWithHighestCard = clickedCard[i].player;
    }
  }

  return { playerWithHighestCard, highestCard };
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
