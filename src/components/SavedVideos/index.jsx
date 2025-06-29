import { useContext } from "react";
import { MdPlaylistAdd } from "react-icons/md";
import Header from "../Header";
import DesktopNavigationTabs from "../NavigationMenuContainer";
import SavedVideoItemCard from "../SavedVideoItemCard";
import { NxtWatchContext } from "../../context/NxtWatchContext";
import {
  SavedVideosPageContainer,
  SavedVideosTabHeader,
  SavedListIconContainer,
  SavedVideosTitle,
  SavedVideosList,
  SavedVideosContainer,
  SavedVideosContent,
  NoSavedVideosViewContainer,
  NoSavedVideosHeading,
  NoSavedVideosImg,
  NoSavedVideosSuggestion,
} from "./styledComponents";

const SavedVideos = () => {
  const { savedVideosList, isLightTheme } = useContext(NxtWatchContext);
  const hasSavedVideos = savedVideosList.length > 0;

  const renderSavedVideosTab = () => (
    <SavedVideosTabHeader theme={isLightTheme}>
      <SavedListIconContainer theme={isLightTheme}>
        <MdPlaylistAdd height={30} width={30} color="red" />
      </SavedListIconContainer>
      <SavedVideosTitle theme={isLightTheme}>Saved Videos</SavedVideosTitle>
    </SavedVideosTabHeader>
  );

  const renderAllSavedVideos = () => (
    <SavedVideosList>
      {savedVideosList.map((eachItem) => (
        <SavedVideoItemCard key={eachItem.id} videoDetails={eachItem} />
      ))}
    </SavedVideosList>
  );

  const renderNoVideosView = () => (
    <NoSavedVideosViewContainer>
      <NoSavedVideosImg
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
      />
      <NoSavedVideosHeading theme={isLightTheme}>
        No saved videos found
      </NoSavedVideosHeading>
      <NoSavedVideosSuggestion theme={isLightTheme}>
        You can save your videos while watching them
      </NoSavedVideosSuggestion>
    </NoSavedVideosViewContainer>
  );

  return (
    <SavedVideosPageContainer theme={isLightTheme} data-testid="savedVideos">
      <Header />
      <SavedVideosContent>
        <DesktopNavigationTabs />
        <SavedVideosContainer theme={isLightTheme}>
          {hasSavedVideos ? (
            <>
              {renderSavedVideosTab()}
              {renderAllSavedVideos()}
            </>
          ) : (
            renderNoVideosView()
          )}
        </SavedVideosContainer>
      </SavedVideosContent>
    </SavedVideosPageContainer>
  );
};

export default SavedVideos;
