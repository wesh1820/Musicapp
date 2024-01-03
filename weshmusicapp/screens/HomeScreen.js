import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, FlatList, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NewsItem from '../components/TopScreenItem';

const HomeScreen = ({ navigation }) => {
  const userName = "John";
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
    <View style={styles.container}>
      <ImageBackground style={styles.background} source={require('../assets/rock.jpeg')}>
        <View style={styles.contentContainer}>
          <Text style={styles.welcomeText}>Welcome, {userName}!</Text>
        </View>
        {/* Centered FlatList component */}
        <View style={styles.centeredContainer}>
          <Text style={styles.top}>TOP 40</Text>
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
                    navigation.navigate('SongDetails', { id: selectedId });
                  }}
                />
              );
            }}
          />
        </View>

        {/* Buttons */}
        <View style={buttonsStyles.buttonsContainer}>
          <TouchableOpacity onPress={() => console.log('Settings pressed')} style={buttonsStyles.settingsIconContainer}>
            <Icon name="cog" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={buttonsStyles.button} onPress={() => navigation.navigate('Playlist')}>
            <Text style={buttonsStyles.buttonText}>My Playlists</Text>
          </TouchableOpacity>
          <TouchableOpacity style={buttonsStyles.button} onPress={() => navigation.navigate('Favorite')}>
            <Text style={buttonsStyles.buttonText}>My Favorites</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginLeft: 330,
  },
  welcomeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#51b60b85',
    textDecorationLine: 'underline',
    marginBottom: 280,
  },
  top: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#51b60b85',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -150,
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
    width: '80%', // Adjust the width as needed
  },
  settingsIconContainer: {
    position: 'absolute',
    top: -445,
    right: -24,
  },
  button: {
    backgroundColor: '#51b60b85',
    padding: 20,
    borderRadius: 10,
    marginBottom: 40,
    width: '100%', // Adjust the width as needed
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'white',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
