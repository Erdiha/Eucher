import React, { useState } from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import Animated, { BounceInDown, BounceInLeft } from 'react-native-reanimated';
import Buttons from '../components/Buttons';

const OptionsScreen = ({ navigation, globalVariables }) => {
  const { playType, created, roomID, playerNames } = globalVariables;
  const { BackButton, StartButton, SingleButton, GroupButton } = Buttons(
    navigation,
    globalVariables,
  );

  return (
    <ImageBackground
      source={require('../../assets/deck-of-cards3.jpg')}
      className={`flex-1 items-center justify-center bg-cover`}>
      {roomID !== '' && playerNames && (
        <Animated.View
          entering={BounceInLeft}
          className='flex-1 justify-center items-center w-full  bg-black/40 backdrop-blur-lg'>
          <View className=' h-[60%] w-[70%] rounded justify-center  border-white border-2 p-4 space-y-2'>
            <View className='space-y-2'>
              <Text className='text-gray-400 text-2xl tracking-wider font-semibold'>
                Room ID: <Text className='text-gray-300'>{roomID}</Text>
              </Text>
              <Text className='text-gray-400 text-2xl tracking-wider font-semibold '>
                Player Name:{' '}
                <Text className='text-gray-300 '>{playerNames}</Text>
              </Text>
            </View>
          </View>
        </Animated.View>
      )}

      {/* {playType === '' && created && (
        <Animated.View
          entering={BounceInDown}
          className={`flex-1 justify-around   w-[80%] items-center`}>
          <View className='flex-1 items-center justify-center'>
            <Text className=' text-4xl font-semibold text-gray-100  justify-center items-center'>
              Select play type
            </Text>
          </View>
          <View className='flex-1 flex-col justify-evenly flex  items-center'>
            <SingleButton />
            <GroupButton />
          </View>
        </Animated.View>
      )} */}

      <Animated.View className='flex-1 flex-row w-full h-full px-2  justify-around items-center bg-white/10 backdrop-blur-lg'>
        <BackButton />
        <StartButton />
      </Animated.View>
    </ImageBackground>
  );
};

export default OptionsScreen;

const styles = StyleSheet.create({
  Ionicons: {
    fontWeight: 'bold',
  },
  headerTextBold: {
    fontWeight: 'bold',
  },
  gameTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  gameTypeTitle: {
    fontSize: 28,
    marginRight: 10,
    paddingLeft: 20,
    paddingVertical: 20,
    letterSpacing: 2,
    fontWeight: 'bold',
  },
  gameType: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#e5e7eb',
    paddingHorizontal: 20,
    paddingVertical: 20,
    letterSpacing: 3,
  },

  promptText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    marginBottom: 20,
  },
  options: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 20,
    paddingVertical: 20,
  },
});
