import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Platform } from 'react-native';
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
    // Find the song by ID
    const selectedSongIndex = allSong.findIndex(song => song.id === songId);

    // Toggle the like/dislike status
    const updatedSongs = [...allSong];
    if (selectedSongIndex !== -1) {
      updatedSongs[selectedSongIndex].liked = !updatedSongs[selectedSongIndex].liked;
    }

    setAllSong(updatedSongs);

    // Display the status
    const status = updatedSongs[selectedSongIndex].liked ? 'Liked' : 'Disliked';
    console.log(`${status} Song Title: ${updatedSongs[selectedSongIndex].title}`);
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

  return (
    <View style={styles.screen}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
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
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fbfafa',
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
  },
});

export default SongScreen;
