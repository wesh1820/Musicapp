import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

import Article from '../components/ArtistDetails';

const ArtistDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;

  return (
    <View style={styles.screen}>
      <Article articleId={id} />
    </View>
  );
};

ArtistDetailScreen.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <Button
      title="Back"
      onPress={() => navigation.navigate('Artists')}
    />
  ),
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#F8F6F6",
  },
});

export default ArtistDetailScreen;
