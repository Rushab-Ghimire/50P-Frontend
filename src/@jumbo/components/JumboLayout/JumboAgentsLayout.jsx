import { Box, Container, Toolbar } from "@mui/material";

import { Div } from "@jumbo/shared";
import { SIDEBAR_STYLES } from "@jumbo/utilities/constants";
import {
  JumboLayoutFooter,
  JumboLayoutHeader,
  JumboLayoutSidebar,
} from "./components";
import { useContentMargin, useHeaderSpaceSx, useJumboLayout } from "./hooks";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Drawer from "@mui/material/Drawer";
import ChatWindow from "@app/_components/ChatWindow/ChatWindow";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";
import chatIcon from "/assets/images/chat-icon.png";

function WrapperContainer({ children, container, sx }) {
  if (container) {
    return (
      <Container
        maxWidth={false}
        sx={{
          maxWidth: "1320px",
          display: "flex",
          minWidth: 0,
          flex: 1,
          flexDirection: "column",
          ...sx,
        }}
        disableGutters
      >
        {children}
      </Container>
    );
  }

  return children;
}

function JumboAgentsLayout(props) {
  const {
    rootOptions,
    sidebarOptions,
    headerOptions,
    contentOptions,
    wrapperOptions,
    mainOptions,
    debugOptions,
  } = useJumboLayout();

  const headerSpaceSx = useHeaderSpaceSx();
  const contentMargin = useContentMargin();

  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { theme } = useJumboTheme();
  const imgStyle = {
    width: "24px",
    height: "24px",
  };

  const closeIconStyle = {
    color: "#fff",
    position: "absolute",
    inset: "14px 10px auto auto",
    zIndex: "99999",
    fontSize: "30px",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      position: "static",
      margin: "14px 10px auto auto",
    },
  };

  return (
    <Div
      sx={{
        display: "flex",
        flex: 1,
        minWidth: 0,
        minHeight: "100%",
        flexDirection: "column",
        ...rootOptions?.sx,
      }}
      className="CmtLayout-root"
    >
      {sidebarOptions?.style === SIDEBAR_STYLES.CLIPPED_UNDER_HEADER && (
        <JumboLayoutHeader>{props.header}</JumboLayoutHeader>
      )}
      <WrapperContainer
        container={wrapperOptions?.container}
        sx={wrapperOptions?.containerSx || {}}
      >
        <Box
          sx={{
            xmarginRight: "450px",
            display: "flex",
            flex: 1,
            minWidth: 0,
            position: "relative",
            ...(wrapperOptions?.sx ?? {}),
          }}
          className={open ? "CmtLayout-wrapper" : "CmtLayout-wrapper"}
          component={wrapperOptions?.component}
        >
          {props.sidebar && (
            <JumboLayoutSidebar>{props.sidebar}</JumboLayoutSidebar>
          )}
          <Div
            sx={{
              display: "flex",
              minWidth: 0,
              flex: 1,
              flexDirection: "column",
              minHeight: "100%",
              ...(contentMargin
                ? {
                    marginLeft: {
                      sm: `${contentMargin}px`,
                    },
                  }
                : {}),
              transition: (theme) => theme.transitions.create(["margin-left"]),
              ...(mainOptions?.sx ?? {}),
            }}
            className="CmtLayout-main"
          >
            {sidebarOptions?.style !== SIDEBAR_STYLES.CLIPPED_UNDER_HEADER && (
              <JumboLayoutHeader>
                {props.header}
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerOpen}
                  sx={[open ? { display: "none" } : { marginLeft: "10px" }]}
                >
                  <img src={chatIcon} style={imgStyle} alt="TileFlexAI Chat" />
                </IconButton>
              </JumboLayoutHeader>
            )}
            {!headerOptions.hide && headerOptions.fixed && (
              <Toolbar sx={{ ...headerSpaceSx }} />
            )}
            <Div
              sx={{
                display: "flex",
                minWidth: 0,
                flex: 1,
                flexDirection: "column",
                py: 4,
                px: { lg: 6, xs: 4 },
                ...(contentOptions?.sx ?? {}),
              }}
              className="CmtLayout-content"
            >
              {props.children}
            </Div>
            <JumboLayoutFooter>{props.footer}</JumboLayoutFooter>
          </Div>
          {/* <Div>
            <Drawer variant="persistent" anchor="right" open={open}>
              <ChevronRightIcon
                size="large"
                sx={closeIconStyle}
                onClick={handleDrawerClose}
              />
              <ChatWindow />
            </Drawer>
          </Div> */}
          {props.rightSidebar && (
            <JumboLayoutSidebar>{props.rightSidebar}</JumboLayoutSidebar>
          )}
        </Box>
      </WrapperContainer>
    </Div>
  );
}

export { JumboAgentsLayout };
