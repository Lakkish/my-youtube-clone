import styled from "styled-components";

// Base styles for theme and transitions
const themeColors = {
  light: {
    background: "#ebebeb",
    text: "#000000",
    secondaryText: "#00306e",
    border: "#bfbfbf",
    buttonActive: "#2563eb",
    buttonInactive: "#64748b",
  },
  dark: {
    background: "#0f0f0f",
    text: "#ffffff",
    secondaryText: "#f9f9f9",
    border: "#bfbfbf",
    buttonActive: "#2563eb",
    buttonInactive: "#64748b",
  },
};

// Utility for theme-based color
const getThemeColor = (prop, key) => (props) => {
  const theme = props.theme === true ? "light" : "dark";
  return themeColors[theme][key];
};

// Main container
export const VideoItemContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: background-color 0.3s ease-in;
  background-color: ${getThemeColor("theme", "background")};
`;

// Content wrapper
export const VideoItemContent = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

// Video details container
export const VideoItemDetails = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  overflow-y: auto;
  padding: 14px;
  background-color: transparent;

  @media (min-width: 768px) {
    width: 80%;
  }
  @media (min-width: 1200px) {
    padding: 20px;
  }
`;

// Video player wrapper
export const VideoPlayer = styled.div`
  width: 100%;
  max-width: 1024px;
  aspect-ratio: 16 / 9;
  margin-bottom: 14px;
  position: relative;
`;

// Video data container
export const VideoDataContainer = styled.div`
  width: 100%;
  max-width: 1024px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

// Video details (title, stats, etc.)
export const VideoDetails = styled.div`
  width: 100%;
  margin-bottom: 18px;
  border-bottom: 2px solid ${getThemeColor("theme", "border")};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const VideoTitle = styled.p`
  margin: 0 0 5px 0;
  font-family: "Roboto";
  font-size: 18px;
  font-weight: 400;
  line-height: 1.2;
  color: ${getThemeColor("theme", "text")};

  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

export const VideoStatsAndViewCountContainer = styled.div`
  width: 100%;
  padding: 0 0 5px 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const ViewCountAndPublishedDateContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const ViewCount = styled.p`
  font-family: "Roboto";
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
  color: ${getThemeColor("theme", "secondaryText")};
`;

export const Dot = styled.span`
  height: 30px;
  margin: 0 4px 0 6px;
  padding-top: 12px;
  font-family: "Roboto";
  font-size: 24px;
  font-weight: 400;
  line-height: 0.4;
  color: ${getThemeColor("theme", "secondaryText")};
`;

// Channel and description
export const ChannelAndDescriptionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const ChannelAndDescription = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const ChannelAndDescriptionContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
`;

export const ChannelThumbnail = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 25px;
  margin-right: 16px;

  @media (min-width: 768px) {
    height: 45px;
    width: 45px;
  }
`;

export const ChannelName = styled.p`
  margin: 2px 0;
  font-family: "Roboto";
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  color: ${getThemeColor("theme", "text")};
`;

export const SubscribersCount = styled.p`
  margin-top: 4px;
  font-family: "Roboto";
  font-size: 13px;
  font-weight: 400;
  line-height: 1;
  color: ${getThemeColor("theme", "secondaryText")};
`;

export const ChannelDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

// Description (desktop only)
export const Description = styled.p`
  font-family: "Roboto";
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
  color: ${getThemeColor("theme", "text")};

  @media (max-width: 767px) {
    display: none;
  }
`;

// Description (mobile only)
export const MobileDescription = styled.p`
  font-family: "Roboto";
  font-size: 14px;
  font-weight: 400;
  line-height: 1.3;
  color: ${getThemeColor("theme", "text")};

  @media (min-width: 768px) {
    display: none;
  }
`;

// Stats and buttons
export const ViewStatsContainer = styled.ul`
  padding-left: 0;
  margin: 2px 0;
  display: flex;
  align-items: center;
`;

export const StatsListItem = styled.li`
  list-style-type: none;
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

export const StatButton = styled.button`
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  margin-right: 0;
  padding-right: 2px;
`;

export const StatType = styled.button`
  border: none;
  padding-bottom: 5px;
  cursor: pointer;
  background-color: transparent;
  font-family: "Roboto";
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
`;

const getButtonColor = (active, theme) => {
  return active ? "#2563eb" : "#64748b";
};

export const LikeButton = styled(StatButton)`
  color: ${(props) => getButtonColor(props.$reaction, props.theme)};
`;

export const LikeText = styled(StatType)`
  color: ${(props) => getButtonColor(props.$reaction, props.theme)};
`;

export const DislikeButton = styled(StatButton)`
  color: ${(props) => getButtonColor(props.$reaction, props.theme)};
`;

export const DislikeText = styled(StatType)`
  color: ${(props) => getButtonColor(props.$reaction, props.theme)};
`;

export const SaveButton = styled(StatButton)`
  color: ${(props) => getButtonColor(props.$saved, props.theme)};
`;

export const SaveText = styled(StatType)`
  color: ${(props) => getButtonColor(props.$saved, props.theme)};
`;
