import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Platform } from 'react-native';

const NewsArticle = (props) => {
  const [article, setArticle] = useState({});

  const getArticleData = async () => {
    try {
      let url;
      if (Platform.OS == 'android') {
        url = "http://10.0.2.2:<vul port in>/api/news/";
      } else {
        url = "http://site.ddev.site/api/artist/";
      }
      url += props.articleId;
      const response = await fetch(url, {
        method: "GET",
      });
      const json = await response.json();
      if (Platform.OS == 'android') {
        json.bannerImage = json.bannerImage.replace("craft-news-a.ddev.site", "10.0.2.2:<vul port in>");
      }
      setArticle(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getArticleData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.centered}>
        <Image style={styles.image} source={{ uri: article.bannerImage }} />
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.body}>{article.fullText}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 250,
    width: 250, // Set a fixed width for a round image
    borderRadius: 35, // Half of the width for a round shape
  },
  wrapper: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: "#D24335",
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 24,
  },
  body: {
    lineHeight: 24,
    textAlign: 'center', // Center text
  },
});

export default NewsArticle;
