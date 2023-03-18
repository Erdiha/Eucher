import React, { useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NavigationBar = () => {
  const insets = useSafeAreaInsets();

  const navigation = useNavigation();

  return (
    <SafeAreaView className='bg-black/10 p-4 text-white '>
      <View
        className=' flex-row items-center justify-between'
        style={[{ paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <View className={`flex-row items-center`}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Ionicons name='chevron-back-outline' size={24} color='black' />
          </TouchableOpacity>

          <View className={`flex-row b rounded text-2xl `}>
            <Text className='font-bold text-gray-800/90 p-1 text-xl'>
              EUCKER
            </Text>
          </View>
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
