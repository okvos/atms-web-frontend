import { useState } from "react";
import { useStyletron } from "baseui";
import { AppNavBar, NavItem } from "baseui/app-nav-bar";
import { useNavigate } from "react-router-dom";
import { APP_NAME } from "../../config/constants";
import { useAuth } from "../auth/auth";

export function NavBar() {
  const [css] = useStyletron();
  const navigate = useNavigate();

  const { isLoggedIn, account } = useAuth();

  const mainNavItemsDefault = [
    {
      label: "About",
    },
    {
      label: "Community",
    },
  ];

  const [mainItems] = useState<NavItem[]>(mainNavItemsDefault);
  const [userItems] = useState<NavItem[]>([{ label: "Profile"}, { label: "Log Out" }]);

  function selectNavItem(item: NavItem) {
    let route = item.label.toLowerCase();
    switch (route) {
      case "sign in":
        route = "account"; break;
      case "profile":
        route = `profile/${account.username}`; break;
      case "log out":
        window.localStorage.clear();
        document.location.reload();
        return;
    }
    navigate(route);
  }

  type AppNavBarPropsType = {
    title: string;
    mainItems: NavItem[];
    userItems?: NavItem[];
    onMainItemSelect: (item: NavItem) => void;
    onUserItemSelect?: (item: NavItem) => void;
    username?: string;
  };

  let AppNavBarProps: AppNavBarPropsType = {
    title: APP_NAME,
    mainItems: mainItems,
    onMainItemSelect: selectNavItem,
    onUserItemSelect: selectNavItem
  };

  if (isLoggedIn) {
    AppNavBarProps = {
      ...AppNavBarProps,
      username: account.username,
      userItems: userItems,
      mainItems: mainNavItemsDefault,
    };
  } else {
    AppNavBarProps.mainItems = [...mainNavItemsDefault, { label: "Sign In" }];
  }

  return (
    <div
      className={css({
        boxSizing: "border-box",
        width: "100vw",
        top: "0",
        left: "0",
      })}
    >
      <AppNavBar {...AppNavBarProps} />
    </div>
  );
}
