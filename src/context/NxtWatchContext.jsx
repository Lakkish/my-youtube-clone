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
    (video) => savedVideosList.some((v) => v.id === video.id),
    [savedVideosList]
  );

  const isVideoLiked = useCallback(
    (video) => likedVideosList.some((v) => v.id === video.id),
    [likedVideosList]
  );

  const isVideoDisliked = useCallback(
    (video) => dislikedVideosList.some((v) => v.id === video.id),
    [dislikedVideosList]
  );

  const addVideoReaction = useCallback((video, reactionType) => {
    const videoId = video.id;

    if (reactionType === "LIKE") {
      setLikedVideosList((prev) =>
        prev.some((v) => v.id === videoId)
          ? prev.filter((v) => v.id !== videoId)
          : [...prev, video]
      );
      setDislikedVideosList((prev) => prev.filter((v) => v.id !== videoId));
    } else if (reactionType === "DISLIKE") {
      setDislikedVideosList((prev) =>
        prev.some((v) => v.id === videoId)
          ? prev.filter((v) => v.id !== videoId)
          : [...prev, video]
      );
      setLikedVideosList((prev) => prev.filter((v) => v.id !== videoId));
    }
  }, []);

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
