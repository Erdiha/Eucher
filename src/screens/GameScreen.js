import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Animated, {
  SlideInRight,
  FlipInXUp,
  FlipInEasyX,
  SlideOutLeft,
} from 'react-native-reanimated';
import Deck from '../components/Deck';
import Card from '../components/Card';
import {
  gameSittingStyle,
  seatStyles,
  currentUser,
  shuffleCards,
  findPlayerWithHighestCard,
} from '../components/HelperFunction';
import AwesomeButton, {
  ThemedButton,
} from 'react-native-really-awesome-button';

const GameScreen = ({ navigation, globalVariables, route }) => {
  const {
    chatMessage,
    setChatMessage,
    cards,
    setCards,
    socket,
    seats,
    setSeats,
    allPlayers,
  } = globalVariables;
  const [clickedCard, setClickedCard] = useState([]);
  const [rounds, setRounds] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  //const [textAlert, setTextAlert] = useState('');
  const textAlert = [
    'Please shuffle the deck',
    'Each user pick a card. Highest card user starts',
  ];

  useEffect(() => {
    if (clickedCard.length === 2) {
      const { playerWithHighestCard, highestCard } =
        findPlayerWithHighestCard(clickedCard);
      textAlert[2] = `Player ${playerWithHighestCard} starts with ${highestCard.suit} ${highestCard.value}`;
    }
  }, [clickedCard]);

  const cardSize = ['normal', 'small'];

  useEffect(() => {
    socket.current.on('seat_update', (res) => setSeats(res));
    socket.current.on('details', (res) => {
      setPlayers(res);
    });
  }, []);

  useEffect(() => {
    const user = currentUser(allPlayers, socket.current.id);
    socket.current.on('update_deck', ({ user, card, deck }) => {
      setCards(deck);
      const { suit, value } = card;
      setClickedCard([
        ...clickedCard,
        {
          player: user,
          startingCard: { suit: suit, value: value },
        },
      ]);
      console.log(`User ${user} popped card ${card.suit}  ${card.value}`);
    });

    console.log('user is ', user);
  }, [clickedCard]);

  useEffect(() => {
    socket.current.on('seat_update', (res) => setSeats(res));

    setRounds(rounds + 1);
  }, [clickedCard]);

  const RenderPlayer = ({ item, key }) => {
    const temp = item.player;
    const pos = item.position;
    let newPosition;

    return (
      <Animated.View
        entering={SlideInRight}
        key={item.id}
        className={`${
          item.position === 'north' || item.position === 'south'
            ? item.position === 'north'
              ? 'w-full h-[220px] bottom-0'
              : 'w-full h-[75px]'
            : 'w-[75px] h-[57.5%] top-[75px] justify-center'
        }   absolute flex 
        border-2 bg-white/20
        ${gameSittingStyle(item, socket.current.id)}
        `}>
        <View
          className={`flex-1 ${
            item.position === 'north' ? 'p-4' : 'p-1'
          } bg-red-200 `}>
          <View
            className={`${
              item.position === 'south' || item.position === 'north'
                ? 'bg-red-300'
                : 'bg-blue-300'
            } flex-1 justify-center items-center`}>
            <Card
              key={item?.clickedCard?.id}
              suit={item?.clickedCard?.startingCard?.suit}
              value={item?.clickedCard?.startingCard?.value}
              setClickedCard={setClickedCard}
              clickedCard={clickedCard}
              cardSize={cardSize[0]}
              socket={socket}
              rounds={rounds}
            />
          </View>
        </View>
        <Text
          className={`opacity-80 flex-1 top-0 text-white  absolute p-2 w-full ${
            (item.position === 'west' && 'rotate-90  h-[75px] w-auto') ||
            (item.position === 'east' && '-rotate-90 h-[75px] w-auto')
          }`}
          style={{ fontWeight: 'bold' }}>
          {item.player}
        </Text>
      </Animated.View>
    );
  };

  const handleProgress = (release) => {
    // Set progress to 100% and stop just before shuffle
    setTimeout(() => {
      setShuffle(!shuffle);
      socket.current.on('shuffle_deck', (cards) => {
        setCards(cards);
      });
      release();
      setTimeout(() => {
        setRounds(rounds + 1);
      }, 1500);
    }, 200);
  };

  console.log('seatsssss', seats);
  console.log('rounds', rounds);
  console.log('clickedCard', clickedCard.length);
  console.log('deck', cards);

  return (
    <ImageBackground
      source={require('../../assets/deck-of-cards3.jpg')}
      className={`flex-1 items-center justify-center bg-cover `}>
      <Animated.View
        entering={FlipInXUp.springify()}
        className='flex-1  w-full h-full justify-center items-center '>
        <View className=' w-full h-full bg-black/10 rounded-3xl backdrop-blur-3xl relative'>
          {seats?.map((item, index) => {
            return RenderPlayer({ item, index });
          })}
        </View>
        {rounds === 0 && (
          <View className='absolute top-20  '>
            <ThemedButton
              progress
              type='secondary'
              name='bruce'
              raiseLevel={0}
              borderRadius={0}
              borderWidth={2}
              borderColor='black'
              style={{ padding: 0, horizantalPadding: 0 }}
              size='small'
              onPress={handleProgress}>
              SHUFFLE
            </ThemedButton>
          </View>
        )}
        <Animated.View
          className='absolute top-32'
          entering={SlideInRight}
          exiting={SlideOutLeft}>
          <Text className='text-gray-100 tracking-wide p-2 border-gray-100 border-2 justify-center items-center w-40'>
            {textAlert[rounds]}
          </Text>
        </Animated.View>

        <View className='absolute bg-white'>
          <Deck
            clickedCard={clickedCard}
            setClickedCard={setClickedCard}
            shuffle={shuffle}
            setShuffle={setShuffle}
            cards={cards}
            setCards={setCards}
            socket={socket}
          />
        </View>
        <Text className='absolute top-[220px] bg-white text-yellow-800 p-2'>
          number of cards remain: {cards.length}
          {socket.current.id}
        </Text>
      </Animated.View>

      <TextInput
        className='bg-gray-200 w-[95%] h-10 rounded-lg p-2 my-3'
        autoCorrect={false}
        value={chatMessage}
        onSubmitEditing={() => handleSubmit()}
        onChangeText={(msg) => setChatMessage(msg)}
        placeholder='Type a message...'
        selectionColor='gray'
      />
    </ImageBackground>
  );
};

export default GameScreen;
