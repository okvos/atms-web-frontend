import * as React from "react";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from "baseui/header-navigation";
import { StyledLink } from "baseui/link";
import { APP_NAME } from "../../config/constants";
import { NAV_URLS } from "../../config/nav-urls";
import LogoDark from "../../common/images/atmosphere-logo-dark.png";
import { MobileMenu } from "./MobileMenu";
import { useStyletron } from "baseui";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/auth";

export function NavBar() {
  const [css, _] = useStyletron();
  const auth = useAuth();

  return (
    <HeaderNavigation>
      <StyledNavigationList $align={ALIGN.left}>
        <StyledNavigationItem>
          <img
            src={LogoDark}
            alt={`${APP_NAME} Logo`}
            style={{ width: "10rem" }}
          />
        </StyledNavigationItem>
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.center} />
      <StyledNavigationList
        $align={ALIGN.right}
        className={css({
          display: "none !important",
          "@media (max-width: 768px)": {
            display: "flex !important",
          },
        })}
      >
        <MobileMenu />
      </StyledNavigationList>
      <StyledNavigationList
        $align={ALIGN.right}
        className={css({
          display: "flex",
          "@media (max-width: 768px)": {
            display: "none !important",
          },
        })}
      >
        {NAV_URLS.map((item, key) => {
          return (
            <StyledNavigationItem key={key}>
              <StyledLink to={item.path} $as={Link} animateUnderline>
                {item.label}
              </StyledLink>
            </StyledNavigationItem>
          );
        })}
      </StyledNavigationList>
    </HeaderNavigation>
  );
}
