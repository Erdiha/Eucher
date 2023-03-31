import React, { useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const NavigationBar = ({ globalVariables }) => {
  const insets = useSafeAreaInsets();
  const { playType, setPlayType, setSteps } = globalVariables;
  const navigation = useNavigation();

  const createLogo = () => {
    const letters = ['E', 'U', 'C', 'H', 'R', 'E'];

    const logo = letters.map((letter, index) => (
      <View key={index} className='relative flex h-fit w-fit'>
        <Text
          style={{
            paddingVertical: 0,
            paddingHorizontal: 3,
          }}
          className={`font-bold text-white/90 text-xl text-center border-white/70 border-[1px] backdrop-blur  ${
            index % 2 === 0 ? 'bg-red-500/90' : 'bg-black/90'
          }`}>
          {letter}
        </Text>
      </View>
    ));
    return logo;
  };

  return (
    <SafeAreaView className='bg-gray-200 p-4 text-white '>
      <View
        className=' flex-row items-center justify-between'
        style={[{ paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <View className={`flex-row flex items-center justify-center `}>
          <TouchableOpacity
            className={`flex-row flex items-center justify-center `}
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <View className={`flex-row text-2xl justify-center items-center`}>
              {createLogo()}
            </View>
          </TouchableOpacity>
        </View>
        <View className={`flex-row`}>
          <TouchableOpacity
            className={`ml-2`}
            // onPress={() => navigation.navigate('Signin')}
          >
            <Ionicons name='person-outline' size={24} color='black' />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NavigationBar;
