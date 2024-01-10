import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

// Functionele component voor het weergeven van details van een liedje
const NewsSong = (props) => {
  // State variabelen
  const [songDetails, setSongDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showLyrics, setShowLyrics] = useState(false);

  // Functie om gegevens van het liedje op te halen van de server
  const getSongData = async () => {
    try {
      // Bepaal de basis-URL op basis van het besturingssysteem
      const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:<vul port in>' : 'http://site.ddev.site';
      const url = `${baseUrl}/api/song/${props.articleId}`;

      // Haal gegevens op van de server
      const response = await fetch(url, { method: 'GET' });
      const json = await response.json();

      // Vervang de bannerImage URL voor Android
      if (Platform.OS === 'android') {
        json.bannerImage = json.bannerImage.replace('craft-news-a.ddev.site', `10.0.2.2:<vul port in>`);
      }

      // Zet de opgehaalde gegevens in de state
      setSongDetails(json);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  // useEffect-hook om de gegevens op te halen bij het laden van de component
  useEffect(() => {
    getSongData();
  }, []);

  // Handler-functie om de weergave van de songteksten te tonen
  const handleShowLyrics = () => {
    setShowLyrics(true);
  };

  // Handler-functie om de weergave van de songteksten te verbergen
  const handleHideLyrics = () => {
    setShowLyrics(false);
  };

  // Render de component
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {/* Laadindicator weergeven tijdens het ophalen van gegevens */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#51b60b85" />
      ) : (
        <View style={styles.container}>
          {/* Liedjesafbeelding */}
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: songDetails.bannerImage }}
            />
          </View>
          {/* Details van het liedje */}
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{songDetails.title}</Text>

            {/* Artiestinformatie weergeven als die er is */}
            {songDetails.artist && songDetails.artist.length > 0 && (
              <View>
                {songDetails.artist.map((artist, index) => (
                  <Text key={index} style={styles.details}>
                    Artist: {artist.title}
                  </Text>
                ))}
              </View>
            )}

            {/* Weergave van de videoclip met behulp van WebView */}
            <WebView
              source={{ uri: songDetails.videoclip }}
              style={styles.video}
            />

            {/* Knop om de songteksten weer te geven of te verbergen */}
            {!showLyrics ? (
              <TouchableOpacity onPress={handleShowLyrics}>
                <Text style={styles.showLyricsButton}>Show Lyrics</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleHideLyrics}>
                <Text style={styles.hideLyricsButton}>Hide Lyrics</Text>
              </TouchableOpacity>
            )}

            {/* Weergave van de songteksten als deze zijn ingeschakeld */}
            {showLyrics && songDetails.lyrics && (
              <View style={styles.lyricsContainer}>
                <Text style={[styles.lyrics, styles.centeredText]}>
                  {songDetails.lyrics.replace(/<\/?[^>]+(>|$)/g, "")}
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

// Stijlen voor de component
const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    height: 250,
    width: 400,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  contentContainer: {
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 34,
    color: 'black',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 24,
  },
  lyrics: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 24,
  },
  lyricsContainer: {
    backgroundColor: '#51b60b59',
    padding: 10,
    borderRadius: 8,
    marginBottom: 24,
  },
  centeredText: {
    textAlign: 'center',
  },
  showLyricsButton: {
    fontSize: 15,
    color: '#51b60b85',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 24,
    textDecorationLine: 'underline',
  },
  hideLyricsButton: {
    fontSize: 15,
    color: '#51b60b85',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 24,
    textDecorationLine: 'underline',
  },
  video: {
    width: 300,
    height: 200,
    marginBottom: 16,
  },
  details: {
    fontSize: 20,
    color: '#2E7D32',
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 12,
  },
});

// Exporteer de component
export default NewsSong;
