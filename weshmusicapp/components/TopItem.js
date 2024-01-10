import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const TopItem = (props) => {
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
  container: {
    padding: 3,
    marginVertical: 8,
    shadowRadius: 1,
    alignItems: 'center', // Horizontaal centreren
  },
  thumbnailContainer: {
    alignItems: 'center', // Horizontaal centreren
  },
  thumbnail: {
    width: 330,
    height: 330,
    borderRadius: 10,
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
    textAlign: 'center', // Horizontaal centreren
  },
});

export default TopItem;
