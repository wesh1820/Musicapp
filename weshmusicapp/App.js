import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ArtistScreen from './screens/ArtistScreen';
import AlbumScreen from './screens/AlbumScreen';
import SongScreen from './screens/SongScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Song" component={HomeScreen} />
  </Stack.Navigator>
);
const ArtistStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Artist" component={ArtistScreen} />
  </Stack.Navigator>
);

const AlbumStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Album" component={AlbumScreen} />
  </Stack.Navigator>
);
const SongStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Song" component={SongScreen} />
  </Stack.Navigator>
);


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Artists') {
              iconName = 'people-outline'; 
            } else if (route.name === 'Albums') {
              iconName = 'albums-outline'; 
            } else if (route.name === 'Songs') {
              iconName = 'musical-notes-outline'; 
            } else if (route.name === 'Home') {
            iconName = 'home-outline'; 
          }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Songs" component={SongStack} />
        <Tab.Screen name="Albums" component={AlbumStack} />
        <Tab.Screen name="Artists" component={ArtistStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
