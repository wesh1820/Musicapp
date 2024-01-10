import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Platform } from 'react-native';
import NewsItem from '../components/PlaylistItem';

const PlaylistScreen = ({ navigation }) => {
  // State voor het opslaan van afspeellijstgegevens
  const [PlaylistD, setPlaylist] = useState([]);
  const [AllPlaylist, setAllPlaylist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Bepaal de API URL op basis van het besturingssysteem
  const API_URL = Platform.OS === 'android'
    ? 'http://10.0.2.2:<vul port in>/api/news/'
    : 'http://site.ddev.site/api/song/';

  // Functie om afspeellijstgegevens op te halen
  const getPlaylist = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
      });
      const json = await response.json();
      setPlaylist(json.items);
      setAllPlaylist(json.items);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('Error fetching data');
      setLoading(false);
    }
  };

  // Haal afspeellijstgegevens op bij het laden van het scherm
  useEffect(() => {
    getPlaylist();
  }, []);

  // Functie om afspeellijst te filteren op basis van zoekopdracht
  const handleSearch = (query) => {
    if (!query) {
      setPlaylist(AllPlaylist);
      setSearchQuery('');
      return;
    }

    const filteredArticles = AllPlaylist.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setPlaylist(filteredArticles);
    setSearchQuery(query);
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

  // Weergave van de afspeellijst
  return (
    <View style={styles.screen}>
      <FlatList
        style={styles.list}
        data={PlaylistD}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          if (Platform.OS === 'android') {
            // Vervang 'craft-news-a.ddev.site' door '10.0.2.2:<vul port in>'
            item.bannerImage = item.bannerImage.replace('craft-news-a.ddev.site', '10.0.2.2:<vul port in>');
          }
          return (
            <NewsItem
              id={item.id}
              title={item.title}
              duration={item.duration}
              bannerImage={item.bannerImage}
              navigation={navigation}
              onSelectArticle={(selectedId) => {
                navigation.navigate('SongDetails', { id: selectedId });
              }}
              onLikeButtonPress={(songId) => {
                // Je logica om met de like-knop te werken
                console.log(`Like button pressed for song with ID: ${songId}`);
              }}
            />
          );
        }}
      />
    </View>
  );
};

// Stijlen
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

export default PlaylistScreen;
