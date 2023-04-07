import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Navbar from './src/components/NavBar';
import JoinOrCreateScreen from './src/screens/JoinOrCreateScreen';
import GameScreen from './src/screens/GameScreen';
import RoomAndUserScreen from './src/screens/RoomAndUserScreen';
import TableSeatsScreen from './src/screens/TableSeatsScreen';
// import TeamSelectorScreen from './src/screens/TeamSelectorScreen';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [hasConnection, setConnection] = useState(false);
  const [showOptions, setShowOptions] = React.useState(false);
  const [numPlayers, setNumPlayers] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [roomID, setRoomID] = useState('');
  const [created, setCreated] = useState(true);
  const [allMessages, setAllMessages] = useState([]);
  const [teams, setTeams] = useState({ team1: [], team2: [] });
  const [allPlayers, setAllPlayers] = useState([]);
  const [cards, setCards] = useState([]);
  const [dealer, setDealer] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState({
    id: '',
    name: '',
    seatID: '',
    seratPosition: null,
    hand: [],
    discard: [],
    picked: [],
    score: 0,
  });
  const [seats, setSeats] = React.useState([
    {
      id: 1,
      position: 'south',
      taken: false,
      player: null,
      team: 'team1',
      playerID: '',
    },
    {
      id: 2,
      position: 'west',
      taken: false,
      player: null,
      team: 'team2',
      playerID: '',
    },
    {
      id: 3,
      position: 'north',
      taken: false,
      player: null,
      team: 'team1',
      playerID: '',
    },
    {
      id: 4,
      position: 'east',
      taken: false,
      player: null,
      team: 'team2',
      playerID: '',
    },
  ]);
  const [playerDetails, setPlayerDetails] = useState(null);
  const socket = useRef();

  const globalVariables = {
    currentPlayer,
    setCurrentPlayer,
    cards,
    setCards,
    showOptions,
    setShowOptions,
    setNumPlayers,
    setPlayerName,
    numPlayers,
    playerName,
    hasConnection,
    setConnection,
    roomID,
    setRoomID,
    created,
    setCreated,
    allMessages,
    setAllMessages,
    teams,
    setTeams,
    socket,
    allPlayers,
    setAllPlayers,
    seats,
    setSeats,
    setPlayerDetails,
    playerDetails,
    dealer,
    setDealer,
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Navbar globalVariables={globalVariables} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Home'>
            {(props) => (
              <HomeScreen {...props} globalVariables={globalVariables} />
            )}
          </Stack.Screen>

          <Stack.Screen name='JoinOrCreate'>
            {(props) => (
              <JoinOrCreateScreen
                {...props}
                globalVariables={globalVariables}
              />
            )}
          </Stack.Screen>
          {/* <Stack.Screen name='TeamSelector'>
            {(props) => (
              <TeamSelectorScreen
                {...props}
                globalVariables={globalVariables}
              />
            )}
          </Stack.Screen> */}
          <Stack.Screen name='Game'>
            {(props) => (
              <GameScreen {...props} globalVariables={globalVariables} />
            )}
          </Stack.Screen>
          <Stack.Screen name='RoomAndUser'>
            {(props) => (
              <RoomAndUserScreen {...props} globalVariables={globalVariables} />
            )}
          </Stack.Screen>
          <Stack.Screen name='TableSeats'>
            {(props) => (
              <TableSeatsScreen {...props} globalVariables={globalVariables} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
