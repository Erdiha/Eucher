import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  BounceIn,
  BounceOut,
  PinwheelIn,
  PinwheelOut,
  SlideInLeft,
  SlideInUp,
} from 'react-native-reanimated';

export default function Home({ navigation, globalVariables }) {
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  return (
    <Animated.View entering={PinwheelIn} className='relative flex-1'>
      <Image
        className='flex object-fill resize-contain w-full h-full absolute z-0'
        source={require('../../assets/deck-of-cards3.jpg')}
      />
      <View className='flex-1 w-full h-full bg-black/50 justify-center items-center '>
        <Text
          className='text-2xl font-black text-white
      rounded tracking-widest p-4 border-2 border-white'>
          EUCHER
        </Text>
      </View>
      <View className='flex-1 w-full h-full  bg-white/50 justify-center items-center backdrop-blur'>
        <TouchableOpacity
          onPress={() => navigation.navigate('JoinOrCreate')}
          className=' w-fit h-fit justify-center items-center'>
          <Text
            className='text-3xl font-black text-black 
      rounded tracking-widest p-4  border-2 text-center'>
            PLAY
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
