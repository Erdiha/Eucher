import React, { useEffect, useRef, useState } from 'react';
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Animated, {
  FlipInXDown,
  SlideInDown,
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
  SlideOutUp,
} from 'react-native-reanimated';
import Deck from './Deck';
import Card from './Card';
import {
  findPlayerWithHighestCard,
  currentUser,
  arrangeSeats,
} from '../components/HelperFunction';
import { ThemedButton } from 'react-native-really-awesome-button';

const WhoStarts = ({
  globalVariables,
  textAlert,
  clickedCard,
  setClickedCard,
}) => {
  const {
    cards,
    roomID,
    setCards,
    socket,
    allPlayers,
    setAllPlayers,
    setDealer,
  } = globalVariables;

  const dealerRef = useRef(null);
  const currentUserID = socket.current.id;

  if (clickedCard?.length === 2) {
    const { winner, winnerCard } = findPlayerWithHighestCard(
      clickedCard,
      allPlayers,
    );
    dealerRef.current = { player: winner, card: winnerCard };
    textAlert[2] = `Player ${winner} starts with ${winnerCard.value} of ${winnerCard.suit}`;

    // emit an event to set the dealer for the correct player
    socket.current.emit('get_dealer', { playerId: winner, roomID });
  }

  useEffect(() => {
    socket.current.on('dealer_set', (dealerId) => {
      setDealer(dealerId);
    });
  }, []);

  useEffect(() => {
    socket.current.on('clicked_card_updated', (updatedClickedCard) => {
      setClickedCard(updatedClickedCard);
      // Emit the updated clicked card data to all clients
      socket.current.emit('update', { roomID, allPlayers, clickedCard, cards });
    });
  }, [clickedCard]);

  useEffect(() => {
    socket.current.on('updated_data', (data) => {
      setAllPlayers(data.allPlayers);
      setCards(data.cards);
    });
  });

  // console.log('clickedCard', clickedCard);
  // console.log('all Playerssssssssssssss', allPlayers);
  // console.log('clicked cards', clickedCard);

  const startTheGame = () => {
    setTimeout(() => {
      ToastAndroid.show('Game starting in 1 second', ToastAndroid.SHORT);
      socket.current.emit('start_game', roomID);
    }, 1000);
  };
  return (
    <View className={`flex-1 items-center justify-center bg-cover `}>
      <Animated.View
        entering={FlipInXDown.springify()}
        className='h-40  justify-center items-center '>
        <Animated.View
          className='flex-1 mt-10'
          entering={SlideInRight}
          exiting={SlideOutLeft}>
          {currentUser(allPlayers, socket.current.id).name ===
          dealerRef?.current?.player ? (
            <ThemedButton
              onPress={() => startTheGame()}
              name='bruce'
              type='secondary'
              raiseLevel={0}
              borderRadius={0}
              borderWidth={2}
              size=''
              className={`text-gray-900 tracking-wide justify-center items-center w-40 `}>
              <Animated.View entering={SlideInLeft} exiting={SlideOutRight}>
                <Text className='text-gray-900'>
                  {`${
                    clickedCard?.length === 2
                      ? 'Start The Game'
                      : 'Waiting For Users'
                  }`}
                </Text>
              </Animated.View>
            </ThemedButton>
          ) : (
            <Text className='border-2 border-gray-400 text-gray-200 p-2'>
              Waiting {dealerRef?.current?.player} To Start The Game
            </Text>
          )}
        </Animated.View>

        <Text className='  bg-white text-yellow-800 p-2'>
          number of cards remain: {cards?.length}
        </Text>
      </Animated.View>
      <View className='flex-1 bg-white'>
        <Deck
          clickedCard={clickedCard}
          setClickedCard={setClickedCard}
          cards={cards}
          setCards={setCards}
          socket={socket}
          roomID={roomID}
        />
      </View>

      <Animated.View
        entering={SlideInLeft}
        exiting={SlideOutRight}
        className='flex-1 flex-row  flex-wrap gap-2 bg-black/10 rounded-3xl backdrop-blur-3xl justify-around'>
        {allPlayers?.map((player, index) => {
          const startingCard = clickedCard?.find(
            (item) => item.player === player.id,
          )?.startingCard;
          return (
            <View
              key={index}
              className='p-1 gap-1 bg-black/30 border-2 border-gray-200 w-[21%] h-[48%] relative items-center justify-center rounded-lg'>
              <Text className='font-bold text-gray-200 text-md ' key={index}>
                {player?.name}
              </Text>
              <View className='flex-1'>
                {startingCard ? (
                  <Card
                    suit={startingCard?.suit}
                    value={startingCard?.value}
                    position='medium'
                    socket={socket}
                    roomID={roomID}
                    flipped={true}
                    clickedCard={clickedCard}
                    key={`${startingCard.suit}-${startingCard.value}-${cards?.length}`}
                  />
                ) : (
                  <Text className='text-gray-400'>No card yet</Text>
                )}
              </View>
            </View>
          );
        })}

        <View className='  w-full h-32 mt-10 justify-center items-center space-y-2'>
          <Text className='text-white font-normal text-lg text-center border-red-500 border-2  p-2'>{`${
            clickedCard?.length === 2
              ? `${dealerRef.current.player + ' start the game please.'}`
              : 'Pick A Card'
          }`}</Text>
          {allPlayers?.length < 2 && (
            <ActivityIndicator
              animating={clickedCard?.length < 2}
              size='large'
              color='white'
              Text='waiting all users'
            />
          )}
        </View>
      </Animated.View>
    </View>
  );
};

export default WhoStarts;
