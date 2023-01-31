import React, { useState } from "react";
import { Drawer, SIZE } from "baseui/drawer";
import { NAV_URLS } from "../../config/nav-urls";
import { StyledLink } from "baseui/link";
import { Button } from "baseui/button";

import Menu from "baseui/icon/menu";
import { ListItem, ListItemLabel } from "baseui/list";
import {Link} from "react-router-dom";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={(e) => setIsOpen(true)}>
        <Menu />
      </Button>
      <Drawer onClose={() => setIsOpen(false)} isOpen={isOpen} size={SIZE.full}>
        {NAV_URLS.map((item, key) => {
          return (
            <ListItem key={key}>
              <ListItemLabel>
                <StyledLink to={item.path} $as={Link} animateUnderline>
                  {item.label}
                </StyledLink>
              </ListItemLabel>
            </ListItem>
          );
        })}
      </Drawer>
    </>
  );
}
