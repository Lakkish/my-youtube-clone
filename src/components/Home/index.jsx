import { useEffect, useState, useContext, useCallback, useRef } from "react";
import Cookies from "js-cookie";
import { MdClose } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";
import axios from "axios";

import Header from "../Header";
import HomeVideoItemCard from "../HomeVideoItemCard";
import DesktopNavigationTabs from "../NavigationMenuContainer";
import LoaderView from "../Loader";
import FailureView from "../FailureView";
import NxtWatchContext from "../../context/NxtWatchContext";

import {
  HomePageContainer,
  HomePageContent,
  HomeVideosContent,
  BuyPremiumCard,
  BrandLogoContainer,
  BrandImage,
  BuyPremiumDescription,
  GetItNowBtn,
  CloseBtn,
  SearchBarContainer,
  SearchInput,
  SearchIconButton,
  VideosContainer,
  VideosList,
  NoVideosViewContainer,
  NoVideosHeading,
  NoVideosImg,
  NoVideosSuggestion,
} from "./styledComponents";

const apiFetchStatus = {
  initial: "INITIAL",
  fetching: "FETCHING",
  success: "SUCCESS",
  failure: "FAILURE",
};

const useDebounce = (callback, delay) => {
  const timer = useRef(null);
  return useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(callback, delay);
  }, [callback, delay]);
};

const Home = () => {
  const { showAdBanner, removeBanner, isLightTheme } =
    useContext(NxtWatchContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [videosList, setVideosList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiFetchStatus.initial);
  const abortController = useRef(null);

  const fetchVideos = async () => {
    setApiStatus(apiFetchStatus.fetching);

    const jwtToken = Cookies.get("jwt_token");
    const url = `https://apis.ccbp.in/videos/all?search=${searchQuery}`;
    abortController.current = new AbortController();

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${jwtToken}` },
        signal: abortController.current.signal,
      });
      const formattedVideos = response.data.videos.map((each) => ({
        channel: each.channel,
        id: each.id,
        title: each.title,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        viewsCount: each.view_count,
      }));
      setVideosList(formattedVideos);
      setApiStatus(apiFetchStatus.success);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Request cancelled:", err.message);
        return;
      }
      setApiStatus(apiFetchStatus.failure);
    }
  };

  useEffect(() => {
    fetchVideos();
    return () => {
      if (abortController.current) abortController.current.abort();
    };
  }, []);

  const debouncedSearch = useDebounce(fetchVideos, 500);

  const onSearchChange = (e) => {
    setSearchQuery(e.target.value);
    debouncedSearch();
  };

  const renderBuyPremiumCard = () => (
    <BuyPremiumCard data-testid="banner">
      <BrandLogoContainer>
        <BrandImage
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
        />
        <CloseBtn data-testid="close" onClick={removeBanner}>
          <MdClose />
        </CloseBtn>
      </BrandLogoContainer>
      <BuyPremiumDescription theme={isLightTheme}>
        Buy Nxt Watch Premium prepaid plans with UPI
      </BuyPremiumDescription>
      <GetItNowBtn>GET IT NOW</GetItNowBtn>
    </BuyPremiumCard>
  );

  const renderSearchBar = () => (
    <SearchBarContainer theme={isLightTheme}>
      <SearchInput
        type="search"
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search"
        theme={isLightTheme}
      />
      <SearchIconButton
        onClick={fetchVideos}
        data-testid="searchButton"
        theme={isLightTheme}
      >
        <BiSearchAlt2
          className={
            isLightTheme ? "search-icon" : "search-icon dark-search-icon"
          }
        />
      </SearchIconButton>
    </SearchBarContainer>
  );

  const renderNoVideosView = () => (
    <NoVideosViewContainer>
      <NoVideosImg
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
      />
      <NoVideosHeading theme={isLightTheme}>
        No Search results found
      </NoVideosHeading>
      <NoVideosSuggestion theme={isLightTheme}>
        Try different key words or remove search filter
      </NoVideosSuggestion>
    </NoVideosViewContainer>
  );

  const renderVideos = () => (
    <VideosList>
      {videosList.map((video) => (
        <HomeVideoItemCard key={video.id} videoDetails={video} />
      ))}
    </VideosList>
  );

  const renderVideosView = () => {
    switch (apiStatus) {
      case apiFetchStatus.fetching:
        return <LoaderView />;
      case apiFetchStatus.failure:
        return <FailureView reload={fetchVideos} />;
      case apiFetchStatus.success:
        return videosList.length > 0 ? renderVideos() : renderNoVideosView();
      default:
        return null;
    }
  };

  return (
    <HomePageContainer theme={isLightTheme} data-testid="home">
      <Header />
      <HomePageContent>
        <DesktopNavigationTabs />
        <HomeVideosContent>
          {showAdBanner && renderBuyPremiumCard()}
          <VideosContainer theme={isLightTheme}>
            {renderSearchBar()}
            {renderVideosView()}
          </VideosContainer>
        </HomeVideosContent>
      </HomePageContent>
    </HomePageContainer>
  );
};

export default Home;
