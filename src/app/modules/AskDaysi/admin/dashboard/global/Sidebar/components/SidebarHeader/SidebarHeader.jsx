import {
  useJumboLayout,
  useSidebarState,
} from "@jumbo/components/JumboLayout/hooks";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";
import { SIDEBAR_STYLES, SIDEBAR_VIEWS } from "@jumbo/utilities/constants";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { IconButton, Zoom } from "@mui/material";
import React, { useEffect } from "react";
import { SidebarHeaderDiv } from "..";
import Logo from "/assets/images/logo.png";
function SidebarHeader() {
  const { sidebarOptions, setSidebarOptions } = useJumboLayout();
  const { theme } = useJumboTheme();
  const { isMiniAndClosed } = useSidebarState();
  const miniAndClosed = isMiniAndClosed();

  function handleMenuToggle() {
    setSidebarOptions({ open: false });
  }

  useEffect(() => {
    window.hideSB = () => setSidebarOptions({ open: false });
  });

  return (
    <React.Fragment>
      {sidebarOptions?.style !== SIDEBAR_STYLES.CLIPPED_UNDER_HEADER && (
        <SidebarHeaderDiv>
          <img src={Logo} alt="CURA Logo" style={{ width: "140px" }} />
          {sidebarOptions?.view !== SIDEBAR_VIEWS.MINI && (
            <Zoom in={sidebarOptions?.open}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ ml: 0, mr: -1.5 }}
                onClick={handleMenuToggle}
              >
                <MenuOpenIcon />
              </IconButton>
            </Zoom>
          )}
        </SidebarHeaderDiv>
      )}
    </React.Fragment>
  );
}

export { SidebarHeader };
