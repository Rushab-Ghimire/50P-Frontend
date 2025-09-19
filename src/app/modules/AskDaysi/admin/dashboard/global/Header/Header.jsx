// import { AuthUserPopover } from "@app/_components/popovers/AuthUserPopover";
import { MessagesPopover } from "@app/_components/popovers/MessagesPopover";
import {
  useJumboLayout,
  useSidebarState,
} from "@jumbo/components/JumboLayout/hooks";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";

import { SIDEBAR_STYLES } from "@jumbo/utilities/constants";

import { Stack, useMediaQuery } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Search, SearchIconButtonOnSmallScreen } from "./components";
import { TranslationPopover } from "@app/_components/popovers/TranslationPopover";
import { ThemeModeOption } from "./components/ThemeModeOptions";
import { SidebarToggleButton } from "@app/_components/_core/SidebarToggleButton";
import { Logo } from "@app/_components/_core/Logo";
import ModuleModal from "./components/ModuleModal";
import DoctorPatientChat from "../../dialogs/DoctorPatientChat";
import { GLOBAL } from "@app/_utilities/globals";
import SurveyModal from "@app/modules/AskDaysi/public/dialogs/survey";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import { getRoles } from "@app/_utilities/helpers";
import { NotificationsPopover } from "../../components/NotificationsPopover";
import PricingPlanModal from "../../dialogs/PricingPlan";
import { AuthUserPopover } from "../../components/AuthUserPopover";
import ReferFriendModal from "../../dialogs/ReferFriend";

function Header() {
  const { isSidebarStyle } = useSidebarState();
  const [searchVisibility, setSearchVisibility] = React.useState(false);
  const { headerOptions } = useJumboLayout();
  const { theme } = useJumboTheme();

  //const { isAuthenticated, userDetail, getUserDetail } = useAuth();

  const isBelowLg = useMediaQuery(
    theme.breakpoints.down(headerOptions?.drawerBreakpoint ?? "xl")
  );
  const handleSearchVisibility = React.useCallback((value) => {
    setSearchVisibility(value);
  }, []);

  const [dialogKey, setDialogKey] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [bookingId, setBookingId] = useState(-1);
  const [params, setParams] = useState(null);
  const showGeneralDialog = useCallback((key, booking_id, params=null) => {
    // console.log("showGeneralDialog", key, booking_id);
    setDialogKey((p) => key);
    setBookingId((p) => booking_id);
    setRefresh((p) => refresh + 1);
    setParams((p) => params)
  });

  const onDialogClosed = useCallback(() => {
    setDialogKey((p) => "");
    setBookingId((p) => -1);
    setRefresh((p) => refresh + 1);
    setParams((p) => null)
  });

  useEffect(() => {
    window.showGeneralDialog = showGeneralDialog;
  }, []);

  return (
    <React.Fragment key={refresh}>
      <SidebarToggleButton />
      {isSidebarStyle(SIDEBAR_STYLES.CLIPPED_UNDER_HEADER) && !isBelowLg && (
        <Logo sx={{ mr: 3, minWidth: 150 }} mode={theme.type} />
      )}
      <Stack direction="row" alignItems="center" gap={1.25} sx={{ ml: "auto" }}>
        <TranslationPopover />

        <NotificationsPopover />
        <AuthUserPopover />
        <DoctorPatientChat
          onDialogClosed={onDialogClosed}
          bookingId={bookingId}
          isDialogOpened={dialogKey == "DoctorPatientChat" ? true : false}
        />

        <PricingPlanModal
          onDialogClosed={onDialogClosed}
          isDialogOpened={dialogKey == "PricingPlan" ? true : false}
          params={params}
        />

        <ReferFriendModal
          onDialogClosed={onDialogClosed}
          isDialogOpened={dialogKey == "ReferFriend" ? true : false}
        />
      </Stack>
    </React.Fragment>
  );
}

export { Header };
