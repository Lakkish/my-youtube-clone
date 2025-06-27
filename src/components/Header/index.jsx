import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import Popup from "reactjs-popup";
import { BsMoon } from "react-icons/bs";
import { BiSun } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import NavigationTabs from "../NavigationMenu";
import NxtWatchContext from "../../context/NxtWatchContext";
import {
  NavBar,
  NavContent,
  NavBrandLogo,
  MobileNavItemsContainer,
  MobileNavItem,
  MobileNavItemBtn,
  NavItemsContainer,
  NavIconBtn,
  ProfileImage,
  LogoutBtn,
  MobileLogoutContainer,
  MobileNavigationMenu,
  NavigationMenuContainer,
  MenuCloseIconBtn,
  LogoutPageCard,
  LogoutPageQuestion,
  PageCancelBtn,
  PageLogoutBtn,
  ButtonsContainer,
} from "./styledComponents";
import "./index.css";

const Header = () => {
  const navigate = useNavigate();
  const { isLightTheme, changeTheme } = useContext(NxtWatchContext);

  const onThemeChange = () => changeTheme();

  const logout = () => {
    Cookies.remove("jwt_token");
    navigate("/login", { replace: true });
    document.body.classList.remove("over-flow");
  };

  const logoutPopupStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const toggleMobileMenu = () => {
    document
      .getElementById("mobileNavigationMenu")
      ?.classList.toggle("translate-menu");
    document
      .getElementById("menuCloseIcon")
      ?.classList.toggle("rotate-close-icon");
    document.body.classList.toggle("over-flow");
  };

  const toggleLogoutCard = () => {
    document
      .getElementById("mobileLogoutWrapper")
      ?.classList.toggle("toggle-mobile-logout");
    document.body.classList.toggle("over-flow");
  };

  const renderLogoutCard = (close) => (
    <LogoutPageCard theme={isLightTheme}>
      <LogoutPageQuestion theme={isLightTheme}>
        Are you sure, you want to logout
      </LogoutPageQuestion>
      <ButtonsContainer>
        <PageCancelBtn type="button" onClick={close}>
          Cancel
        </PageCancelBtn>
        <PageLogoutBtn onClick={logout}>Confirm</PageLogoutBtn>
      </ButtonsContainer>
    </LogoutPageCard>
  );

  const renderLogoutPopup = (triggerBtn) => (
    <Popup trigger={triggerBtn} overlayStyle={logoutPopupStyle} modal>
      {(close) => renderLogoutCard(close)}
    </Popup>
  );

  return (
    <NavBar theme={isLightTheme}>
      <NavContent>
        <Link to="/">
          <NavBrandLogo
            src={
              isLightTheme
                ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                : "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
            }
            alt="website logo"
          />
        </Link>

        <MobileNavItemsContainer theme={isLightTheme}>
          <MobileNavItem>
            <MobileNavItemBtn onClick={onThemeChange} data-testid="theme">
              {isLightTheme ? (
                <BsMoon className="nav-item-icon" />
              ) : (
                <BiSun className="dark-theme nav-item-icon" />
              )}
            </MobileNavItemBtn>
          </MobileNavItem>

          <MobileNavItem>
            <MobileNavItemBtn onClick={toggleMobileMenu} type="button">
              <GiHamburgerMenu
                className={
                  isLightTheme ? "nav-item-icon" : "dark-theme nav-item-icon"
                }
              />
            </MobileNavItemBtn>
          </MobileNavItem>

          <MobileNavItem>
            <MobileNavigationMenu
              id="mobileNavigationMenu"
              theme={isLightTheme}
            >
              <MenuCloseIconBtn
                id="menuCloseIcon"
                type="button"
                onClick={toggleMobileMenu}
                theme={isLightTheme}
              >
                <MdClose className="nav-item-icon" />
              </MenuCloseIconBtn>
              <NavigationMenuContainer>
                <NavigationTabs />
              </NavigationMenuContainer>
            </MobileNavigationMenu>
          </MobileNavItem>

          <MobileNavItem>
            <MobileNavItemBtn onClick={toggleLogoutCard}>
              <FiLogOut
                className={
                  isLightTheme ? "nav-item-icon" : "dark-theme nav-item-icon"
                }
              />
            </MobileNavItemBtn>
          </MobileNavItem>

          <MobileNavItem>
            <MobileLogoutContainer
              id="mobileLogoutWrapper"
              theme={isLightTheme}
            >
              {renderLogoutCard(toggleLogoutCard)}
            </MobileLogoutContainer>
          </MobileNavItem>
        </MobileNavItemsContainer>

        <NavItemsContainer theme={isLightTheme}>
          <NavIconBtn onClick={onThemeChange} data-testid="theme">
            {isLightTheme ? (
              <BsMoon className="md-nav-item-icon" />
            ) : (
              <BiSun className="dark-theme md-nav-item-icon" />
            )}
          </NavIconBtn>

          <NavIconBtn>
            <ProfileImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
            />
          </NavIconBtn>

          {renderLogoutPopup(
            <LogoutBtn theme={isLightTheme}>Logout</LogoutBtn>
          )}
        </NavItemsContainer>
      </NavContent>
    </NavBar>
  );
};

export default Header;
