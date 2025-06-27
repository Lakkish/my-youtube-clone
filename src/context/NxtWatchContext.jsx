import React, { useState, useCallback } from "react";

export const NxtWatchContext = React.createContext({
  isLightTheme: true,
  changeTheme: () => {},
  showAdBanner: true,
  removeBanner: () => {},
  savedVideosList: [],
  isVideoSaved: () => {},
  toggleSaveVideo: () => {},
  likedVideosList: [],
  dislikedVideosList: [],
  isVideoLiked: () => {},
  isVideoDisliked: () => {},
  addVideoReaction: () => {},
});

export const NxtWatchProvider = ({ children }) => {
  const [isLightTheme, setIsLightTheme] = useState(true);
  const [showAdBanner, setShowAdBanner] = useState(true);
  const [savedVideosList, setSavedVideosList] = useState([]);
  const [likedVideosList, setLikedVideosList] = useState([]);
  const [dislikedVideosList, setDislikedVideosList] = useState([]);

  const changeTheme = useCallback(() => setIsLightTheme((prev) => !prev), []);
  const removeBanner = useCallback(() => setShowAdBanner(false), []);

  const toggleSaveVideo = useCallback((video) => {
    setSavedVideosList((prev) =>
      prev.some((v) => v.id === video.id)
        ? prev.filter((v) => v.id !== video.id)
        : [...prev, video]
    );
  }, []);

  const isVideoSaved = useCallback(
    (videoId) => savedVideosList.some((v) => v.id === videoId),
    [savedVideosList]
  );

  const isVideoLiked = useCallback(
    (videoId) => likedVideosList.some((v) => v.id === videoId),
    [likedVideosList]
  );
  const isVideoDisliked = useCallback(
    (videoId) => dislikedVideosList.some((v) => v.id === videoId),
    [dislikedVideosList]
  );

  const addVideoReaction = useCallback(
    (videoId, reactionType, videoDetails) => {
      if (reactionType === "like") {
        setLikedVideosList((prev) =>
          prev.some((v) => v.id === videoId)
            ? prev.filter((v) => v.id !== videoId)
            : [...prev, videoDetails]
        );
        setDislikedVideosList((prev) => prev.filter((v) => v.id !== videoId));
      } else if (reactionType === "dislike") {
        setDislikedVideosList((prev) =>
          prev.some((v) => v.id === videoId)
            ? prev.filter((v) => v.id !== videoId)
            : [...prev, videoDetails]
        );
        setLikedVideosList((prev) => prev.filter((v) => v.id !== videoId));
      }
    },
    []
  );

  const value = {
    isLightTheme,
    changeTheme,
    showAdBanner,
    removeBanner,
    savedVideosList,
    isVideoSaved,
    toggleSaveVideo,
    likedVideosList,
    dislikedVideosList,
    isVideoLiked,
    isVideoDisliked,
    addVideoReaction,
  };

  return (
    <NxtWatchContext.Provider value={value}>
      {children}
    </NxtWatchContext.Provider>
  );
};
