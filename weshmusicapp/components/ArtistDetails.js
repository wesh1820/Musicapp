import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Platform } from 'react-native';

const ArtistDetails = (props) => {
  // State om artiestgegevens op te slaan
  const [artistDetails, setArtistDetails] = useState({});

  // Functie om artiestgegevens op te halen
  const getArtistData = async () => {
    try {
      // Bepaal de API-URL op basis van het besturingssysteem
      let url;
      if (Platform.OS === 'android') {
        url = `http://10.0.2.2:<vul port in>/api/news/${props.articleId}`;
      } else {
        url = 'http://site.ddev.site/api/artist/' + props.articleId;
      }

      // Voer een GET-verzoek uit om artiestgegevens op te halen
      const response = await fetch(url, {
        method: 'GET',
      });

      // Converteer het antwoord naar JSON-formaat
      const json = await response.json();

      // Voer specifieke bewerkingen uit voor Android (indien nodig)
      if (Platform.OS === 'android') {
        json.bannerImage = json.bannerImage.replace('craft-news-a.ddev.site', `10.0.2.2:<vul port in>`);
      }

      // Zet de ontvangen artiestgegevens in de staat
      setArtistDetails(json);
    } catch (error) {
      console.error(error);
    }
  };

  // Effect hook om de artiestgegevens op te halen wanneer de component is gemonteerd
  useEffect(() => {
    getArtistData();
  }, []);

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
      {/* Afbeelding van de artiest */}
      <Image style={styles.image} source={{ uri: artistDetails.bannerImage }} />

      {/* Container voor artiestinformatie */}
      <View style={styles.container}>
        {/* Naam van de artiest */}
        <Text style={styles.title}>{artistDetails.title}</Text>

        {/* Nationaliteit van de artiest */}
        <Text style={styles.nationality}>#{artistDetails.nationality}</Text>

        {/* Sectietitel voor de lijst met nummers */}
        <Text style={styles.sectionTitle}>Songs:</Text>

        {/* Lijst met nummers van de artiest */}
        {artistDetails.song && artistDetails.song.length > 0 && (
          <View style={styles.songList}>
            {artistDetails.song.map((song, index) => (
              <View key={index} style={styles.songItem}>
                {/* Weergeven van de details van elk nummer */}
                <Text style={styles.details}>{`${song.title} - ${song.duration}`}</Text>

                {/* Scheider tussen nummers */}
                {index < artistDetails.song.length - 1 && <View style={styles.separator} />}
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

// Stijlen voor de component
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
  songItem: {
    marginBottom: 8,
  },
  separator: {
    borderBottomColor: '#51b60b85', // Lichtgrijze kleur
    borderBottomWidth: 2,
    marginVertical: 8,
  },
});

// Exporteer de component
export default ArtistDetails;
