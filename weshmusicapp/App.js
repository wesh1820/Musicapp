import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, StyleSheet } from 'react-native';
import ArtistScreen from './screens/ArtistScreen';
import AlbumScreen from './screens/AlbumScreen';
import SongScreen from './screens/SongScreen';
import ArtistDetailScreen from './screens/ArtistDetailScreen';
import AlbumDetailScreen from './screens/AlbumDetailScreen';
import SongDetailScreen from './screens/SongDetailScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Homes" component={HomeScreen} />
  </Stack.Navigator>
);
const ArtistStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Artists" component={ArtistScreen} />
    <Stack.Screen name="ArtistDetails" component={ArtistDetailScreen} />
  </Stack.Navigator>
);

const AlbumStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Albums" component={AlbumScreen} />
    <Stack.Screen name="AlbumDetails" component={AlbumDetailScreen} />
  </Stack.Navigator>
);
const SongStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Songs" component={SongScreen} />
    <Stack.Screen name="SongDetails" component={SongDetailScreen} />
  </Stack.Navigator>
);

// ... (previous imports)

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Artist') {
                iconName = 'people'; // Change this to the icon you want
              } else if (route.name === 'Album') {
                iconName = 'albums'; // Change this to the icon you want
              } else if (route.name === 'Song') {
                iconName = 'musical-notes'; // Change this to the icon you want
              } else if (route.name === 'Home') {
                iconName = 'home'; // Change this to the icon you want
              }
              

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#2b6700ce',
            inactiveTintColor: 'black',
          }}
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Song" component={SongStack} />
          <Tab.Screen name="Album" component={AlbumStack} />
          <Tab.Screen name="Artist" component={ArtistStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red', // Change the background color here
  },
});

