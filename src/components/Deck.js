import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Card from './Card';
import { createDeck, shuffleDeck } from './HelperFunction';
import Animated, {
  SlideInLeft,
  SlideInRight,
  SlideOutDown,
} from 'react-native-reanimated';

const Deck = ({
  setClickedCard,
  clickedCard,
  shuffle,
  setShuffle,
  cards,
  setCards,
  socket,
  rounds,
}) => {
  useEffect(() => {
    socket.current.on('shuffled', (newDeck) => {
      setCards(newDeck);
    });
  }, [shuffle]);

  return (
    <Animated.View
      entering={SlideInRight.duration(1500)}
      style={{
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {cards.map((card, index) => {
        // Determine the translation amount based on the card index
        const translateX = index * 5;
        const translateY = index * 1;

        return (
          <Animated.View
            entering={SlideInLeft.duration(1500)}
            exiting={SlideOutDown.duration(1500)}
            key={`${card.suit}-${card.value}-${index}`}
            style={{
              position: 'absolute',
              alignItems: 'center',
              // Apply the translation to the card
              transform: [{ translateX }, { translateY }],
            }}>
            <Card
              suit={card.suit}
              value={card.value}
              setClickedCard={setClickedCard}
              clickedCard={clickedCard}
              socket={socket}
              rounds={rounds}
            />
          </Animated.View>
        );
      })}
    </Animated.View>
  );
};

export default Deck;
