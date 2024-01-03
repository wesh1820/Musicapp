import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const initialSongs = [
  { id: '1', title: 'Song 3', artist: 'Artist 3' },
  { id: '2', title: 'Song 1', artist: 'Artist 1' },
  { id: '3', title: 'Song 2', artist: 'Artist 2' },
  // Add more songs as needed
];

const FavoriteScreen = () => {
  const [songs, setSongs] = useState([...initialSongs]);

  const sortByTitle = () => {
    const sorted = [...songs].sort((a, b) => a.title.localeCompare(b.title));
    setSongs(sorted);
  };

  const shuffleSongs = () => {
    const shuffled = [...songs].sort(() => Math.random() - 0.5);
    setSongs(shuffled);
  };

  const renderItem = ({ item }) => (
    <View style={styles.songContainer}>
      <View style={styles.songDetails}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.artist}>{item.artist}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={sortByTitle}>
          <Text style={styles.buttonText}>Sort by Title</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={shuffleSongs}>
          <Text style={styles.buttonText}>Shuffle</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    margin: 30,
  },
  button: {
    backgroundColor: '#51b60b85',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    margin: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  songContainer: {
    flexDirection: 'row',
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#51b60b85',
    borderRadius: 5,
    shadowRadius: 1,
    alignItems: 'center', // Center horizontally
    margin: 30,
  },
  songDetails: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    textTransform: 'uppercase',
    textAlign: 'center', // Center text horizontally
  },
  artist: {
    color: 'black',
    textAlign: 'center',
  },
});

export default FavoriteScreen;
