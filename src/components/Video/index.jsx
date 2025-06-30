import { useEffect, useState, useContext, useCallback } from "react";
import ReactPlayer from "react-player";
import { formatDistanceToNow } from "date-fns";
import { BiLike, BiDislike } from "react-icons/bi";
import { MdPlaylistAdd } from "react-icons/md";
import Cookies from "js-cookie";
import axios from "axios";
import { useParams } from "react-router-dom";
import { NxtWatchContext } from "../../context/NxtWatchContext";
import Header from "../Header";
import LoaderView from "../Loader";
import FailureView from "../FailureView";
import DesktopNavigationTabs from "../NavigationMenuContainer";
import {
  VideoItemContainer,
  VideoItemContent,
  VideoItemDetails,
  VideoDataContainer,
  VideoPlayer,
  VideoDetails,
  VideoTitle,
  VideoStatsAndViewCountContainer,
  ViewCountAndPublishedDateContainer,
  ViewCount,
  Dot,
  ChannelAndDescriptionContainer,
  ChannelAndDescription,
  ChannelAndDescriptionContent,
  ChannelThumbnail,
  ChannelName,
  SubscribersCount,
  ChannelDetails,
  MobileDescription,
  Description,
  ViewStatsContainer,
  StatsListItem,
  LikeButton,
  LikeText,
  DislikeButton,
  DislikeText,
  SaveButton,
  SaveText,
} from "./styledComponents";

import "./index.css";

const apiFetchStatus = {
  initial: "INITIAL",
  fetching: "FETCHING",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Video = () => {
  const { id } = useParams();
  const {
    isLightTheme,
    toggleSaveVideo,
    isVideoSaved,
    isVideoLiked,
    isVideoDisliked,
    addVideoReaction,
  } = useContext(NxtWatchContext);

  const [apiStatus, setApiStatus] = useState(apiFetchStatus.initial);
  const [videoItemData, setVideoItemData] = useState({});

  const getFormattedVideoDetails = (data) => ({
    id: data.id,
    title: data.title,
    publishedAt: data.published_at,
    thumbnailUrl: data.thumbnail_url,
    viewCount: data.view_count,
    description: data.description,
    videoUrl: data.video_url,
  });

  const getVideoItemDetails = useCallback(async () => {
    setApiStatus(apiFetchStatus.fetching);
    const jwtToken = Cookies.get("jwt_token");
    const url = `https://apis.ccbp.in/videos/${id}`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const response = await axios.get(url, options);
      const { video_details: videoDetails } = response.data;
      const { channel } = videoDetails;

      const formattedChannel = {
        name: channel.name,
        profileImageUrl: channel.profile_image_url,
        subscriberCount: channel.subscriber_count,
      };
      const formattedVideoDetails = getFormattedVideoDetails(videoDetails);
      setVideoItemData({ formattedChannel, ...formattedVideoDetails });
      setApiStatus(apiFetchStatus.success);
    } catch (err) {
      console.log(err?.response?.data?.error_msg);
      setApiStatus(apiFetchStatus.failure);
    }
  }, [id]);

  useEffect(() => {
    getVideoItemDetails();
  }, [getVideoItemDetails]);

  const renderVideoStats = () => {
    const isSaved = isVideoSaved(videoItemData);
    const isLiked = isVideoLiked(videoItemData);
    const isDisliked = isVideoDisliked(videoItemData);

    return (
      <ViewStatsContainer>
        <StatsListItem onClick={() => addVideoReaction(videoItemData, "LIKE")}>
          <LikeButton $reaction={isLiked}>
            <BiLike />
          </LikeButton>
          <LikeText $reaction={isLiked}>Like</LikeText>
        </StatsListItem>
        <StatsListItem
          onClick={() => addVideoReaction(videoItemData, "DISLIKE")}
        >
          <DislikeButton $reaction={isDisliked}>
            <BiDislike />
          </DislikeButton>
          <DislikeText $reaction={isDisliked}>Dislike</DislikeText>
        </StatsListItem>
        <StatsListItem onClick={() => toggleSaveVideo(videoItemData)}>
          <SaveButton $saved={isSaved}>
            <MdPlaylistAdd />
          </SaveButton>
          <SaveText $saved={isSaved}>{isSaved ? "Saved" : "Save"}</SaveText>
        </StatsListItem>
      </ViewStatsContainer>
    );
  };

  const renderVideoDetails = () => {
    const { title, viewCount, publishedAt } = videoItemData;
    return (
      <VideoDetails>
        <VideoTitle theme={isLightTheme}>{title}</VideoTitle>
        <VideoStatsAndViewCountContainer>
          <ViewCountAndPublishedDateContainer>
            <ViewCount theme={isLightTheme}>{viewCount}</ViewCount>
            <Dot theme={isLightTheme}>.</Dot>
            <ViewCount theme={isLightTheme}>
              {formatDistanceToNow(new Date(publishedAt))}
            </ViewCount>
          </ViewCountAndPublishedDateContainer>
          {renderVideoStats()}
        </VideoStatsAndViewCountContainer>
      </VideoDetails>
    );
  };

  const renderChannelAndDescription = () => {
    const { formattedChannel, description } = videoItemData;
    const { name, profileImageUrl, subscriberCount } = formattedChannel;
    return (
      <ChannelAndDescriptionContainer>
        <ChannelAndDescription>
          <ChannelThumbnail src={profileImageUrl} alt="channel logo" />
          <ChannelAndDescriptionContent>
            <ChannelDetails>
              <ChannelName theme={isLightTheme}>{name}</ChannelName>
              <SubscribersCount theme={isLightTheme}>
                {subscriberCount} Subscribers
              </SubscribersCount>
            </ChannelDetails>
            <Description theme={isLightTheme}>{description}</Description>
          </ChannelAndDescriptionContent>
        </ChannelAndDescription>
        <MobileDescription theme={isLightTheme}>
          {description}
        </MobileDescription>
      </ChannelAndDescriptionContainer>
    );
  };
  const renderVideoContent = () => {
    const { videoUrl } = videoItemData;
    console.log("videoUrl:", videoUrl);

    return (
      <VideoItemDetails>
        <VideoPlayer>
          <ReactPlayer url={videoUrl} controls width="100%" height="100%" />
        </VideoPlayer>
        <VideoDataContainer>
          {renderVideoDetails()}
          {renderChannelAndDescription()}
        </VideoDataContainer>
      </VideoItemDetails>
    );
  };

  const renderContent = () => {
    switch (apiStatus) {
      case apiFetchStatus.failure:
        return <FailureView reload={getVideoItemDetails} />;
      case apiFetchStatus.fetching:
        return <LoaderView />;
      case apiFetchStatus.success:
        return renderVideoContent();
      default:
        return null;
    }
  };

  return (
    <VideoItemContainer theme={isLightTheme} data-testid="videoItemDetails">
      <Header />
      <VideoItemContent>
        <DesktopNavigationTabs />
        {renderContent()}
      </VideoItemContent>
    </VideoItemContainer>
  );
};

export default Video;
