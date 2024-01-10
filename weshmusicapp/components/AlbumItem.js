import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const AlbumItem = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => props.onSelectArticle(props.id)}>
      <View style={styles.albumItem}>
        {/* Container voor de thumbnail (afbeelding van het album) */}
        <View style={styles.thumbnailContainer}>
          <Image
            style={styles.thumbnail}
            source={{
              uri: props.bannerImage,
            }}
          />
        </View>
        {/* Tekst voor de titel van het album */}
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Stijlen voor de component
const styles = StyleSheet.create({
  albumItem: {
    marginVertical: 8,
    borderWidth: 0,
    borderRadius: 5,
    shadowRadius: 1,
    alignItems: 'center', // Horizontaal centreren
  },
  thumbnailContainer: {
    // Stijl voor de container van de thumbnail
  },
  thumbnail: {
    width: 150,
    height: 150,
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
    textAlign: 'center', // Tekst horizontaal centreren
  },
  intro: {
    marginBottom: 8,
  },
});

// Exporteer de component
export default AlbumItem;
