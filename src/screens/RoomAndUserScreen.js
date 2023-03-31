import {
  View,
  Text,
  TextInput,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import Animated, {
  BounceOutDown,
  BounceOutRight,
  BounceInLeft,
  BounceInRight,
} from 'react-native-reanimated';
import { ThemedButton } from 'react-native-really-awesome-button';
import io from 'socket.io-client';

const RoomAndUserScreen = ({ globalVariables, navigation }) => {
  const {
    setPlayerDetails,
    setRoomID,
    created,
    socket,
    setAllPlayers,
    roomID,
    playerName,
    allPlayers,
  } = globalVariables;
  const [name, setName] = useState(playerName);
  const [room, setRoom] = useState(roomID);

  useEffect(() => {
    socket.current = io('http://192.168.50.9:3000');
    socket.current.on('connect', () => {
      console.log('Connected to server');
    });

    socket.current.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const handleSubmit = () => {
    socket.current.emit('join_or_create', { room, name }, (response) => {
      if (response.success) {
        setRoomID(room);
        setName(name);
        const allPlayers = response.players.map((player) => ({
          room,
          name: player.name,
          seat: player.seat,
          id: player.id,
        }));
        setAllPlayers(allPlayers);
        setPlayerDetails(response.playerDetails);
        navigation.navigate('TableSeats');
      } else {
        alert(response.message);
      }
    });
  };

  console.log('setAllPlayers', allPlayers);
  return (
    <ImageBackground
      source={require('../../assets/deck-of-cards3.jpg')}
      className={`flex-1 items-center justify-center bg-cover`}>
      <Animated.View
        exiting={BounceOutRight}
        entering={BounceInLeft}
        className='flex'>
        <Text className='text-gray-100 text-2xl py-4 font-bold'>
          PLEASE FILL FOLLOWING
        </Text>
        <View className='  bg-black/50 p-4 '>
          <Text className='font-bold text-gray-100 '>ROOM ID</Text>

          <TextInput
            className='bg-gray-100 h-10 p-2 my-2 mb-8'
            autoCorrect={false}
            value={room}
            onChangeText={(e) => setRoom(e)}
            placeholder={`${
              created ? 'Created Room id...' : 'Enter Room id to Join...'
            }`}
            selectionColor='gray'
          />

          <Text className='font-bold text-gray-100'>GAMER TAG</Text>
          <TextInput
            className='bg-gray-100 h-10  p-2 my-2'
            autoCorrect={false}
            value={name}
            onChangeText={(e) => setGamerName(e)}
            placeholder='Create Gamer Tag...'
            selectionColor='gray'
          />
        </View>
        <ThemedButton
          style={{ position: 'absolute', right: 0 }}
          onPress={() => handleSubmit()}
          name='bruce'
          raiseLevel={0}
          borderRadius={0}
          size=''
          backgroundColor='#e5e7eb'
          type='secondary'>
          <Text className='text-2xl font-bold tracking-wider'> NEXT</Text>
        </ThemedButton>
      </Animated.View>
    </ImageBackground>
  );
};

export default RoomAndUserScreen;
