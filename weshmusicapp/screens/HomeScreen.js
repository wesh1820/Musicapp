import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TextInput, Platform } from 'react-native';
import NewsItem from '../components/TopScreenItem';
import AlbumItem from '../components/AlbumItem';

const HomeScreen = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const getTopItems = async () => {
    try {
      const newsUrl = Platform.OS === 'android'
        ? "http://10.0.2.2:<vul port in>/api/news/"
        : "http://site.ddev.site/api/new/";

      const albumsUrl = Platform.OS === 'android'
        ? "http://10.0.2.2:<vul port in>/api/albums/"
        : "http://site.ddev.site/api/album/";

      const [newsResponse, albumsResponse] = await Promise.all([
        fetch(newsUrl, { method: "GET" }),
        fetch(albumsUrl, { method: "GET" }),
      ]);

      const [newsJson, albumsJson] = await Promise.all([
        newsResponse.json(),
        albumsResponse.json(),
      ]);

      setNews(newsJson.items);
      setAlbums(albumsJson.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTopItems();
  }, []);

  const handleSearch = (query) => {
    const filteredNews = news.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    const filteredAlbums = albums.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    setSearchQuery(query);
    setNews(filteredNews);
    setAlbums(filteredAlbums);
  };

  const renderNewsItem = ({ item }) => (
    <NewsItem
      {...item}
      navigation={navigation}
      onSelectItem={(selectedId) => {
        navigation.navigate('Top40', { id: selectedId });
      }}
    />
  );

  const renderAlbumItem = ({ item }) => (
    <AlbumItem
      {...item}
      navigation={navigation}
      onSelectItem={(selectedId) => {
        navigation.navigate('AlbumDetails', { id: selectedId });
      }}
    />
  );

  return (
    <ScrollView horizontal style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>News</Text>
        <FlatList
          data={news}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderNewsItem}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Albums</Text>
        <FlatList
          data={albums}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderAlbumItem}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    flexDirection: 'column',
    marginRight: 20, // Ruimte tussen de secties
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default HomeScreen;
