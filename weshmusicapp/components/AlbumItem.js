import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const NewsItem = props => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => props.onSelectArticle(props.id)}>
      <View style={styles.newsItem}>
        <Image
          style={styles.image}
          source={{
            uri: props.bannerImage
          }}
        />
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  newsItem: {
    padding: 13,
    marginVertical: 8,
    
    borderWidth: 0,
    borderRadius: 5,
    shadowRadius: 1,
    alignItems: 'center', // Center horizontally
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  }, 
  title: {
    fontWeight: "bold",
    color: "black",
    fontSize: 10,
    marginTop: 12,
    marginBottom: 12,
    textTransform: "uppercase",
    textAlign: 'center', // Center text horizontally
  },
  intro: {
    marginBottom: 8,
  }
});

export default NewsItem;
