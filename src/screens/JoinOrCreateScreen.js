import React, { useEffect, useState } from 'react';
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
import { Buttons } from '../components/Buttons';
import { names } from '../components/HelperFunction';

const JoinOrCreateScreen = ({ globalVariables, navigation }) => {
  const { created, setRoomID, roomID, setPlayerName } = globalVariables;
  const { JoinButton, CreateButton } = Buttons(navigation, globalVariables);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    setPlayerName(names[Math.floor(Math.random() * 13)]);
    if (created) {
      // only generate a new room ID if one hasn't been set yet
      setRoomID('room' + Math.floor(Math.random() * 1));
    } else {
      setRoomID(roomID);
    }
  }, [created]);

  return (
    <ImageBackground
      source={require('../../assets/deck-of-cards3.jpg')}
      className={`flex-1 items-center justify-center bg-cover`}>
      <Animated.View
        entering={BounceInLeft}
        exiting={BounceOutRight}
        className={`flex justify-around  h-[40%] w-[80%] items-center`}>
        <View className='flex-1 flex-col justify-evenly items-center'>
          <CreateButton />
          <Text className='text-xl bg-black/50 text-gray-200'>OR</Text>
          <JoinButton />
        </View>
      </Animated.View>
    </ImageBackground>
  );
};

export default JoinOrCreateScreen;
