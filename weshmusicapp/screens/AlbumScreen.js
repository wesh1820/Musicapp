import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Platform, Image, TouchableOpacity } from 'react-native';
import NewsItem from '../components/AlbumItem';


const NewsScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const getNewsArticles = async () => {
    try {
      let url;
      if (Platform.OS == 'android') {
        url = "http://10.0.2.2:<vul port in>/api/news/";
      } else {
        url = "http://site.ddev.site/api/album/";
      }

      const response = await fetch(url, {
        method: "GET",
      });
      const json = await response.json();
      setArticles(json.items);
      setAllArticles(json.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNewsArticles();
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setArticles(allArticles);
      setSearchQuery('');
      return;
    }

    const filteredArticles = allArticles.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setArticles(filteredArticles);
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
        data={articles}
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
                navigation.navigate('AlbumDetails', { id: selectedId });
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
  thumbnailContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 8,
  },
  thumbnail: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default NewsScreen;
