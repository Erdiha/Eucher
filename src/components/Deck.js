import React from 'react';
import { View } from 'react-native';
import Card from './Card';

const Deck = () => {
  const suits = ['heart'];
  const values = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
  ];

  const cards = [];

  suits.forEach((suit) => {
    values.forEach((value) => {
      cards.push({ suit, value });
    });
  });

  return (
    <View
      style={{
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {cards.flatMap((card, index) => (
        <View
          key={`${card.suit}-${card.value}-${index}`}
          style={{
            position: 'absolute',
            zIndex: index,
            alignItems: 'center',
          }}>
          <Card suit={card.suit} value={card.value} />
        </View>
      ))}
    </View>
  );
};

export default Deck;
