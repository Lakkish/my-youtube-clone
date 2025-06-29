import { Link } from "react-router-dom";
import { useContext } from "react";
import { NxtWatchContext } from "../../context/NxtWatchContext";
import {
  GameCard,
  GameThumbnail,
  GameDetailsContainer,
  GameName,
  ViewCount,
} from "./styledComponents";
import "./index.css";

const GameItemCard = ({ gameDetails }) => {
  const { isLightTheme } = useContext(NxtWatchContext);
  const { id, title, viewCount, thumbnailUrl } = gameDetails;

  return (
    <GameCard>
      <Link to={`/videos/${id}`} className="link-item">
        <GameThumbnail
          src={thumbnailUrl}
          alt="video thumbnail"
          loading="lazy"
        />
        <GameDetailsContainer>
          <GameName theme={isLightTheme}>{title}</GameName>
          <ViewCount theme={isLightTheme}>
            {`${viewCount} Watching Worldwide`}
          </ViewCount>
        </GameDetailsContainer>
      </Link>
    </GameCard>
  );
};

export default GameItemCard;
// This component renders a card for each game item, displaying the thumbnail, title, and view count.
