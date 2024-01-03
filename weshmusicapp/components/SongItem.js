import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const NewsItem = (props) => {
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(false);

  const handlePress = () => {
    // Toggle the like state
    setIsLiked(!isLiked);

    // Navigate to the Playlist screen
    navigation.navigate('Playlist', { songId: props.id });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={handlePress}
    >
      <View style={styles.newsItem}>
        <Image
          style={styles.thumbnail}
          source={{
            uri: props.bannerImage,
          }}
        />
        <View style={styles.songDetails}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.duration}>{props.duration}</Text>
        </View>
        <TouchableOpacity
          onPress={handlePress}
        >
          <Icon
            name={isLiked ? 'dot-circle-o' : 'plus'} // Use 'plus' for not liked, 'dot-circle-o' for liked
            size={25}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  newsItem: {
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
  button: {
    borderRadius: 5,
    marginLeft: 10,
    padding: 10,
  },
});

export default NewsItem;
