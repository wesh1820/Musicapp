import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Platform, Image, TouchableOpacity } from 'react-native';
import NewsItem from '../components/ArtistItem';

// Functionele component voor het weergeven van het scherm met artiesten
const ArtistScreen = ({ navigation }) => {
  // State variabelen
  const [ArtistD, setArtist] = useState([]);
  const [allArtistD, setAllArtist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Functie om artiesten op te halen van de server
  const getArtist = async () => {
    try {
      // Bepaal de URL op basis van het besturingssysteem
      let url;
      if (Platform.OS == 'android') {
        url = "http://10.0.2.2:<vul port in>/api/news/";
      } else {
        url = "http://site.ddev.site/api/artist/";
      }

      // Haal gegevens op van de server
      const response = await fetch(url, {
        method: "GET",
      });
      const json = await response.json();

      // Zet de opgehaalde gegevens in de state
      setArtist(json.items);
      setAllArtist(json.items);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect-hook om de gegevens op te halen bij het laden van de component
  useEffect(() => {
    getArtist();
  }, []);

  // Handler-functie om de artikelen te filteren op basis van zoekopdracht
  const handleSearch = (query) => {
    if (!query) {
      setArtist(allArtistD);
      setSearchQuery('');
      return;
    }

    const filteredArticles = allArtistD.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setArtist(filteredArticles);
    setSearchQuery(query);
  };

  // Render de component
  return (
    <View style={styles.screen}>
      {/* Zoekbalk */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Lijst met artiesten */}
      <FlatList
        style={styles.list}
        data={ArtistD}
        keyExtractor={(item) => item.id}
        numColumns={2}  // Toon drie items in een rij
        renderItem={({ item }) => {
          // Vervang de bannerImage URL voor Android
          if (Platform.OS == 'android') {
            item.bannerImage = item.bannerImage.replace('craft-news-a.ddev.site', '10.0.2.2:<vul port in>');
          }
          return (
            <NewsItem
              id={item.id}
              title={item.title}
              bannerImage={item.bannerImage}
              navigation={navigation}
              onSelectArticle={(selectedId) => {
                navigation.navigate('ArtistDetails', { id: selectedId });
              }}
            />
          );
        }}
      />
    </View>
  );
};

// Stijlen voor de component
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
  },
  container: {
    alignItems: 'center',
    flex: 1,
    margin: 8,
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

// Exporteer de component
export default ArtistScreen;
