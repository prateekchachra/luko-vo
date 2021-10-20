import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import AddObjectScreen from './src/screens/AddObject';
import ValueObjectsScreen from './src/screens/ValueObjects';
import { colors } from './src/constants';
import { ValueObjectsProvider } from './src/context/ValueObjects';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const MainStack = () => (
  <Stack.Navigator initialRouteName="ValueObjects"
  screenOptions={{
    headerShown: false
  }}>
    <Stack.Screen name="ValueObjects" component={ValueObjectsScreen}/>
    <Stack.Screen name="AddObject" component={AddObjectScreen}/>
  </Stack.Navigator>
);

const TabStack = () => (
<Tab.Navigator screenOptions={({ route }) => ({    
        tabBarIcon: ({ focused, color, size }) => {   
          let iconName : 'home' | 'umbrella' | 'person' | 'albums';
          
          switch(route.name){
            case "Protection":
              iconName= 'home';
              break;
            case "Insurance":
              iconName= 'umbrella';
              break;
            case "Inventory":
              iconName= 'albums';
              break;
            case "Profile":
              iconName= 'person';
              break;
            default:
              iconName = 'person'
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
          tabBarActiveTintColor: colors.PRIMARY_BLUE,
          tabBarInactiveTintColor: colors.SECONDARY_GRAY,
          headerShown: false,
          })}>
        <Tab.Screen name="Protection" component={MainStack}/>
        <Tab.Screen name="Insurance" component={MainStack}/>
        <Tab.Screen name="Inventory" component={MainStack}/>
        <Tab.Screen name="Profile" component={MainStack}/>
      </Tab.Navigator>
);

const App = () =>  {
  return (
    <ValueObjectsProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <TabStack />
      </NavigationContainer>
    </ValueObjectsProvider>
  );
}

export default App;