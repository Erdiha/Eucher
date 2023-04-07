import React, { useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { ThemedButton } from 'react-native-really-awesome-button';

export const Buttons = (navigation, globalVariables, handleSubmit) => {
  const { setCreated, setRoomID, setPlayerName } = globalVariables;

  const PlayButton = () => {
    return (
      <ThemedButton
        type='secondary'
        name='bruce'
        raiseLevel={0}
        borderRadius={0}
        borderWidth={2}
        borderColor='black'
        after={<AntDesign name='rightcircle' size={24} color='black' />}
        onPress={() => {
          navigation.navigate('JoinOrCreate');
        }}>
        <Text className='text-xl font-semibold tracking-wider px-2'>PLAY</Text>
      </ThemedButton>
    );
  };

  const CreateButton = () => {
    return (
      <ThemedButton
        onPress={() => {
          navigation.navigate('RoomAndUser');
          setCreated(true);
        }}
        name='bruce'
        size='large'
        raiseLevel={0}
        borderRadius={0}
        borderWidth={2}
        backgroundColor='#e5e7eb'
        type='secondary'>
        <Text className='flex text-2xl font-bold tracking-wide justify-center items-center'>
          CREATE GAME
        </Text>
      </ThemedButton>
    );
  };

  const JoinButton = () => {
    return (
      <ThemedButton
        onPress={() => {
          navigation.navigate('RoomAndUser');
          setCreated(false);
        }}
        name='bruce'
        raiseLevel={0}
        borderRadius={0}
        backgroundColor='#e5e7eb'
        type='secondary'>
        <Text className='text-2xl font-bold tracking-wider w-full'>
          JOIN A GAME
        </Text>
      </ThemedButton>
    );
  };

  const NextButton = () => {
    return (
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
    );
  };

  return { PlayButton, JoinButton, CreateButton, NextButton };
};
