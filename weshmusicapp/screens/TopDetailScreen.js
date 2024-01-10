import React from 'react';
import { StyleSheet, View } from 'react-native';

import TopD from '../components/TopDetails';

const TopScreen = ({ route, navigation }) => {
  const { id } = route.params;

  return (
    <View style={styles.screen}>
      <TopD articleId={id} />
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
export default TopScreen;