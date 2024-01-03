import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, Platform, TouchableOpacity } from 'react-native';

const NewsArticle = (props) => {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showLyrics, setShowLyrics] = useState(false);

  const getArticleData = async () => {
    try {
      let url;
      if (Platform.OS === 'android') {
        url = `http://10.0.2.2:<vul port in>/api/news/${props.articleId}`;
      } else {
        url = `http://site.ddev.site/api/song/${props.articleId}`;
      }
      const response = await fetch(url, {
        method: 'GET',
      });
      const json = await response.json();
      if (Platform.OS === 'android') {
        json.bannerImage = json.bannerImage.replace('craft-news-a.ddev.site', `10.0.2.2:<vul port in>`);
      }
      setArticle(json);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getArticleData();
  }, []);

  const handleShowLyrics = () => {
    setShowLyrics(true);
  };

  const handleHideLyrics = () => {
    setShowLyrics(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#51b60b85" />
      ) : (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: article.bannerImage }}
            />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{article.title}</Text>

            {article.artist && article.artist.length > 0 && (
              <View>
                {article.artist.map((artist, index) => (
                  <Text key={index} style={styles.details}>
                    Artist: {artist.title}
                  </Text>
                ))}
              </View>
            )}
            {!showLyrics ? (
              <TouchableOpacity onPress={handleShowLyrics}>
                <Text style={styles.showLyricsButton}>Show Lyrics</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleHideLyrics}>
                <Text style={styles.hideLyricsButton}>Hide Lyrics</Text>
              </TouchableOpacity>
            )}

            {showLyrics && article.lyrics && (
              <View style={styles.lyricsContainer}>
                <Text style={[styles.lyrics, styles.centeredText]}>
                  {article.lyrics.replace(/<\/?[^>]+(>|$)/g, "")}
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    height: 250,
    width: 250,
    borderRadius: 8,
  },
  contentContainer: {
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 34,
    color: 'black',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 24,
  },
  lyrics: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 24,

  },
  lyricsContainer: {
    backgroundColor: "#51b60b85",
    padding: 10,
    borderRadius: 8,
    marginBottom: 24,
  },
  centeredText: {
    textAlign: 'center',
  },
  showLyricsButton: {
    fontSize: 15,
    color: '#51b60b85',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 24,
    textDecorationLine: 'underline',
  },
  hideLyricsButton: {
    fontSize: 15,
    color: '#51b60b85',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 24,
    textDecorationLine: 'underline',
  },
  video: {
    width: 300,
    height: 200,
    marginBottom: 16,
  },
  details: {
    fontSize: 20,
    color: '#2E7D32',
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 12,
  },
});

export default NewsArticle;
