// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require('../assets/rock.jpeg')} // Replace with your background image
      >
        <ImageBackground
          style={styles.logoContainer}
          source={require('../assets/logo.png')} // Replace with your app logo
        >
          <Text style={styles.title}></Text>
        </ImageBackground>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Artists')} // Navigate to the Artists screen
        >
          <Text style={styles.buttonText}>Explore Artists</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Albums')} // Navigate to the Albums screen
        >
          <Text style={styles.buttonText}>Browse Albums</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Songs')} // Navigate to the Songs screen
        >
          <Text style={styles.buttonText}>Discover Songs</Text>
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
  logoContainer: {
    width: '60%',
    height: '23%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 260,
    marginLeft: -140,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  button: {
    backgroundColor: '#002043', // Spotify green color
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
