import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const SongItem = (props) => {


  return (
    <TouchableOpacity>
      <View style={styles.songItem}>
        <Image
          style={styles.thumbnail}
          source={{ uri: props.bannerImage }}
        />
        <View style={styles.songDetails}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.duration}>{props.duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  songItem: {
    flexDirection: 'row',
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#51b60b85',
    borderWidth: 0,
    borderRadius: 5,
    shadowRadius: 1,
    alignItems: 'center', // Center horizontally
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  songDetails: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    textTransform: 'uppercase',
    textAlign: 'center', // Center text horizontally
  },
  duration: {
    color: 'black',
    textAlign: 'center',
  },
  likeButton: {
    fontSize: 16,
    marginLeft: 8,
  },
});

export default SongItem;
