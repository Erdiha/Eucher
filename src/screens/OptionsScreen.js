import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, { Component, useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const OptionsScreen = ({ navigation, globalVariables }) => {
  const [playType, setPlayType] = useState('');
  const [numPlayers, setNumPlayers] = useState('');
  const [playerNames, setPlayerNames] = useState([]);

  const slideAnim = useSharedValue(0);

  const handlePlayTypeChange = (value) => {
    setPlayType(value);
    slideAnim.value = withTiming(1);
  };

  const handleNumPlayersChange = (value) => {
    setNumPlayers(value);
    slideAnim.value = withTiming(2);
  };

  const handleNames = (index, text) => {
    setPlayerNames((prevNames) => {
      const newNames = [...prevNames];
      newNames[index] = text;
      return newNames;
    });
  };

  const renderFields = () => {
    if (numPlayers === '') return;
    if (playType === 'single') {
      return (
        <View>
          {[...Array(Number(numPlayers))].map((_, i) => (
            <TextInput
              key={i}
              placeholder={`Player ${i + 1}`}
              onChangeText={(text) => handleNames(i, text)}
              selectionColor={'gray'}
              name={`player${i + 1}`}
            />
          ))}
        </View>
      );
    } else if (playType === 'group') {
      return (
        <View>
          {[...Array(Number(numPlayers))].map((_, i) => (
            <TextInput
              key={i}
              placeholder={`Group ${i + 1}`}
              onChangeText={(text) => handleNames(text)}
              selectionColor={'gray'}
            />
          ))}
        </View>
      );
    } else {
      return null;
    }
  };

  const prompt1Style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: slideAnim.value === 0 ? 0 : -500 }],
    };
  });

  const prompt2Style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: slideAnim.value === 1 ? 0 : -500 }],
    };
  });

  const prompt3Style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: slideAnim.value === 2 ? 0 : -500 }],
    };
  });
  const handleReset = () => {
    setNumPlayers('');
    setPlayType('');
    setPlayerNames([]);
    slideAnim.value = withTiming(0);
  };

  const handleBack = () => {
    if (slideAnim.value === 2) {
      slideAnim.value = withTiming(1);
      setNumPlayers('');
    } else if (slideAnim.value === 1) {
      slideAnim.value = withTiming(0);
      setPlayType('');
    } else {
      handleReset();
    }
  };
  console.log(playerNames);
  return (
    <View className=' bg-blatrck/30 p-4 flex-1 relative'>
      <View className=' flex-1 bg-gray-300 p-2 '>
        {playType && (
          <Text className='flex-1 text-black font-bold tracking-wider'>
            <Text className='text-gray-800 font-semibold tracking-wider'>
              Game type:{' '}
            </Text>
            {playType.toUpperCase() + 'S'}
          </Text>
        )}
        {numPlayers && (
          <Text className='flex-1 text-black font-bold tracking-wider'>
            <Text className='text-gray-800 font-semibold tracking-wider'>
              {playType === 'single'
                ? 'Number of Players:'
                : 'Number of Groups:'}
            </Text>{' '}
            {numPlayers}
          </Text>
        )}
      </View>
      <View className=' flex-1 justify-center items-center'>
        <Animated.View
          className='flex-1 flex-col absolute'
          style={[prompt1Style, { flex: 1 }]}>
          <Text className='text-black font-bold -tracking-wider text-xl'>
            Select play type
          </Text>
          <View className='flex-row mt-4  border-black border-2 justify-around'>
            <TouchableOpacity
              className='border-black border-2 p-2'
              onPress={() => handlePlayTypeChange('single')}>
              <Text className='text-black'>SINGLES</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePlayTypeChange('group')}>
              <Text className='border-black border-2 p-2'>GROUPS</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        <Animated.View
          className='flex-1 flex-col absolute'
          style={[prompt2Style, { flex: 1 }]}>
          <Text className='text-black py-2'>
            {' '}
            {playType === 'single'
              ? 'Enter number of players :'
              : 'Enter number of groups :'}
          </Text>
          <TextInput
            selectionColor={'gray'}
            placeholder={
              playType === 'single'
                ? 'Enter number of player'
                : 'Enter number of groups'
            }
            onChangeText={handleNumPlayersChange}
            keyboardType='number-pad'
            style={{ borderWidth: 1, borderColor: 'white' }}
            className='p-2'
          />
        </Animated.View>
        <Animated.View
          className='flex-1 flex-col absolute'
          style={[prompt3Style, { flex: 1 }]}>
          <Text className='text-black'>
            {playType === 'single'
              ? 'Enter player names:'
              : 'Enter group names:'}
          </Text>
          {renderFields()}
        </Animated.View>
      </View>
      {(numPlayers !== '' || playType !== '' || playerNames.length > 0) && (
        <View className='flex flex-row w-full space-x-4 h-16 justify-around rounded'>
          <TouchableOpacity
            onPress={handleReset}
            className='w-full flex-1 text-center h-full items-center bg-gray-200 justify-center rounded'>
            {(numPlayers !== '' ||
              playType !== '' ||
              playerNames.length > 0) && <Text>RESET</Text>}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleBack}
            className='w-full flex-1 bg-gray-200 h-full items-center justify-center rounded'>
            {(numPlayers !== '' ||
              playType !== '' ||
              playerNames.length > 0) && <Text>BACK</Text>}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default OptionsScreen;
