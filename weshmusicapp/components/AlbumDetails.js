import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Platform } from 'react-native';

const AlbumDetails = (props) => {
  const [albumD, setAlbum] = useState({});

  const getAlbumData = async () => {
    try {
      let url;
      if (Platform.OS == 'android') {
        // Use the correct URL for Android
        url = `http://10.0.2.2:<vul port in>/api/news/${props.articleId}`;
      } else {
        url = "http://site.ddev.site/api/album/";
        url += props.articleId;
      }
      const response = await fetch(url, {
        method: "GET",
      });
      const json = await response.json();
      if (Platform.OS == 'android' && json.bannerImage) {
        // Replace the domain in the bannerImage URL for Android
        json.bannerImage = json.bannerImage.replace(
          "craft-news-a.ddev.site",
          "10.0.2.2:<vul port in>"
        );
      }
      setAlbum(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAlbumData();
  }, []);

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
      <Image style={styles.image} source={{ uri: albumD.bannerImage }} />
      <View style={styles.container}>
        <Text style={styles.title}>{albumD.title}</Text>
        <Text style={styles.nationality}>#{albumD.release}</Text>
        <Text style={styles.sectionTitle}>Songs:</Text>
{albumD.song && albumD.song.length > 0 && (
  <View style={styles.songList}>
    {albumD.song.map((song, index) => (
      <View key={index} style={styles.songItem}>
        <Text style={styles.details}>{`${song.title} - ${song.duration}`}</Text>
        {index < albumD.song.length - 1 && <View style={styles.separator} />}
      </View>
    ))}
  </View>
)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    padding: 24,
  },
  image: {
    height: 350,
    width: '100%',
    resizeMode: 'cover',
  },
  
  title: {
    fontSize: 32,
    color: 'black',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  nationality: {
    fontSize: 15,
    color: '#2E7D32',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    color: '#51b60b85',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  songList: {
    marginTop: 8,
  },
  details: {
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separator: {
    borderBottomColor: '#51b60b85', // Light gray color
    borderBottomWidth: 2,
    marginVertical: 8,
  },
});

export default AlbumDetails;
