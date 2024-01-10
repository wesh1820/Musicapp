import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Platform } from 'react-native';
import AlbumItem from '../components/AlbumItem';

const AlbumScreen = ({ navigation }) => {
  // State voor het bijhouden van albumgegevens
  const [albumData, setAlbumData] = useState([]);
  
  // State voor het bijhouden van alle albumgegevens (ongefilterd)
  const [allAlbumData, setAllAlbumData] = useState([]);
  
  // State voor het bijhouden van de zoekquery
  const [searchQuery, setSearchQuery] = useState('');

  // Functie om albumgegevens op te halen van de API
  const getAlbumData = async () => {
    try {
      // Bepaal de API-URL op basis van het besturingssysteem
      let url;
      if (Platform.OS === 'android') {
        url = "http://10.0.2.2:<vul port in>/api/news/";
      } else {
        url = "http://site.ddev.site/api/album/";
      }

      // Voer een GET-verzoek uit om albumgegevens op te halen
      const response = await fetch(url, {
        method: "GET",
      });

      // Converteer het antwoord naar JSON-formaat
      const json = await response.json();

      // Zet de ontvangen albumgegevens in de staat
      setAlbumData(json.items);

      // Zet de ontvangen albumgegevens ook in een staat voor ongefilterde gegevens
      setAllAlbumData(json.items);
    } catch (error) {
      console.error(error);
    }
  };

  // Effect hook om de albumgegevens op te halen wanneer de component is gemonteerd
  useEffect(() => {
    getAlbumData();
  }, []);

  // Functie om de albums te filteren op basis van de zoekquery
  const handleSearch = (query) => {
    if (!query) {
      // Als de zoekquery leeg is, toon alle albums
      setAlbumData(allAlbumData);
      setSearchQuery('');
      return;
    }

    // Filter de albums op basis van de zoekquery
    const filteredAlbums = allAlbumData.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setAlbumData(filteredAlbums);
    setSearchQuery(query);
  };

  return (
    <View style={styles.screen}>
      {/* Zoekbalk voor het invoeren van zoekquery */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* FlatList voor het weergeven van albums */}
      <FlatList
        style={styles.list}
        data={albumData}
        keyExtractor={(item) => item.id}
        numColumns={2}  // Toon drie items in een rij
        renderItem={({ item }) => {
          // Bij Android de bannerImage aanpassen aan de lokale host
          if (Platform.OS === 'android') {
            item.bannerImage = item.bannerImage.replace('craft-news-a.ddev.site', '10.0.2.2:<vul port in>');
          }

          // Weergave van elk AlbumItem
          return (
            <AlbumItem
              id={item.id}
              title={item.title}
              bannerImage={item.bannerImage}
              navigation={navigation}
              onSelectArticle={(selectedId) => {
                navigation.navigate('AlbumDetails', { id: selectedId });
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
});

// Exporteer de component
export default AlbumScreen;
