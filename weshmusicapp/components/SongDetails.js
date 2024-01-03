import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Platform } from 'react-native';

const NewsArticle = props => {
  const [article, setArticle] = useState({});

  const getArticleData = async () => {
    try {
      let url;
      if (Platform.OS == 'android') {
        url = "http://10.0.2.2:<vul port in>/api/news/";
      } else {
        url = "http://site.ddev.site/api/song/";
      }
      url += props.articleId;
      const response = await fetch(url, {
        "method": "GET",
      });
      const json = await response.json();
      if (Platform.OS == 'android') {
        json.bannerImage = json.bannerImage.replace("craft-news-a.ddev.site", "10.0.2.2:<vul port in>");
      }
      setArticle(json);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getArticleData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: article.bannerImage
            }}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{article.title}</Text>
          {article.artist && article.artist.length > 0 && (
            <View>
              {article.artist.map((artist, index) => (
                <Text key={index} style={styles.details}>Artist: {artist.title}</Text>
              ))}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

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
    color: "#51b60b85",
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 24,
  },
  details: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 12,
  },
});

export default NewsArticle;
