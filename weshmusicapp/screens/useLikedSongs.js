import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context for liked songs
const LikedSongsContext = createContext();

// Provider component to wrap the app with
export const LikedSongsProvider = ({ children }) => {
  const [likedSongs, setLikedSongs] = useState([]);

  const addLikedSong = (song) => {
    setLikedSongs((prevLikedSongs) => [...prevLikedSongs, song]);
  };

  const removeLikedSong = (songId) => {
    setLikedSongs((prevLikedSongs) => prevLikedSongs.filter((song) => song.id !== songId));
  };

  useEffect(() => {
    console.log('LikedSongs updated:', likedSongs);
  }, [likedSongs]);

  return (
    <LikedSongsContext.Provider value={{ likedSongs, addLikedSong, removeLikedSong }}>
      {children}
    </LikedSongsContext.Provider>
  );
};

// Custom hook to use liked songs context
export const useLikedSongs = () => {
  const context = useContext(LikedSongsContext);
  if (!context) {
    throw new Error('useLikedSongs must be used within a LikedSongsProvider');
  }
  return context;
};
