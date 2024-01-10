import React from 'react';
import { StyleSheet, View } from 'react-native';

import SongDetails from '../components/SongDetails';

const SongScreen = ({ route, navigation }) => {
  const { id } = route.params;

  return (
    <View style={styles.screen}>
      {/* SongDetails-component met het meegegeven artikel-ID */}
      <SongDetails articleId={id} />
    </View>
  );
};

// Stijlen
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default SongScreen;
