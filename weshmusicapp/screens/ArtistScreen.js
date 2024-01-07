import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Platform, Image, TouchableOpacity } from 'react-native';
import NewsItem from '../components/ArtistItem';


const ArtistScreen = ({ navigation }) => {
  const [ArtistD, setArtist] = useState([]);
  const [allArtistD, setAllArtist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const getArtist = async () => {
    try {
      let url;
      if (Platform.OS == 'android') {
        url = "http://10.0.2.2:<vul port in>/api/news/";
      } else {
        url = "http://site.ddev.site/api/artist/";
      }

      const response = await fetch(url, {
        method: "GET",
      });
      const json = await response.json();
      setArtist(json.items);
      setAllArtist(json.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getArtist();
  }, []);

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
        data={ArtistD}
        keyExtractor={(item) => item.id}
        numColumns={2}  // Display three items in a row
        renderItem={({ item }) => {
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fbfafa",
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

export default ArtistScreen;
