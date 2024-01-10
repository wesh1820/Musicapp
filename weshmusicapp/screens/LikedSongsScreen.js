import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const LikedSongsScreen = ({ route }) => {
  const { likedSongs } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLikedSongs, setFilteredLikedSongs] = useState(likedSongs);

  const renderLikedSongItem = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={null}>
        <View style={styles.songItem}>
          <Image style={styles.thumbnail} source={{ uri: item.bannerImage }} />
          <View style={styles.songDetails}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.duration}>{item.duration}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredSongs = likedSongs.filter((song) =>
      song.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredLikedSongs(filteredSongs);
  };

  return (
    <View style={styles.screen}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search songs"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredLikedSongs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderLikedSongItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  songItem: {
    flexDirection: 'row',
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#51b60b85',
    borderWidth: 0,
    borderRadius: 5,
    shadowRadius: 1,
    alignItems: 'center',
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
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
    textAlign: 'center',
  },
  duration: {
    color: 'black',
    textAlign: 'center',
  },
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fbfafa',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default LikedSongsScreen;
