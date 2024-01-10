import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Platform } from 'react-native';
import NewsItem from '../components/SongItem';

const SongScreen = ({ navigation }) => {
  const [SongD, setSong] = useState([]);
  const [allSong, setAllSong] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = Platform.OS === 'android'
    ? 'http://10.0.2.2:<vul port in>/api/news/'
    : 'http://site.ddev.site/api/song/';

  const getSong = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
      });
      const json = await response.json();
      // Adding a 'liked' property to each song object
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

  useEffect(() => {
    getSong();
  }, []);

  // Function to filter liked songs
  const getLikedSongs = () => {
    return allSong.filter(song => song.liked);
  };

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

  const handleLikeButtonPress = (songId) => {
    // Toggle the like/dislike status
    const updatedSongs = allSong.map(song =>
      song.id === songId
        ? { ...song, liked: !song.liked, disliked: song.liked ? false : !song.disliked }
        : song
    );

    setAllSong(updatedSongs);

    // Display the status
    const status = updatedSongs.find(song => song.id === songId);
    const likeStatus = status.liked ? 'Liked' : status.disliked ? 'Disliked' : 'Neither Liked nor Disliked';
    console.log(`${likeStatus} Song Title: ${status.title}`);
  };

  if (loading) {
    return (
      <View style={styles.screen}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.screen}>
        <Text>{error}</Text>
      </View>
    );
  }

  const navigateToLikedSongs = () => {
    const likedSongs = getLikedSongs();
    navigation.navigate('LikedSongs', { likedSongs });
  };

  return (
    <View style={styles.screen}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* All Songs Section */}
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
              liked={item.liked} // Pass liked status to the NewsItem component
              onSelectArticle={(selectedId) => {
                navigation.navigate('SongDetails', { id: selectedId });
              }}
              onLikeButtonPress={(songId) => handleLikeButtonPress(songId)}
            />
          );
        }}
      />

      {/* Liked Songs Section */}

      <TouchableOpacity style={buttonsStyles.button} onPress={navigateToLikedSongs}>
            <Text style={buttonsStyles.buttonText}>Liked Songs</Text>
          </TouchableOpacity>
    </View>
  );
};

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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white', // Change the color to green or any desired color
    padding: 10, // Adjust padding as needed
    width: 353,
    backgroundColor: '#285d04e3',
  },

});
const buttonsStyles = StyleSheet.create({
  buttonsContainer: {
    alignItems: 'center',
    marginTop: 20,
    width: '80%', // Adjust the width as needed
  },
  settingsIconContainer: {
    position: 'absolute',
    top: -445,
    right: -24,
  },
  button: {
    backgroundColor: '#285d04e3',
    padding: 10,
    borderRadius: 10,
    width: '100%', // Adjust the width as needed
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
