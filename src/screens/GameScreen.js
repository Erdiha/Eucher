import { View, Text, ImageBackground, TextInput } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Animated, { BounceInLeft } from 'react-native-reanimated';
import Deck from '../components/Deck';
import { FlatList } from 'react-native-web';

const GameScreen = ({ navigation, globalVariables, route }) => {
  const {
    allMessages,
    chatMessage,
    setChatMessage,
    allPlayers,
    playerNames,
    socket,
  } = globalVariables;

  const RenderPlayer = ({ item }) => {
    return (
      <View style={{ marginRight: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
      </View>
    );
  };

  console.log(playerNames);
  return (
    <ImageBackground
      source={require('../../assets/deck-of-cards3.jpg')}
      className={`flex-1 items-center justify-center bg-cover`}>
      <Animated.View
        entering={BounceInLeft}
        className='flex-1 bg-red-200/50 w-full h-full'>
        <View className='flex-1 m-10 p-2 bg-teal-200/50 backdrop-blur-3xl opacity-40'>
          <FlatList
            data={allPlayers}
            renderItem={RenderPlayer}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </Animated.View>

      <TextInput
        className='bg-gray-100 w-[95%] h-10 rounded-lg p-2 my-3'
        autoCorrect={false}
        value={chatMessage}
        onSubmitEditing={() => handleSubmit()}
        onChangeText={(msg) => setChatMessage(msg)}
        placeholder='Type a message...'
        selectionColor='gray'
      />
    </ImageBackground>
  );
};

export default GameScreen;
