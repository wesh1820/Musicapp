import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';

import AlbumDetails from '../components/AlbumDetails';  // Gebruik de juiste componentnaam

const AlbumDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;

  return (
    <View style={styles.screen}>
      {/* Render de AlbumDetails-component en geef het artikel-ID door als eigenschap */}
      <AlbumDetails articleId={id} />
    </View>
  );
}

// Stijlen voor de component
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#F8F6F6",
  },
});

// Exporteer de component
export default AlbumDetailScreen;
