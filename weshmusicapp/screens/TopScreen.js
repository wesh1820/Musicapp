import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Platform } from 'react-native';
import NewsItem from '../components/TopScreenItem';

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
        url = "http://site.ddev.site/api/new/";
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
        renderItem={({ item }) => {
          if (Platform.OS == 'android') {
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
      title: {
        fontSize: 24,
        color: "green",
        fontWeight: "bold",
        textTransform: "uppercase",
        marginBottom: 16,
        textAlign: "center",
      },
      list: {
        flex: 1,
      },
      image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginBottom: 8,
      }, 
});

export default NewsScreen;
