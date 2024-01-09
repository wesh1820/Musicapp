import React, { createContext, useContext, useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

const LikedSongsContext = createContext();

export const LikedSongsProvider = ({ children }) => {
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    console.log('LikedSongs updated:', likedSongs);
  }, [likedSongs]);

  return (
    <View>
      
      <FlatList
        data={likedSongs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text key={item.id}>{item.title}</Text>}
      />
      <LikedSongsContext.Provider value={{ likedSongs, setLikedSongs }}>
        {children}
      </LikedSongsContext.Provider>
    </View>
  );
  
};

export const useLikedSongs = () => {
  const context = useContext(LikedSongsContext);
  if (!context) {
    throw new Error('useLikedSongs must be used within a LikedSongsProvider');
  }
  return context;
};
