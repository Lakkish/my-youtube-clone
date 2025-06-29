import { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import { GiGamepad } from "react-icons/gi";
import axios from "axios";
import Header from "../Header";
import DesktopNavigationTabs from "../NavigationMenuContainer";
import LoaderView from "../Loader";
import FailureView from "../FailureView";
import GameItemCard from "../GameItemCard";
import { NxtWatchContext } from "../../context/NxtWatchContext";
import {
  GamingPageContainer,
  GamingTabHeader,
  GamingTabIconContainer,
  GamingTitle,
  GamesList,
  GamesPageContent,
  GamesContainer,
} from "./styledComponents";

const apiFetchStatus = {
  initial: "INITIAL",
  fetching: "FETCHING",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Gaming = () => {
  const { isLightTheme } = useContext(NxtWatchContext);
  const [apiStatus, setApiStatus] = useState(apiFetchStatus.initial);
  const [gamesList, setGamesList] = useState([]);

  const getGamingVideos = async () => {
    setApiStatus(apiFetchStatus.fetching);
    const jwtToken = Cookies.get("jwt_token");
    const url = "https://apis.ccbp.in/videos/gaming";
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const response = await axios.get(url, options);
      const { videos } = response.data;

      const formattedVideosData = videos.map((eachItem) => ({
        id: eachItem.id,
        title: eachItem.title,
        thumbnailUrl: eachItem.thumbnail_url,
        viewCount: eachItem.view_count,
      }));

      setGamesList(formattedVideosData);
      setApiStatus(apiFetchStatus.success);
    } catch (err) {
      setApiStatus(apiFetchStatus.failure);
      console.log(err?.response?.data?.error_msg);
    }
  };

  useEffect(() => {
    getGamingVideos();
  }, []);

  const renderGamingTab = () => (
    <GamingTabHeader theme={isLightTheme}>
      <GamingTabIconContainer theme={isLightTheme}>
        <GiGamepad height="50" width="50" color="red" />
      </GamingTabIconContainer>
      <GamingTitle theme={isLightTheme}>Gaming</GamingTitle>
    </GamingTabHeader>
  );

  const renderGames = () => (
    <GamesList>
      {gamesList.map((eachItem) => (
        <GameItemCard key={eachItem.id} gameDetails={eachItem} />
      ))}
    </GamesList>
  );

  const renderGamesView = () => {
    switch (apiStatus) {
      case apiFetchStatus.failure:
        return <FailureView reload={getGamingVideos} />;
      case apiFetchStatus.fetching:
        return <LoaderView />;
      case apiFetchStatus.success:
        return renderGames();
      default:
        return null;
    }
  };

  const renderGamesContainer = () => (
    <GamesContainer>
      {renderGamingTab()}
      {renderGamesView()}
    </GamesContainer>
  );

  return (
    <GamingPageContainer theme={isLightTheme} data-testid="gaming">
      <Header />
      <GamesPageContent>
        <DesktopNavigationTabs />
        {renderGamesContainer()}
      </GamesPageContent>
    </GamingPageContainer>
  );
};

export default Gaming;
