import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';

import Article from '../components/AlbumDetails';

const ArticleScreen = ({ route, navigation }) => {
  const { id } = route.params;

  return (
    <View style={styles.screen}>
      <Article articleId={id} />
      <Button
        title="back to news"
        onPress={() => navigation.navigate('Albums')}
      />
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
export default ArticleScreen;