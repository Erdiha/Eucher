import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { BounceInUp, PinwheelIn } from 'react-native-reanimated';
import { ThemedButton } from 'react-native-really-awesome-button';
import { AntDesign } from '@expo/vector-icons';

export default function Home({ navigation, globalVariables }) {
  const { steps, setSteps } = globalVariables;
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  return (
    <Animated.View
      entering={PinwheelIn}
      exiting={BounceInUp}
      className='relative flex-1'>
      <Image
        className='flex object-fill resize-contain w-full h-full absolute z-0'
        source={require('../../assets/deck-of-cards3.jpg')}
      />
      <View className='flex-1 w-full h-full bg-black/40 justify-center items-center '>
        <Text className='text-2xl font-black text-gray-100 rounded tracking-widest p-4 border-2 border-gray-100'>
          EUCHRE
        </Text>
      </View>
      <View className='flex-1 w-full h-full  bg-white/10 justify-center items-center  '>
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
          <Text className='tracking-wider  font-semibold text-xl p-2'>
            PLAY
          </Text>
        </ThemedButton>
      </View>
    </Animated.View>
  );
}
