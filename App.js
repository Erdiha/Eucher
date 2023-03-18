import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import OptionsScreen from './src/screens/OptionsScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Navbar from './src/components/NavBar';
import JoinOrCreateScreen from './src/screens/JoinOrCreateScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [showOptions, setShowOptions] = React.useState(false);

  const globalVariables = {
    showOptions,
    setShowOptions,
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Navbar />
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
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
