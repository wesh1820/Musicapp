import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';

import Article from '../components/SongDetails';

const ArticleScreen = ({ route, navigation }) => {
  const { id } = route.params;

  return (
    <View style={styles.screen}>
      <Article articleId={id} />
      <Button
        title="back to news"
        onPress={() => navigation.navigate('Songs')}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#fbfafa",
  },
  title: {
    fontSize: 24,
    color: "green",
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 16,
    textAlign: "center",
  },
});
export default ArticleScreen;