import { useContext } from "react";
import NavigationTabs from "../NavigationMenu";
import { NxtWatchContext } from "../../context/NxtWatchContext";
import {
  SocialMediaAndContactUs,
  ContactUs,
  SocialMediaContainer,
  AnchorMediaIcon,
  MediaImage,
  NavigationContainerDescription,
  NavigationMenuContainer,
} from "./styledComponents";

const DesktopNavigationTabs = () => {
  const { isLightTheme } = useContext(NxtWatchContext);

  return (
    <NavigationMenuContainer theme={isLightTheme}>
      <NavigationTabs />
      <SocialMediaAndContactUs>
        <ContactUs theme={isLightTheme}>CONTACT US</ContactUs>
        <SocialMediaContainer>
          <AnchorMediaIcon href="#">
            <MediaImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
              alt="facebook logo"
            />
          </AnchorMediaIcon>
          <AnchorMediaIcon href="#">
            <MediaImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
              alt="twitter logo"
            />
          </AnchorMediaIcon>
          <AnchorMediaIcon href="#">
            <MediaImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
              alt="linked in logo"
            />
          </AnchorMediaIcon>
        </SocialMediaContainer>
        <NavigationContainerDescription theme={isLightTheme}>
          Enjoy! Now to see your channels and recommendations!
        </NavigationContainerDescription>
      </SocialMediaAndContactUs>
    </NavigationMenuContainer>
  );
};

export default DesktopNavigationTabs;
