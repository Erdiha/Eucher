import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import OptionsScreen from './src/screens/OptionsScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Navbar from './src/components/NavBar';
import JoinOrCreateScreen from './src/screens/JoinOrCreateScreen';
import GameScreen from './src/screens/GameScreen';
import RoomAndUserScreen from './src/screens/RoomAndUserScreen';
import TableSeatsScreen from './src/screens/TableSeatsScreen';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [hasConnection, setConnection] = useState(false);
  const [time, setTime] = useState(null);
  const [showOptions, setShowOptions] = React.useState(false);
  const [playType, setPlayType] = useState('');
  const [numPlayers, setNumPlayers] = useState('');
  const [playerNames, setPlayerNames] = useState([]);
  const [roomID, setRoomID] = useState('');
  const [created, setCreated] = useState(true);
  const [allMessages, setAllMessages] = useState([]);
  const [chatMessage, setChatMessage] = useState();
  const [teams, setTeams] = useState({ team1: [], team2: [] });
  const [socket, setSocket] = useState(null);
  const [allPlayers, setAllPlayers] = useState([]);

  const globalVariables = {
    showOptions,
    setShowOptions,
    playType,
    setNumPlayers,
    setPlayerNames,
    setPlayType,
    numPlayers,
    playerNames,
    hasConnection,
    setConnection,
    time,
    setTime,
    roomID,
    setRoomID,
    created,
    setCreated,
    chatMessage,
    setChatMessage,
    allMessages,
    setAllMessages,
    teams,
    setTeams,
    socket,
    setSocket,
    allPlayers,
    setAllPlayers,
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

          <Stack.Screen name='Options'>
            {(props) => (
              <OptionsScreen {...props} globalVariables={globalVariables} />
            )}
          </Stack.Screen>
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
