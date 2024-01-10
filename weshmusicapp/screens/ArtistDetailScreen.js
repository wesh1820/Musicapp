import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

// Importeer de ArtistDetails-component
import ArtistD from '../components/ArtistDetails';

// Functional component voor het weergeven van het detailscherm van een artiest
const ArtistDetailScreen = ({ route, navigation }) => {
  // Haal het 'id'-attribuut uit de navigatieroute
  const { id } = route.params;

  return (
    <View style={styles.screen}>
      {/* Render de ArtistDetails-component en geef het 'articleId' attribuut door */}
      <ArtistD articleId={id} />
    </View>
  );
};

// Aangepaste navigatie-opties voor het scherm
ArtistDetailScreen.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    // Terugknop om naar het 'Artists'-scherm te gaan
    <Button
      title="Back"
      onPress={() => navigation.navigate('Artists')}
    />
  ),
});

// Stijlen voor het scherm
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#F8F6F6", // Aangepaste achtergrondkleur
  },
});

// Exporteer de component
export default ArtistDetailScreen;
