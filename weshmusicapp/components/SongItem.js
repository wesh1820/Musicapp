import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const SongItem = (props) => {
  // State voor het bijhouden van de like-status
  const [isLiked, setIsLiked] = useState(false);

  // Functie om de like-status om te schakelen en de knopdruk door te geven aan de bovenliggende component
  const handleLikeButtonPress = () => {
    setIsLiked(!isLiked);
    props.onLikeButtonPress(props.id);
  };

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => props.onSelectArticle(props.id)}>
      <View style={styles.songItem}>
        {/* Thumbnail afbeelding */}
        <Image style={styles.thumbnail} source={{ uri: props.bannerImage }} />

        {/* Details van het nummer */}
        <View style={styles.songDetails}>
          {/* Titel */}
          <Text style={[styles.title, isLiked && styles.likedTitle]}>
            {props.title}
          </Text>

          {/* Duur van het nummer */}
          <Text style={styles.duration}>{props.duration}</Text>
        </View>

        {/* Like-knop */}
        <TouchableOpacity onPress={handleLikeButtonPress}>
          <Text style={[styles.likeButton, { color: isLiked ? 'red' : 'white' }]}>
            {isLiked ? '❤️' : '🤍'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

// Stijlen
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
    textDecorationLine: 'none', 
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
