import { Link, useLocation } from "react-router-dom";
import { AiFillHome, AiTwotoneFire } from "react-icons/ai";
import { GiGamepad } from "react-icons/gi";
import { MdPlaylistAdd } from "react-icons/md";
import { NavigationMenu, MenuTab, TabName } from "./styledComponents";
import { useContext } from "react";
import NxtWatchContext from "../../context/NxtWatchContext";
import "../Header/index.css";
import "./index.css";

const NavigationTabs = () => {
  const { isLightTheme } = useContext(NxtWatchContext);
  const location = useLocation();

  const onTabSelection = () => {
    document.body.classList.remove("over-flow");
  };

  const isActivePath = (path) => location.pathname === path;

  const navMenuTabsContent = [
    {
      id: "menu-tab-1",
      path: "/",
      route: "Home",
      icon: (
        <AiFillHome
          className="menu-tab-icon"
          color={isActivePath("/") ? "#de1414" : "#737070"}
        />
      ),
    },
    {
      id: "menu-tab-2",
      path: "/trending",
      route: "Trending",
      icon: (
        <AiTwotoneFire
          className="menu-tab-icon"
          color={isActivePath("/trending") ? "#de1414" : "#737070"}
        />
      ),
    },
    {
      id: "menu-tab-3",
      path: "/gaming",
      route: "Gaming",
      icon: (
        <GiGamepad
          className="menu-tab-icon"
          color={isActivePath("/gaming") ? "#de1414" : "#737070"}
        />
      ),
    },
    {
      id: "menu-tab-4",
      path: "/saved-videos",
      route: "Saved Videos",
      icon: (
        <MdPlaylistAdd
          className="menu-tab-icon"
          color={isActivePath("/saved-videos") ? "#de1414" : "#737070"}
        />
      ),
    },
  ];

  return (
    <NavigationMenu>
      {navMenuTabsContent.map((menuObject) => (
        <MenuTab
          key={menuObject.id}
          isActive={isActivePath(menuObject.path)}
          theme={isLightTheme}
          onClick={onTabSelection}
        >
          <Link to={menuObject.path} className="menu-link-item">
            {menuObject.icon}
            <TabName
              isActive={isActivePath(menuObject.path)}
              theme={isLightTheme}
            >
              {menuObject.route}
            </TabName>
          </Link>
        </MenuTab>
      ))}
    </NavigationMenu>
  );
};

export default NavigationTabs;
