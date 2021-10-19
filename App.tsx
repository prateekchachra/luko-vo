import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddObjectScreen from './src/screens/AddObject';
import ValueObjectsScreen from './src/screens/ValueObjects';

const Stack = createNativeStackNavigator();

const App = () =>  {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="ValueObjects">
        <Stack.Screen name="ValueObjects" component={ValueObjectsScreen}/>
        <Stack.Screen name="AddObject" component={AddObjectScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;