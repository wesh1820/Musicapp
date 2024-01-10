import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Platform } from 'react-native';
import NewsItem from '../components/SongItem';

const SongScreen = ({ navigation }) => {
  // State voor het opslaan van de songgegevens
  const [SongD, setSong] = useState([]);
  const [allSong, setAllSong] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API URL op basis van het besturingssysteem
  const API_URL = Platform.OS === 'android'
    ? 'http://10.0.2.2:<vul port in>/api/news/'
    : 'http://site.ddev.site/api/song/';

  // Functie om songgegevens op te halen
  const getSong = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
      });
      const json = await response.json();
      // Een 'liked' eigenschap toevoegen aan elk song-object
      const songsWithLikedStatus = json.items.map(song => ({ ...song, liked: false }));
      setSong(songsWithLikedStatus);
      setAllSong(songsWithLikedStatus);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('Error fetching data');
      setLoading(false);
    }
  };

  // Haal songgegevens op bij het laden van het scherm
  useEffect(() => {
    getSong();
  }, []);

  // Functie om gelikete songs te filteren
  const getLikedSongs = () => {
    return allSong.filter(song => song.liked);
  };

  // Functie om de zoekopdracht toe te passen op songs
  const handleSearch = (query) => {
    if (!query) {
      setSong(allSong);
      setSearchQuery('');
      return;
    }

    const filteredSongs = allSong.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setSong(filteredSongs);
    setSearchQuery(query);
  };

  // Functie om de like-knop te behandelen
  const handleLikeButtonPress = (songId) => {
    // Wissel de like/dislike-status om
    const updatedSongs = allSong.map(song =>
      song.id === songId
        ? { ...song, liked: !song.liked, disliked: song.liked ? false : !song.disliked }
        : song
    );

    setAllSong(updatedSongs);

    // Toon de status
    const status = updatedSongs.find(song => song.id === songId);
    const likeStatus = status.liked ? 'Liked' : status.disliked ? 'Disliked' : 'Neither Liked nor Disliked';
    console.log(`${likeStatus} Song Title: ${status.title}`);
  };

  // Weergave tijdens het laden
  if (loading) {
    return (
      <View style={styles.screen}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Weergave bij fouten
  if (error) {
    return (
      <View style={styles.screen}>
        <Text>{error}</Text>
      </View>
    );
  }

  // Navigeer naar de gelikete songs
  const navigateToLikedSongs = () => {
    const likedSongs = getLikedSongs();
    navigation.navigate('LikedSongs', { likedSongs });
  };

  // Weergave van het songscherm
  return (
    <View style={styles.screen}>
      {/* Zoekbalk */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Alle songs sectie */}
      <FlatList
        style={styles.list}
        data={SongD}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          if (Platform.OS === 'android') {
            item.bannerImage = item.bannerImage.replace('craft-news-a.ddev.site', '10.0.2.2:<vul port in>');
          }
          return (
            <NewsItem
              id={item.id}
              title={item.title}
              duration={item.duration}
              bannerImage={item.bannerImage}
              navigation={navigation}
              liked={item.liked} // Doorgeven van de like-status aan de NewsItem-component
              onSelectArticle={(selectedId) => {
                navigation.navigate('SongDetails', { id: selectedId });
              }}
              onLikeButtonPress={(songId) => handleLikeButtonPress(songId)}
            />
          );
        }}
      />

      {/* Liked Songs sectie */}
      <TouchableOpacity style={buttonsStyles.button} onPress={navigateToLikedSongs}>
        <Text style={buttonsStyles.buttonText}>Liked Songs</Text>
      </TouchableOpacity>
    </View>
  );
};

// Stijlen
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  list: {
    flex: 1,
    marginBottom: 15,
  },
});

const buttonsStyles = StyleSheet.create({
  button: {
    backgroundColor: '#285d04e3',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    borderBottomColor: 'white',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SongScreen;
