import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Card = ({
  suit,
  value,
  setClickedCard,
  clickedCard,
  cardSize,
  socket,
}) => {
  const color = suit === 'heart' || suit === 'diamond' ? 'red' : 'black';
  const [showFront, setShowFront] = useState(true);

  const toggleShowFront = () => {
    const item = { suit, value };
    const player = socket.current.id;

    if (clickedCard.find((card) => card.player === player)) {
      // User has already clicked, do nothing
      return;
    } else {
      // User hasn't clicked, emit event and update clickedCard
      const updatedClickedCard = [
        ...clickedCard,
        { player, startingCard: { suit: suit, value: value } },
      ];

      socket.current.emit('card_clicked', updatedClickedCard);
    }
  };

  return (
    <View
      style={{
        height: cardSize === 'small' ? 60 : 120,
        width: cardSize === 'small' ? 40 : 80,
        backgroundColor: 'white',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        position: 'relative',
        transform: [{ rotate: cardSize === 'small' ? '90deg' : '0deg' }],
      }}
      onTouchEnd={toggleShowFront}>
      {showFront ? (
        <>
          <View style={{ position: 'absolute', top: 10, left: 10 }}>
            <MaterialCommunityIcons
              name={`cards-${suit}`}
              size={24}
              color={color}
            />
          </View>
          <View style={{ position: 'absolute', bottom: 10, right: 10 }}>
            <MaterialCommunityIcons
              name={`cards-${suit}`}
              size={24}
              color={color}
            />
          </View>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color }}>
            {value}
          </Text>
        </>
      ) : (
        <Image
          source={require('../../cards/BACK.png')}
          className='p-1'
          style={{
            height: '100%',
            width: '100%',
            borderRadius: 10,
          }}
        />
      )}
    </View>
  );
};

export default Card;
