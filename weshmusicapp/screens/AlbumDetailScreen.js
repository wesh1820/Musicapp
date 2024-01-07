import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';

import Album from '../components/AlbumDetails';

const AlbumScreen = ({ route, navigation }) => {
  const { id } = route.params;

  return (
    <View style={styles.screen}>
      <Album articleId={id} />
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#F8F6F6",
  }
});
export default AlbumScreen;