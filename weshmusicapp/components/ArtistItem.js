import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ArtistItem = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => props.onSelectArticle(props.id)}>
      <View style={styles.container}>
        <View style={styles.thumbnailContainer}>
          <Image
            style={styles.thumbnail}
            source={{
              uri: props.bannerImage,
            }}
          />
        </View>
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ArtistItem: {
    padding: 13,
    marginVertical: 8,
    
    borderWidth: 0,
    borderRadius: 5,
    shadowRadius: 1,
    alignItems: 'center', // Center horizontally
  },
  thumbnail: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 8,
    margin: 10,
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

export default ArtistItem;
