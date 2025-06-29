import { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import { AiTwotoneFire } from "react-icons/ai";
import axios from "axios";
import Header from "../Header";
import DesktopNavigationTabs from "../NavigationMenuContainer";
import LoaderView from "../Loader";
import FailureView from "../FailureView";
import TrendingVideoItemCard from "../TrendingVideoItemCard";
import { NxtWatchContext } from "../../context/NxtWatchContext";

import {
  TrendingPageContainer,
  TrendingTabHeader,
  TrendingTabIconContainer,
  TrendingTitle,
  TrendingVideosList,
  TrendingVideosContainer,
  TrendingVideosContent,
} from "./styledComponents";

const apiFetchStatus = {
  initial: "INITIAL",
  fetching: "FETCHING",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Trending = () => {
  const { isLightTheme } = useContext(NxtWatchContext);
  const [apiStatus, setApiStatus] = useState(apiFetchStatus.initial);
  const [videosList, setVideosList] = useState([]);

  const getTrendingVideos = async () => {
    setApiStatus(apiFetchStatus.fetching);
    const jwtToken = Cookies.get("jwt_token");
    const url = "https://apis.ccbp.in/videos/trending";
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const response = await axios.get(url, options);
      const { videos } = response.data;

      const formattedVideosData = videos.map((eachItem) => ({
        channel: eachItem.channel,
        id: eachItem.id,
        title: eachItem.title,
        publishedAt: eachItem.published_at,
        thumbnailUrl: eachItem.thumbnail_url,
        viewCount: eachItem.view_count,
      }));

      setVideosList(formattedVideosData);
      setApiStatus(apiFetchStatus.success);
    } catch (err) {
      setApiStatus(apiFetchStatus.failure);
      console.log(err?.response?.data?.error_msg);
    }
  };

  useEffect(() => {
    getTrendingVideos();
  }, []);

  const renderTrendingTab = () => (
    <TrendingTabHeader theme={isLightTheme}>
      <TrendingTabIconContainer theme={isLightTheme}>
        <AiTwotoneFire height={40} width={40} color="red" />
      </TrendingTabIconContainer>
      <TrendingTitle theme={isLightTheme}>Trending</TrendingTitle>
    </TrendingTabHeader>
  );

  const renderTrendingVideos = () => (
    <TrendingVideosList>
      {videosList.map((eachItem) => (
        <TrendingVideoItemCard key={eachItem.id} videoDetails={eachItem} />
      ))}
    </TrendingVideosList>
  );

  const renderTrendingVideosView = () => {
    switch (apiStatus) {
      case apiFetchStatus.failure:
        return <FailureView reload={getTrendingVideos} />;
      case apiFetchStatus.fetching:
        return <LoaderView />;
      case apiFetchStatus.success:
        return renderTrendingVideos();
      default:
        return null;
    }
  };

  const renderTrendingVideosContainer = () => (
    <TrendingVideosContainer>
      {renderTrendingTab()}
      {renderTrendingVideosView()}
    </TrendingVideosContainer>
  );

  return (
    <TrendingPageContainer theme={isLightTheme} data-testid="trending">
      <Header />
      <TrendingVideosContent>
        <DesktopNavigationTabs />
        {renderTrendingVideosContainer()}
      </TrendingVideosContent>
    </TrendingPageContainer>
  );
};

export default Trending;
