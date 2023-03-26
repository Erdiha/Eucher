import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import React, { useEffect } from 'react';
import { ThemedButton } from 'react-native-really-awesome-button';
import Animated, { BounceInLeft } from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';

const TableSeatsScreen = ({ navigation, globalVariables }) => {
  const {
    socket,
    teams,
    setTeams,
    roomID,
    playerNames,
    allPlayers,
    setAllPlayers,
  } = globalVariables;

  const [seats, setSeats] = React.useState([
    { id: 1, position: 'north', taken: false, player: '' },
    { id: 2, position: 'south', taken: false, player: '' },
    { id: 3, position: 'east', taken: false, player: '' },
    { id: 4, position: 'west', taken: false, player: '' },
  ]);

  const checkAllSeatsTaken = () => {
    return seats.filter((seat) => seat.taken).length === 4;
  };

  const northSouthSeats = [seats[0], seats[1]];
  const eastWestSeats = [seats[2], seats[3]];

  useEffect(() => {
    socket.on('join success', (res) => console.log(res));
    socket.on('join fail', (res) => console.log(res));
    socket.on('players', (res) => {
      setAllPlayers(res);
      if (allPlayers.length === 4 && checkAllSeatsTaken) {
        //socket.emit('seat update', updatedSeats);
        navigation.navigate('Game');
      }
    });
  }, [socket, navigation, allPlayers]);

  const handleSeatPress = (id) => {
    const updatedSeats = seats.map((seat) =>
      seat.id === id
        ? { ...seat, taken: !seat.taken, player: playerNames }
        : seat,
    );
    if (updatedSeats.filter((seat) => seat.taken).length === 4) {
      const northSouthPlayers = [];
      const eastWestPlayers = [];
      northSouthSeats.forEach((seat) => {
        if (seat.taken) {
          northSouthPlayers.push(seat.player);
        }
      });
      eastWestSeats.forEach((seat) => {
        if (seat.taken) {
          eastWestPlayers.push(seat.player);
        }
      });
      const newTeams = [
        { name: 'North/South', players: northSouthPlayers },
        { name: 'East/West', players: eastWestPlayers },
      ];
      setTeams(newTeams);
      socket.emit('teams', newTeams);
      // Send the updated seat arrangement to all users
      socket.emit('seat update', updatedSeats);
    }
    setSeats(updatedSeats);
  };
  const seatStyles = (position) => {
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
  console.log('allPlayers', allPlayers);
  return (
    <ImageBackground
      source={require('../../assets/deck-of-cards3.jpg')}
      className={`flex-1 items-center justify-center bg-cover`}>
      <Animated.View
        entering={BounceInLeft}
        className='relative bg-white/20 w-[75%] h-[65%] rounded-[30px] border-black/50 border-[8px] justify-center items-center'>
        {seats.map((seat, index) => (
          <TouchableOpacity
            backgroundColor='#e5e7eb'
            key={seat.id}
            className={`h-[110px] w-[75px] rounded-[10px] absolute flex justify-center items-center bg-black/60 p-2
          border-2 border-white/90
          ${seatStyles(seat.position)} ${
              seat.taken
                ? 'opacity-20 bg-white/50 border-black/50'
                : 'opacity-100'
            }`}
            onPress={() => !seat.taken && handleSeatPress(seat.id)}>
            <Text className={'text-center text-md font-bold text-white'}>
              {seat.taken ? playerNames : 'EMPTY'}
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
                  <Text
                    className='font-medium p-1 border-b-[1px] text-center border-gray-500 text-gray-100 bg-black/50'
                    key={index}>
                    {item.name}
                  </Text>
                );
              })}
            </View>
          </View>
        </View>
      </Animated.View>
    </ImageBackground>
  );
};

export default TableSeatsScreen;
