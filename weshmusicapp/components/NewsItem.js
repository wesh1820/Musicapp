// YourParentComponent.js
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import SongItem from './SongItem';

const YourParentComponent = () => {
  const [likedSongs, setLikedSongs] = useState([]);

  const handleLikeButtonPress = (songId, isLiked) => {
    // Do something with the liked state or liked song ID as needed
    console.log(`Song ${songId} is ${isLiked ? 'liked' : 'unliked'}`);
    if (isLiked) {
      setLikedSongs((prevLikedSongs) => [...prevLikedSongs, songId]);
    } else {
      setLikedSongs((prevLikedSongs) => prevLikedSongs.filter((id) => id !== songId));
    }
  };

  // Simulating data fetching from API
  const fetchDataFromAPI = async () => {
    try {
      const response = await fetch('http://site.ddev.site/api/song/');
      const data = await response.json();
      // Update data state with the fetched data
      // Assume the API returns an array of song objects with properties like id, title, bannerImage, duration, etc.
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  // Fetch data from API on component mount
  React.useEffect(() => {
    fetchDataFromAPI();
  }, []); // Empty dependency array means it runs once on mount

  return (
    <FlatList
      data={data} // Replace with your actual data from API
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <SongItem
          {...item}
          onLikeButtonPress={handleLikeButtonPress}
          isLiked={likedSongs.includes(item.id)}
        />
      )}
    />
  );
};

export default YourParentComponent;
