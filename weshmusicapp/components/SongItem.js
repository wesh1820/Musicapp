import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const SongItem = (props) => {
  const handleLikeButtonPress = () => {
    // Call the parent function to add/remove the song from the liked songs list
    props.onLikeButtonPress(props.id);
  };

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => props.onSelectArticle(props.id)}>
      <View style={styles.SongItem}>
        <Image style={styles.thumbnail} source={{ uri: props.bannerImage }} />
        <View style={styles.songDetails}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.duration}>{props.duration}</Text>
        </View>
        <TouchableOpacity onPress={handleLikeButtonPress}>
          <Text style={[styles.likeButton, { color: props.isLiked ? 'red' : 'blue' }]}>
            {props.isLiked ? 'Unlike' : 'Like'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  SongItem: {
    flexDirection: 'row',
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#51b60b85',
    borderRadius: 5,
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
