import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Card = ({ suit, value }) => {
  const color = suit === 'heart' || suit === 'diamond' ? 'red' : 'black';
  const [showFront, setShowFront] = useState(true);

  const toggleShowFront = () => {
    setShowFront(!showFront);
  };

  return (
    <View
      style={{
        height: 120,
        width: 80,
        backgroundColor: 'white',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        position: 'relative',
      }}
      onTouchEnd={toggleShowFront}>
      {showFront ? (
        <>
          <View style={{ position: 'absolute', top: 10, left: 10 }}>
            <MaterialCommunityIcons
              name={`cards-${suit}`}
              size={24}
              color={color}
            />
          </View>
          <View style={{ position: 'absolute', bottom: 10, right: 10 }}>
            <MaterialCommunityIcons
              name={`cards-${suit}`}
              size={24}
              color={color}
            />
          </View>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color }}>
            {value}
          </Text>
        </>
      ) : (
        <Image
          source={require('../../assets/card-back.png')}
          className='p-1'
          style={{
            height: '99%',
            width: '90%',
            borderRadius: 10,
          }}
        />
      )}
    </View>
  );
};

export default Card;
