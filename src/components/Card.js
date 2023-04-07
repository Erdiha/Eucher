import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  FlipInEasyY,
  FlipInYRight,
  FlipInYLeft,
} from 'react-native-reanimated';
const Card = ({
  suit,
  value,
  clickedCard,
  socket,
  position,
  roomID,
  flipped,
}) => {
  const color = suit === 'heart' || suit === 'diamond' ? 'red' : 'black';
  const [showFront, setShowFront] = useState(flipped);
  const [gameStartedCard, setGameStartedCard] = useState(true);
  let anim = null;
  // const cardMap = new Map([
  //   ['Two', '🂢'],
  //   ['Three', '🂣'],
  //   ['Four', '🂤'],
  //   ['Five', '🂥'],
  //   ['Six', '🂦'],
  //   ['Seven', '🂧'],
  //   ['Eight', '🂨'],
  //   [9, '🂩'],
  //   [10, '🂪'],
  //   ['J', '🂫'],
  //   ['Q', '🂭'],
  //   ['K', '🂮'],
  //   ['A', '🂡'],
  // ]);
  // const suit = ['🂡', '🂢', '🂣', '🂤',]

  useEffect(() => {
    socket.current.on('game_started', (data) => {
      setGameStartedCard(data.start);
    });
  }, [clickedCard]);

  const toggleShowFront = () => {
    const item = { suit, value };
    const player = socket.current.id;
    let pcount = 0;

    console.log('player clickcard', clickedCard);

    if (clickedCard?.length < 2) {
      const isUserCard = clickedCard?.some((card) => card.player === player);
      socket.current.on('player_count', (count) => {
        pcount = count;
      });
      if (isUserCard) {
        setShowFront(!showFront);
        anim = !showFront ? FlipInYRight : FlipInYLeft;
      } else {
        const updatedClickedCard = [
          ...clickedCard,
          { player, startingCard: { suit: suit, value: value } },
        ];

        socket.current.emit('card_clicked', updatedClickedCard, roomID);
      }
    } else {
      setShowFront(!showFront);
    }
  };

  const cardStyle = {
    east: {
      height: 70,
      width: 50,
      size: 12,
      transform: [{ rotate: '-90deg' }],
    },
    west: {
      height: 70,
      width: 50,
      size: 12,
      transform: [{ rotate: '90deg' }],
    },
    north: {
      height: 70,
      width: 50,
      size: 12,
      transform: [{ rotate: '0deg' }],
    },
    south: {
      height: 120,
      width: 80,
      size: 24,
      transform: [{ rotate: '0deg' }],
    },
    deck: {
      height: 120,
      width: 80,
      size: 24,
      transform: [{ rotate: '0deg' }],
    },
    medium: {
      height: 85,
      width: 60,
      size: 20,
      transform: [{ rotate: '0deg' }],
    },
    big: {
      height: '100%',
      width: '100%',
      size: 40,
      transform: [{ rotate: '0deg' }],
    },
  };

  return (
    <Animated.View
      entering={anim}
      style={{
        backgroundColor: 'white',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        position: 'relative',
        ...cardStyle[position],
      }}
      onTouchEnd={toggleShowFront}>
      {showFront ? (
        <>
          <View style={{ position: 'absolute', top: 10, left: 10 }}>
            <MaterialCommunityIcons
              name={`cards-${suit}`}
              size={cardStyle[position].size}
              color={color}
            />
          </View>
          <View
            style={{
              transform: [{ rotate: '180deg' }],
              position: 'absolute',
              bottom: 10,
              right: 10,
            }}>
            <MaterialCommunityIcons
              name={`cards-${suit}`}
              size={cardStyle[position].size}
              color={color}
            />
          </View>
          <Text
            style={{
              fontSize: cardStyle[position].size,
              fontWeight: 'bold',
              color,
            }}>
            {value}
          </Text>
        </>
      ) : (
        <Image
          source={require('../../cards/BACK.png')}
          className='flex-1 cover-fill'
          style={{
            height: '100%',
            width: '100%',

            borderRadius: 10,
          }}
        />
      )}
    </Animated.View>
  );
};

export default Card;
