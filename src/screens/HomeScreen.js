import { View, Text, Image } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { BounceInUp, PinwheelIn } from 'react-native-reanimated';
import { ThemedButton } from 'react-native-really-awesome-button';

import { Buttons } from '../components/Buttons';

export default function Home({ navigation, globalVariables }) {
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const { PlayButton } = Buttons(navigation, globalVariables);

  return (
    <Animated.View
      entering={PinwheelIn}
      exiting={BounceInUp}
      className='flex-1'>
      <Image
        className='flex object-fill resize-contain w-full h-full absolute z-0'
        source={require('../../assets/deck-of-cards3.jpg')}
      />
      <View className='flex-1 bg-black/40 justify-center items-center'>
        <Text className='text-2xl font-black text-gray-100 rounded border-2 border-gray-100 py-4 px-8'>
          EUCHRE
        </Text>
      </View>
      <View className='flex-1 bg-white/10 justify-center items-center'>
        <PlayButton />
      </View>
    </Animated.View>
  );
}
