import { ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import WhoStarts from '../components/WhoStarts';
import Game from '../components/Game';
import { arrangeSeats } from '../components/HelperFunction';

const GameScreen = ({ navigation, globalVariables, route }) => {
  const [clickedCard, setClickedCard] = useState([]);
  const [rounds, setRounds] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const { socket, setAllPlayers, setPlayerDetails, setCards, setSeats, seats } =
    globalVariables;
  const [gameData, setGameData] = useState();
  const updatedSeats = arrangeSeats(seats, socket.current.id);

  useEffect(() => {
    // listen for 'game_started' event
    socket.current.on('game_started', (data) => {
      setGameData(data);
      setGameStarted(data.start);
      setCards(data.deck.deck);
      setPlayerDetails(data.playerDetails);
      setSeats(updatedSeats);
    });

    // clean up event listener on unmount
    return () => {
      socket.current.off('game_started');
    };
  }, []);

  const textAlert = [
    'Please shuffle the deck',
    'Each user pick a card. Highest card user starts',
  ];

  return (
    <ImageBackground
      source={require('../../assets/deck-of-cards3.jpg')}
      className={`flex-1 items-center justify-center bg-cover`}>
      {gameStarted ? (
        <Game
          globalVariables={globalVariables}
          gameData={gameData}
          gameStarted={gameStarted}
        />
      ) : (
        <WhoStarts
          globalVariables={globalVariables}
          textAlert={textAlert}
          setClickedCard={setClickedCard}
          clickedCard={clickedCard}
          setGameStarted={setGameStarted}
          gameStarted={gameStarted}
        />
      )}
    </ImageBackground>
  );
};

export default GameScreen;
