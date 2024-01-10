import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, FlatList, Platform } from 'react-native';
import NewsItem from '../components/TopItem';

const HomeScreen = ({ navigation }) => {

  // State voor artikelen en zoekopdracht
  const [articles, setArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]);

  // Functie om artikelen op te halen
  const getNewsArticles = async () => {
    try {
      let url;
      if (Platform.OS == 'android') {
        // Vervang '<vul port in>' door de daadwerkelijke poort
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

  // Haal artikelen op bij het laden van het scherm
  useEffect(() => {
    getNewsArticles();
  }, []);

  // Functie om artikelen te filteren op basis van zoekopdracht
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
    <View style={styles.container}>
      <ImageBackground style={styles.background}>
        <View style={styles.centeredContainer}>
           <Text style={styles.welcomeText}>The top 40 of this week!</Text>
          <FlatList
            style={flatListStyles.list}
            data={articles}
            keyExtractor={(item) => item.id}
            numColumns={10}
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
                    navigation.navigate('Top40', { id: selectedId });
                  }}
                />
              );
            }}
          />
        </View>
        <View style={buttonsStyles.buttonsContainer}>
          <TouchableOpacity style={buttonsStyles.button} onPress={() => navigation.navigate('Playlists')}>
            <Text style={buttonsStyles.buttonText}>My Playlists</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 60, 
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

const flatListStyles = StyleSheet.create({
  list: {
    flex: 1,
    fontSize: 18,
  },
});

const buttonsStyles = StyleSheet.create({
  buttonsContainer: {
    alignItems: 'center',
    marginTop: 20,
    width: '80%', 
  },
  button: {
    backgroundColor: '#285d04e3',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    width: '112%', 
    alignItems: 'center',
    borderBottomColor: 'white',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
