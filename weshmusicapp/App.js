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
import TopDetailScreen from './screens/TopDetailScreen';
import HomeScreen from './screens/HomeScreen';
import PlaylistScreen from './screens/PlaylistScreen';
import FavoriteScreen from './screens/FavoriteScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Artist') {
          iconName = 'people';
        } else if (route.name === 'Album') {
          iconName = 'albums';
        } else if (route.name === 'Song') {
          iconName = 'musical-notes';
        } else if (route.name === 'Home') {
          iconName = 'home';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#2b6700ce",
      tabBarInactiveTintColor: "black",
      tabBarStyle: [
        {
          "display": "flex"
        },
        null
      ]
    })}
  >
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Song" component={SongStack} />
    <Tab.Screen name="Album" component={AlbumStack} />
    <Tab.Screen name="Artist" component={ArtistStack} />
  </Tab.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Homes" component={HomeScreen} />
    <Stack.Screen name="Top40" component={TopDetailScreen} options={{ headerShown: true }} />
  </Stack.Navigator>
);

const ArtistStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Artists" component={ArtistScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ArtistDetails" component={ArtistDetailScreen} options={{ headerShown: true }} />
  </Stack.Navigator>
);

const AlbumStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Albums" component={AlbumScreen} options={{ headerShown: false }} />
    <Stack.Screen name="AlbumDetails" component={AlbumDetailScreen} options={{ headerShown: true }} />
  </Stack.Navigator>
);

const SongStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Songs" component={SongScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SongDetails" component={SongDetailScreen} options={{ headerShown: true }} />
  </Stack.Navigator>
);

const PlaylistStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Playlist" component={PlaylistScreen} />
  </Stack.Navigator>
);

const FavoriteStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Favorite" component={FavoriteScreen} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Playlists" component={PlaylistStack} />
          <Stack.Screen name="Favorites" component={FavoriteStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});

export default App;