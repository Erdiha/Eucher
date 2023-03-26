import React, { useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  BounceInDown,
  BounceInRight,
  BounceInLeft,
  BounceInUp,
  BounceOutRight,
} from 'react-native-reanimated';
import { ThemedButton } from 'react-native-really-awesome-button';

const JoinOrCreateScreen = ({ globalVariables, navigation }) => {
  const { created, setCreated, playerNames } = globalVariables;

  return (
    <ImageBackground
      source={require('../../assets/deck-of-cards3.jpg')}
      className={`flex-1 items-center justify-center bg-cover`}>
      <Animated.View
        entering={BounceInLeft}
        exiting={BounceOutRight}
        className={`flex justify-around  h-[40%] w-[80%] items-center`}>
        <View className={`flex-1 items-center justify-center`}>
          <Text className={`text-3xl font-bold text-gray-200 `}>
            PLEASE SELECT BELOW
          </Text>
        </View>
        <View className='flex-1 flex-col justify-evenly flex  items-center'>
          <ThemedButton
            onPress={() => {
              navigation.navigate('RoomAndUser');
              setCreated(true);
            }}
            name='bruce'
            raiseLevel={0}
            borderRadius={0}
            borderWidth={2}
            backgroundColor='#e5e7eb'
            type='secondary'>
            <Text className='text-2xl font-bold tracking-wider'>CREATE</Text>
          </ThemedButton>
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
            <Text className='text-2xl font-bold tracking-wider'> JOIN</Text>
          </ThemedButton>
        </View>
      </Animated.View>
    </ImageBackground>
  );
};

export default JoinOrCreateScreen;
