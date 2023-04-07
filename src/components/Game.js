import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { sittingCSS, currentUser, arrangeSeats } from './HelperFunction';
import Card from '../components/Card';
import Deck from '../components/Deck';

const Game = ({ globalVariables, gameData }) => {
  const {
    allPlayers,
    socket,
    roomID,
    dealer,
    cards,
    setClickedCard,
    clickedCard,
    playerDetails,
    seats,
  } = globalVariables;

  useEffect(() => {}, [allPlayers, socket.current]);

  const Item = ({ p, index }) => {
    console.log('index', index, 'p in Item:', p);

    return (
      <View
        className={`absolute flex justify-center items-center ${sittingCSS(
          p?.id,
        )}`}>
        <Text
          className={`flex- text-2xl text-gray-300 bg-gray-800/80 rounded-full p-2 `}>
          {p?.player === dealer ? `👑${p?.player}` : p?.player}
        </Text>
        <View>
          {playerDetails?.hand?.cards?.map((card) => (
            <Card
              key={`${card.suit}-${card.value}-${index}`}
              suit={card.suit}
              value={card.value}
              socket={socket}
              position={p.seatPosition}
              roomID={roomID}
            />
          ))}
        </View>
      </View>
    );
  };
  console.log('seats are in game', seats);
  console.log('playerDetails are in game', allPlayers);
  return (
    <View className='flex-1 h-full w-full justify-center items-center'>
      <Text className='text-2xl text-white absolute top-5 left-5 rounded-full p-2 border-gray-300 border-2'>
        {currentUser(allPlayers, socket.current.id)?.name}
      </Text>
      <Text className='text-2xl text-white absolute top-5 right-5 rounded-full p-2 border-gray-300 border-2'>
        {`dealer is ${dealer}`}
      </Text>
      <View className='h-[80%] w-[80%] rounded-full bg-green-500/30 border-8 border-gray-300 relative justify-center items-center'>
        <View className='flex-1 bg-white'>
          <Deck
            setClickedCard={setClickedCard}
            clickedCard={clickedCard}
            cards={cards}
            socket={socket}
            roomID={roomID}
          />
          <Text className='absolute text-white'>{cards?.length}</Text>
        </View>
        {seats.map((item, index) => {
          console.log('seat arragemnt ', item);
          return <Item p={item} key={index} index={index} />;
        })}
      </View>
    </View>
  );
};

export default Game;
