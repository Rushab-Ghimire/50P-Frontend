import { AuthUserPopover } from "@app/_components/popovers/AuthUserPopover";
import { MessagesPopover } from "@app/_components/popovers/MessagesPopover";
import { NotificationsPopover } from "@app/_components/popovers/NotificationsPopover";
import {
  useJumboLayout,
  useSidebarState,
} from "@jumbo/components/JumboLayout/hooks";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";

import { SIDEBAR_STYLES } from "@jumbo/utilities/constants";

import { Stack, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Search, SearchIconButtonOnSmallScreen } from "./components";
import { TranslationPopover } from "@app/_components/popovers/TranslationPopover";
import { ThemeModeOption } from "./components/ThemeModeOptions";
import { SidebarToggleButton } from "@app/_components/_core/SidebarToggleButton";
import { Logo } from "@app/_components/_core/Logo";
import ModuleModal from "./components/ModuleModal";

function Header() {
  const { isSidebarStyle } = useSidebarState();
  const [searchVisibility, setSearchVisibility] = React.useState(false);
  const { headerOptions } = useJumboLayout();
  const { theme } = useJumboTheme();
  const isBelowLg = useMediaQuery(
    theme.breakpoints.down(headerOptions?.drawerBreakpoint ?? "xl")
  );
  const handleSearchVisibility = React.useCallback((value) => {
    setSearchVisibility(value);
  }, []);

  const [langSwitch, setLangSwitch] = useState(true);

  let url = window.location.href;
  useEffect(() => {
    if (url.includes("agents")) {
      setLangSwitch(false);
    }
  });

  return (
    <React.Fragment>
      <SidebarToggleButton />
      {isSidebarStyle(SIDEBAR_STYLES.CLIPPED_UNDER_HEADER) && !isBelowLg && (
        <Logo sx={{ mr: 3, minWidth: 150 }} mode={theme.type} />
      )}
      {/* <Logo
        sx={{
          mr: 3,
          minWidth: { xs: "auto", md: 150 },
          display: { xs: "none", sm: "block" },
        }}
        mode={theme.type}
      /> */}

      <Stack direction="row" alignItems="center" gap={1.25} sx={{ ml: "auto" }}>
        {/* <ModuleModal /> */}
        {langSwitch && <TranslationPopover />}

        <NotificationsPopover />
        <AuthUserPopover />
      </Stack>
      {/* <SidebarToggleButton /> */}
    </React.Fragment>
  );
}

export { Header };
