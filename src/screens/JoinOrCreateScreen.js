import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  BounceInDown,
  BounceInUp,
  PinwheelIn,
  PinwheelOut,
} from 'react-native-reanimated';
const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../assets/deck-of-cards2.jpg')}
      className={`flex-1 items-center justify-center`}>
      <Animated.View
        entering={BounceInDown}
        className={`bg-blue-100/50 bg-opacity-50 px-4 py-8 rounded-xl`}>
        <View className={`mb-8`}>
          <Text className={`text-3xl font-bold text-gray-100`}>
            PLEASE SELECT BELOW
          </Text>
        </View>
        <View className={`flex-row justify-around `}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Options')}
            className={`bg-blue-500 rounded-full mb-4 w-24 p-4`}>
            <Text className={`text-white text-center text-xl font-bold`}>
              Create
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`bg-gray-700  rounded-full mb-4 w-24 p-4`}>
            <Text className={`text-gray-100 text-center text-xl font-bold`}>
              Join
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ImageBackground>
  );
};

export default HomeScreen;
