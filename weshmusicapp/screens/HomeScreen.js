import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose a different icon library

const HomeScreen = ({ navigation }) => {
  const userName = "John"; // Replace with your actual name

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require('../assets/rock.jpeg')} // Replace with your background image
      >
        <View style={styles.contentContainer}>
          <Text style={styles.welcomeText}>Welcome, {userName}!</Text>
        </View>

        {/* Move the settings icon outside of the contentContainer */}
        <TouchableOpacity
          onPress={() => console.log('Settings pressed')}
          style={styles.settingsIconContainer}
        >
          <Icon name="cog" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Playlist')}
        >
          <Text style={styles.buttonText}>My Playlists</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Favorite')}
        >
          <Text style={styles.buttonText}>My favorites</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Center items vertically
    width: '80%', // Adjust the width as needed
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#51b60b85',
    marginBottom: 430,
    marginLeft: 190,
    textDecorationLine: 'underline',
  },
  settingsIconContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  button: {
    backgroundColor: '#51b60b85', // Spotify green color
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'white',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
