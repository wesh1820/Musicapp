import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Platform } from 'react-native';

const TopDetails = (props) => {
  // State voor het opslaan van gegevens van het topartikel
  const [TopD, setTop] = useState({});

  // Functie om topgegevens op te halen
  const getTopData = async () => {
    try {
      let url;
      // Bepaal de URL op basis van het besturingssysteem
      if (Platform.OS === 'android') {
        // Vervang '<vul port in>' door de daadwerkelijke poort
        url = `http://10.0.2.2:<vul port in>/api/news/${props.articleId}`;
      } else {
        url = 'http://site.ddev.site/api/new/' + props.articleId;
      }
      
      // Haal gegevens op van de API
      const response = await fetch(url, {
        method: 'GET',
      });
      const json = await response.json();
      
      // Voor Android, pas de bannerImage URL aan
      if (Platform.OS === 'android') {
        json.bannerImage = json.bannerImage.replace('craft-news-a.ddev.site', `10.0.2.2:<vul port in>`);
      }
      
      // Zet de opgehaalde gegevens in de state
      setTop(json);
    } catch (error) {
      console.error(error);
    }
  };

  // Haal topgegevens op bij het laden van het scherm
  useEffect(() => {
    getTopData();
  }, []);

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
      {/* Topafbeelding */}
      <Image style={styles.image} source={{ uri: TopD.bannerImage }} />
      
      {/* Inhoud van het topartikel */}
      <View style={styles.container}>
        <Text style={styles.title}>{TopD.title}</Text>
        
        {/* Lijst van nummers als deze bestaat */}
        {TopD.song && TopD.song.length > 0 && (
          <View style={styles.songList}>
            {TopD.song.map((song, index) => (
              <View key={index} style={styles.songItem}>
                <Text style={styles.details}>{`${index + 1}. ${song.title} - ${song.duration}`}</Text>
                {index < TopD.song.length - 1 && <View style={styles.separator} />}
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

// Stijlen
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
    height: 250,
    width: 400,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 32,
    color: '#51b60b85',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  songList: {
    marginTop: 8,
  },
  songItem: {
    marginBottom: 8,
  },
  details: {
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  separator: {
    borderBottomColor: '#51b60b85', // Lichtgrijze kleur
    borderBottomWidth: 2,
    marginVertical: 8,
  },
});

export default TopDetails;
