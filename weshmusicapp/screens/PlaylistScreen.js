import React, { useState, useEffect } from 'react';
import { View, FlatList, Button } from 'react-native';
import SongItem from '../components/SongItem';

const PlaylistScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch your data from the API
    // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
    fetch('http://site.ddev.site/api/artist/')
      .then((response) => response.json())
      .then((apiData) => {
        // Initialize liked status based on the current playlist state
        const updatedData = apiData.map((item) => ({
          ...item,
          isLiked: playlist.includes(item.id),
        }));

        setData(updatedData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [playlist]);

  const [playlist, setPlaylist] = useState([]);

  const handleLikeButtonPress = (songId, isLiked) => {
    setPlaylist((prevPlaylist) => {
      const updatedPlaylist = isLiked
        ? [...prevPlaylist, songId] // Add the song to the playlist
        : prevPlaylist.filter((id) => id !== songId); // Remove the song from the playlist

      return updatedPlaylist;
    });
  };

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SongItem {...item} onLikeButtonPress={handleLikeButtonPress} />
        )}
      />

      <Button
        title="Show Playlist"
        onPress={() => {
          // Navigate to the screen that displays the liked playlist
          // Pass the filteredData to the next screen
          // Example: navigation.navigate('PlaylistScreen', { playlist: filteredData });
        }}
      />
    </View>
  );
};

export default PlaylistScreen;
