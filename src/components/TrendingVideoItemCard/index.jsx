import { useContext } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { NxtWatchContext } from "../../context/NxtWatchContext";
import {
  VideoItemCard,
  ThumbnailImage,
  VideoDetailsContainer,
  ChannelProfileImage,
  VideoContent,
  VideoTitle,
  VideoStatsContainer,
  ChannelName,
  DotSpan,
  DotSpan2,
  ViewsCountListItem,
  VideoStatsList,
} from "./styledComponents";
import "./index.css";

const TrendingVideoItemCard = ({ videoDetails }) => {
  const { isLightTheme } = useContext(NxtWatchContext);

  const { id, title, viewCount, publishedAt, channel, thumbnailUrl } =
    videoDetails;

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
            src={channel.profile_image_url}
            alt="channel profile"
          />
          <VideoContent>
            <VideoTitle theme={isLightTheme}>{title}</VideoTitle>
            <VideoStatsContainer>
              <ChannelName theme={isLightTheme}>{channel.name}</ChannelName>
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

export default TrendingVideoItemCard;
// This component renders a card for each trending video item, displaying the thumbnail, title, channel name, view count, and published date.
// It uses the `Link` component from `react-router-dom` to navigate to the video
