import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Platform } from 'react-native';

import NewsItem from '../components/AlbumItem';

const NewsScreen = ({ navigation }) => {
  const [articles, getArticles] = useState([]);

  const getNewsArticles = async () => {
    try {
      //127.0.0.1 -> surft naar dit toestel
      //10.0.2.2 -> surft naar host toestel

      let url;
      if (Platform.OS == 'android') {
        //ddev describe om port number te weten te komen
        url = "http://10.0.2.2:<vul port in>/api/news/";
      }
      else {
        url = "http://site.ddev.site/api/album/";
      }

      const response = await fetch(url, {
        "method": "GET",
      });
      const json = await response.json();
      getArticles(json.items);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getNewsArticles();
  }, []);

  return (
    <View style={styles.screen}>
      <FlatList
        style={styles.list}
        data={articles}
        keyExtractor={item => item.id}//gebruik id als key voor de flatlist
        renderItem={({ item }) => {
          if (Platform.OS == 'android') {
            //ddev describe om port number te weten te komen
            item.bannerImage = item.bannerImage.replace('craft-news-a.ddev.site', '10.0.2.2:<vul port in>')
          }
          console.log(item.bannerImage);
          return <NewsItem
            id={item.id}
            title={item.title}
            bannerImage={item.bannerImage}
            navigation={navigation}
            onSelectArticle={(selectedId) => { navigation.navigate('AlbumDetails', { id: selectedId }) }}
          />
        }}
      />
    </View >
  );
}





const styles = StyleSheet.create({
  screen: {
    padding: 24,
    backgroundColor: "#F8F6F6",
  },
  list: {
    height: "90%",
  },
  title: {
    fontSize: 24,
    color: "#D24335",
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 8,
    textAlign: "center"
  }
});
export default NewsScreen;