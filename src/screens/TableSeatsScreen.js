import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect } from 'react';
import { ThemedButton } from 'react-native-really-awesome-button';
import Animated, { BounceInLeft, SlideInLeft } from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import { seatStyles, currentUser } from '../components/HelperFunction';

const TableSeatsScreen = ({ navigation, globalVariables }) => {
  const {
    socket,
    seats,
    roomID,
    playerNames,
    allPlayers,
    playerDetails,
    setSeats,
    setAllPlayers,
    setCards,
  } = globalVariables;

  const checkAllSeatsTaken = () => {
    return seats.filter((seat) => seat.taken).length === 2;
  };

  React.useState(() => {
    socket.current.emit('current_player');
  }, []);

  useEffect(() => {
    socket.current.on('seat_update', (res) => setSeats(res));
    // socket.on('join success', (res) => console.log(res));
    // socket.on('join fail', (res) => console.log(res));
    socket.current.on('all_players', (res) => {
      setAllPlayers(res);
    });
  }, [socket]);
  useEffect(() => {
    socket.current.emit('get_deck');

    // Server-side code to handle the 'get_deck' event and send the deck to the client
    socket.current.on('receive_deck', (deck) => {
      console.log('deck in table', deck);
      setCards(deck); // do something with the deck
    });
  }, []);

  useEffect(() => {
    if (allPlayers?.length === 2 && checkAllSeatsTaken()) {
      navigation.navigate('Game');
    }
  }, [allPlayers, seats, socket, playerNames, navigation]);

  const handleSeatPress = (id) => {
    const updatedSeats = seats.map((seat) =>
      seat.id === id
        ? {
            ...seat,
            taken: !seat.taken,
            player: seat.taken
              ? null
              : currentUser(allPlayers, socket.current.id).name,
            team:
              seat.position === 'north' || seat.position === 'south'
                ? 'team1'
                : 'team2',
          }
        : seat,
    );

    socket.current.emit('seat_update', updatedSeats, roomID);
  };

  console.log('seats', seats, 'player details', playerDetails);

  return (
    <ImageBackground
      source={require('../../assets/deck-of-cards3.jpg')}
      className={`flex-1 items-center justify-center bg-cover relative`}>
      <Animated.View className=' absolute right-3 top-4'>
        <Text className='text-md flex-1 bg-white/60 border-black/10 rounded-xl self-end flex justify-end p-2 uppercase italic font-semibold text-gray-900 tracking-widest'>
          {currentUser(allPlayers, socket.current.id).name}
        </Text>
      </Animated.View>
      <Animated.View
        entering={BounceInLeft}
        className='relative bg-white/20 w-[75%] h-[65%] rounded-[30px] border-black/50 border-[8px] justify-center items-center'>
        {seats.map((seat, index) => (
          <TouchableOpacity
            disabled={allPlayers.length < 2}
            backgroundColor='#e5e7eb'
            key={seat.id}
            className={`h-[110px] w-[75px] rounded-[10px] absolute flex justify-center items-center bg-black/60 p-2
      border-2 border-white/90
      ${seatStyles(seat.position)} ${
              seat.taken ? 'opacity-20 bg-white/50 border-black/50' : ''
            }`}
            onPress={() => !seat.taken && handleSeatPress(seat.id)}>
            <Text
              className={`text-center text-md font-bold text-white absolute ${
                seat.taken ? 'opacity-100' : 'opacity-100'
              }`}>
              {seat.taken ? seat.player : 'EMPTY'}
            </Text>
          </TouchableOpacity>
        ))}

        <View className='bg-black/80 w-[50%] min-h-[30%] flex absolute rounded'>
          <View className='p-2 space-y-2'>
            <Text className='text-gray-300 '>ROOM </Text>
            <Text className='text-gray-100 border-[1px] border-gray-500   p-1'>
              {roomID}
            </Text>
          </View>
          <View className=' text-center m  p-2 w-full'>
            <View className='text-gray-100 text-md font-semibold flex-col w-full'>
              <Text className='font-semibold border-[1px] border-gray-200 p-1 text-gray-100 tracking-wider text-center'>
                PLAYERS
              </Text>
              {allPlayers?.map((item, index) => {
                return (
                  <Animated.View key={item.id} entering={SlideInLeft}>
                    <Text
                      className='font-medium p-1 border-b-[1px] text-center border-gray-500 text-gray-100 bg-black/50'
                      key={index}>
                      {item.name}
                    </Text>
                  </Animated.View>
                );
              })}
            </View>
          </View>

          <View className='flex relative bg-black/40 w-full h-24 justify-center items-center space-y-2'>
            <Text className='text-white font-normal text-lg text-center border-red-500 border-2  p-2'>{`${
              allPlayers.length < 2 ? 'Waiting Users' : 'Choose Seat'
            }`}</Text>
            {allPlayers.length < 2 && (
              <ActivityIndicator
                animating={allPlayers.length < 2}
                size='large'
                color='white'
                Text='waiting all users'
              />
            )}
          </View>
        </View>
      </Animated.View>
    </ImageBackground>
  );
};

export default TableSeatsScreen;
