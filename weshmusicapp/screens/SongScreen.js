import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Platform } from 'react-native';
import NewsItem from '../components/SongItem';

const NewsScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = Platform.OS === 'android'
    ? 'http://10.0.2.2:<vul port in>/api/news/'
    : 'http://site.ddev.site/api/song/';

  const getNewsArticles = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
      });
      const json = await response.json();
      setArticles(json.items);
      setAllArticles(json.items);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('Error fetching data');
      setLoading(false);
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
        data={articles}
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
  onSelectArticle={(selectedId) => {
    navigation.navigate('SongDetails', { id: selectedId });
  }}
  onLikeButtonPress={(songId) => {
    // Your logic to handle like button press
    console.log(`Like button pressed for song with ID: ${songId}`);
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

export default NewsScreen;
