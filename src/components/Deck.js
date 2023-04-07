import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Card from './Card';
import { createDeck, shuffleDeck } from './HelperFunction';
import Animated, {
  SlideInLeft,
  SlideInRight,
  SlideOutDown,
} from 'react-native-reanimated';

const Deck = ({ setClickedCard, clickedCard, cards, socket, roomID }) => {
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
        const translateX = index * 0;
        const translateY = index * 0;
        const rotate = -index * 7.9 + 'deg';

        return (
          <Animated.View
            entering={SlideInLeft}
            exiting={SlideOutDown}
            key={`${card.suit}-${card.value}-${index}`}
            style={{
              position: 'absolute',
              alignItems: 'center',
              transformOrigin: 'left bottom',
              // Apply the translation to the card
              transform: [{ translateX }, { translateY }, { rotate }],
            }}>
            <Card
              suit={card.suit}
              value={card.value}
              setClickedCard={setClickedCard}
              clickedCard={clickedCard}
              socket={socket}
              position={'deck'}
              roomID={roomID}
            />
          </Animated.View>
        );
      })}
    </Animated.View>
  );
  s;
};

export default Deck;
