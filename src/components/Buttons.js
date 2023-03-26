import React, { useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { ThemedButton } from 'react-native-really-awesome-button';

export default function Buttons(navigation, globalVariables) {
  const { playType, setPlayType, playerNames, roomID } = globalVariables;
  console.log(globalVariables, navigation);
  function GroupButton() {
    return (
      <ThemedButton
        name='bruce'
        type='secondary'
        raiseLevel={0}
        borderRadius={0}
        backgroundColor='#e5e7eb'
        borderWidth={2}
        onPress={() => setPlayType('group')}>
        <Text className='text-2xl font-bold tracking-wider'>Groups</Text>
      </ThemedButton>
    );
  }

  function SingleButton() {
    return (
      <ThemedButton
        name='bruce'
        type='secondary'
        raiseLevel={0}
        borderRadius={0}
        borderWidth={2}
        backgroundColor='#e5e7eb'
        size='medium'
        onPress={() => {
          navigation.navigate('RoomAndUser');
          setPlayType('single');
        }}>
        <Text className='text-2xl font-bold tracking-wider'>Singles</Text>
      </ThemedButton>
    );
  }
  function StartButton() {
    return (
      <ThemedButton
        backgroundColor='#e5e7eb'
        after={<Ionicons name='play' size={24} color='black' />}
        name='bruce'
        raiseLevel={0}
        borderRadius={0}
        borderColor='black'
        size='_'
        borderWidth={2}
        type='secondary'
        onPress={() => navigation.navigate('Game')}
        textColor='black'>
        <Text className='text-2xl font-bold tracking-wider'>START</Text>
      </ThemedButton>
    );
  }
  function BackButton() {
    return (
      <ThemedButton
        before={<Ionicons name='arrow-back' size={24} color='black' />}
        backgroundColor='#e5e7eb'
        name='bruce'
        type='secondary'
        textColor='black'
        borderWidth={2}
        borderRadius={0}
        raiseLevel={0}
        size='_'
        onPress={() =>
          playType === ''
            ? navigation.navigate('JoinOrCreate')
            : setPlayType('')
        }>
        <Text className='text-2xl font-bold tracking-wider'>BACK</Text>
      </ThemedButton>
    );
  }
  return { BackButton, StartButton, SingleButton, GroupButton };
}
