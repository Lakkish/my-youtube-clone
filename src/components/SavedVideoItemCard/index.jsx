import { useContext } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { NxtWatchContext } from "../../context/NxtWatchContext";
import {
  VideoItemCard,
  ThumbnailImage,
  VideoDetailsContainer,
  VideoTitle,
  VideoStatsContainer,
  ChannelProfileImage,
  VideoContent,
  ChannelName,
  DotSpan,
  DotSpan2,
  ViewsCountListItem,
  VideoStatsList,
} from "./styledComponents";
import "./index.css";

const SavedVideoItemCard = ({ videoDetails }) => {
  const { isLightTheme } = useContext(NxtWatchContext);
  const { id, title, viewCount, publishedAt, formattedChannel, thumbnailUrl } =
    videoDetails;

  const formattedChannelData = {
    channelName: formattedChannel.name,
    channelProfileImage: formattedChannel.profileImageUrl,
  };

  const formattedPublishedAt = formatDistanceToNow(new Date(publishedAt));

  return (
    <Link to={`/videos/${id}`} className="link-item">
      <VideoItemCard>
        <ThumbnailImage
          src={thumbnailUrl}
          alt="video thumbnail"
          loading="lazy"
        />
        <VideoDetailsContainer>
          <ChannelProfileImage
            src={formattedChannelData.channelProfileImage}
            alt="channel profile"
          />
          <VideoContent>
            <VideoTitle theme={isLightTheme}>{title}</VideoTitle>
            <VideoStatsContainer>
              <ChannelName theme={isLightTheme}>
                {formattedChannelData.channelName}
              </ChannelName>
              <VideoStatsList>
                <DotSpan2 theme={isLightTheme}>.</DotSpan2>
                <ViewsCountListItem theme={isLightTheme}>
                  {viewCount}
                </ViewsCountListItem>
                <DotSpan theme={isLightTheme}>.</DotSpan>
                <ViewsCountListItem theme={isLightTheme}>
                  {formattedPublishedAt}
                </ViewsCountListItem>
              </VideoStatsList>
            </VideoStatsContainer>
          </VideoContent>
        </VideoDetailsContainer>
      </VideoItemCard>
    </Link>
  );
};

export default SavedVideoItemCard;
// This component renders a card for each saved video item, displaying the thumbnail, title, channel name, view count, and published date.
