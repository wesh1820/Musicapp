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
    <ScrollView>
      <Image
        style={styles.image}
        source={{
          uri: article.bannerImage
        }}
      />
      <View style={styles.wrapper}>
        <Text style={styles.title}>{article.title}</Text>
        {article.artist && article.artist.length > 0 && (
          <View>
            <Text style={styles.details}>artist:</Text>
            {article.artist.map((artist, index) => (
              <Text key={index} style={styles.details}>{artist.title}</Text>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 150,
  },
  wrapper: {
    padding: 24
  },
  title: {
    fontSize: 34,
    color: "#D24335",
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
