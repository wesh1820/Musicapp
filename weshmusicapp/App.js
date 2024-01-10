import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, StyleSheet } from 'react-native';

// Importeer de verschillende schermen
import ArtistScreen from './screens/ArtistScreen';
import AlbumScreen from './screens/AlbumScreen';
import SongScreen from './screens/SongScreen';
import ArtistDetailScreen from './screens/ArtistDetailScreen';
import AlbumDetailScreen from './screens/AlbumDetailScreen';
import SongDetailScreen from './screens/SongDetailScreen';
import TopDetailScreen from './screens/TopDetailScreen';
import HomeScreen from './screens/HomeScreen';
import PlaylistScreen from './screens/PlaylistScreen';
import LikedSongsScreen from './screens/LikedSongsScreen';

// Maak de navigators aan
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Tab Navigator
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        // Bepaal het icoon op basis van de route naam
        if (route.name === 'Artists') {
          iconName = 'people';
        } else if (route.name === 'Albums') {
          iconName = 'albums';
        } else if (route.name === 'Songs') {
          iconName = 'musical-notes';
        } else if (route.name === 'Home') {
          iconName = 'home';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#678751",
      tabBarInactiveTintColor: "white",
      tabBarStyle: {
        backgroundColor: '#1a1a1af0', // Stel de achtergrondkleur in op zwart
        borderTopColor: 'transparent', // Verwijder de bovenste rand
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Songs" component={SongStack} />
    <Tab.Screen name="Albums" component={AlbumStack} />
    <Tab.Screen name="Artists" component={ArtistStack} />
  </Tab.Navigator>
);

// Stack Navigators voor elk schermcategorie
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Homes" component={HomeScreen} />
    <Stack.Screen name="Top40" component={TopDetailScreen} options={{ headerShown: true }} />
  </Stack.Navigator>
);

const ArtistStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Artist" component={ArtistScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ArtistDetails" component={ArtistDetailScreen} options={{ headerShown: true }} />
  </Stack.Navigator>
);

const AlbumStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Album" component={AlbumScreen} options={{ headerShown: false }} />
    <Stack.Screen name="AlbumDetails" component={AlbumDetailScreen} options={{ headerShown: true }} />
  </Stack.Navigator>
);

const SongStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Song" component={SongScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SongDetails" component={SongDetailScreen} options={{ headerShown: true }} />
  </Stack.Navigator>
);

// Optionele Navigators
const PlaylistStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Playlist" component={PlaylistScreen} />
  </Stack.Navigator>
);

// Hoofdapplicatiecomponent
const App = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Playlists" component={PlaylistStack} />
          <Stack.Screen
            name="LikedSongs"
            component={LikedSongsScreen}
            options={{ title: 'Liked Songs' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});

// Exporteer de hoofdapplicatiecomponent
export default App;
