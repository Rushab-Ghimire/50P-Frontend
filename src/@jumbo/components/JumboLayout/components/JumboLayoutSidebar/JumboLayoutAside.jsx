import React from "react";

import {
  useJumboSidebarTheme,
  useJumboTheme,
} from "@jumbo/components/JumboTheme/hooks";
import { SIDEBAR_STYLES, SIDEBAR_VIEWS } from "@jumbo/utilities/constants";
import { Box, IconButton, Zoom } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { useJumboLayout, useSidebarState } from "../../hooks";
import { SidebarHeaderDiv } from "@app/_components/layout/Sidebar/components";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Div } from "@jumbo/shared";
import { Logo } from "@app/_components/_core/Logo";
function JumboLayoutAside({ children }) {
  const { sidebarTheme } = useJumboSidebarTheme();
  const { theme } = useJumboTheme();
  const { sidebarOptions, setSidebarOptions } = useJumboLayout();

  const { isMiniAndClosed } = useSidebarState();
  const miniAndClosed = isMiniAndClosed();
  if (sidebarOptions?.hide) {
    return null;
  }

  const sidebarWithDirectionByMainTheme = React.useMemo(() => {
    return {
      ...sidebarTheme,
      direction: theme.direction,
    };
  }, [theme.direction, sidebarTheme]);
  function handleMenuToggle() {
    setSidebarOptions({ open: false });
  }
  return (
    <ThemeProvider theme={sidebarWithDirectionByMainTheme}>
      <Div>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            minWidth: 0,
            flexDirection: "column",
            minHeight: "100%",
            overflow: "hidden",
            position: "relative",
            zIndex: 1,
          }}
        >
          {sidebarOptions?.style === SIDEBAR_STYLES.CLIPPED_UNDER_HEADER && (
            <SidebarHeaderDiv>
              <Logo mini={miniAndClosed} mode={theme.type} />
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
            // <Toolbar sx={{ flexShrink: 0, ...headerSpaceSx }} />
          )}
          {children}
        </Box>
        {sidebarTheme?.sidebar?.overlay?.bgcolor && (
          <Box
            sx={{
              position: "absolute",
              height: "100%",
              left: 0,
              right: 0,
              top: 0,
              ...(Array.isArray(sidebarTheme.sidebar.overlay.bgcolor) &&
              sidebarTheme.sidebar.overlay.bgcolor.length > 0
                ? {
                    backgroundImage: `linear-gradient(${sidebarTheme.sidebar.overlay.bgcolor[0]}, ${sidebarTheme.sidebar.overlay.bgcolor[1]})`,
                    opacity: sidebarTheme.sidebar.overlay.opacity
                      ? sidebarTheme.sidebar.overlay?.opacity ?? 0.85
                      : 1,
                  }
                : {
                    bgcolor: sidebarTheme.sidebar.overlay.bgcolor,
                    opacity: sidebarTheme.sidebar.overlay?.opacity ?? 1,
                  }),
            }}
          />
        )}
      </Div>
    </ThemeProvider>
  );
}

export { JumboLayoutAside };
