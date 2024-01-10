import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const SongItem = (props) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeButtonPress = () => {
    setIsLiked(!isLiked);
    props.onLikeButtonPress(props.id);
  };

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => props.onSelectArticle(props.id)}>
      <View style={styles.songItem}>
        <Image style={styles.thumbnail} source={{ uri: props.bannerImage }} />
        <View style={styles.songDetails}>
          <Text style={[styles.title, isLiked && styles.likedTitle]}>
            {props.title}
          </Text>
          {!isLiked && <Text style={styles.duration}>{props.duration}</Text>}
        </View>
        <TouchableOpacity onPress={handleLikeButtonPress}>
          <Text style={[styles.likeButton, { color: isLiked ? 'red' : 'blue' }]}>
            {isLiked ? 'Unlike' : 'Like'}
          </Text>
        </TouchableOpacity>
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
    alignItems: 'center',
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
    textAlign: 'center',
  },
  likedTitle: {
    textDecorationLine: 'none', // Remove underline when liked
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
