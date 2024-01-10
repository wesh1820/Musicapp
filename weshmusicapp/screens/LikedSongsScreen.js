import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const LikedSongsScreen = ({ route }) => {
  // Ontvang de gelikete nummers uit de navigatieparameters
  const { likedSongs } = route.params;

  // State om de zoekopdracht en gefilterde nummers bij te houden
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLikedSongs, setFilteredLikedSongs] = useState(likedSongs);

  // Functie om een geliket nummer weer te geven wanneer erop wordt geklikt
  const renderLikedSongItem = ({ item }) => {
    const handleSongPress = () => {
      // Voeg hier de gewenste actie toe wanneer een lied wordt aangeraakt
    };

    return (
      <TouchableOpacity activeOpacity={0.5} onPress={handleSongPress}>
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

  // Functie om de lijst van gelikete nummers te filteren op basis van zoekopdracht
  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredSongs = likedSongs.filter((song) =>
      song.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredLikedSongs(filteredSongs);
  };

  return (
    <View style={styles.screen}>
      {/* Zoekbalk voor het filteren van gelikete nummers op basis van de titel */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search songs"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Lijst met gelikete nummers */}
      <FlatList
        data={filteredLikedSongs}
        keyExtractor={(item) => item.id.toString()} // Zorg ervoor dat item.id een stringwaarde is
        renderItem={renderLikedSongItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // Stijlen voor de gelikete nummers schermcomponent
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
