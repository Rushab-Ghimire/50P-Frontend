import ChatModule from "@app/modules/AskDaysi/public/pages/chat/components/ChatModule";
import { Box, Container, Dialog, IconButton, Slide } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DoctorsList from "@app/modules/agent-components/DoctorsList";
import { GLOBAL } from "@app/_utilities/globals";
import { eraseCookie, getCookie } from "@jumbo/utilities/cookies";
import { InsuranceChecker } from "../../components/InsuranceChecker";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import SurveyModal from "@app/modules/AskDaysi/public/dialogs/survey";
import { getRoles } from "@app/_utilities/helpers";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

var USER_SESSION = {};

const DashboardWidgets = () => {
  const { isAuthenticated, userDetail, getUserDetail } = useAuth();

  const checkForPass = useCallback(() => {
    // console.log(
    //   "userDetail",
    //   GLOBAL.userDetail,
    //   getRoles(GLOBAL.userDetail.organizations).includes("patient")
    // );

    if (Object.keys(GLOBAL.userDetail).length > 0) {
      if (getRoles(GLOBAL.userDetail.organizations).includes("patient")) {
        if (!GLOBAL.userDetail.one_time_pass) {
          setIsSurveyOpen(true);
        } else {
          setIsSurveyOpen(false);
        }
      }
    } else {
      getUserDetail();
      setTimeout(() => {
        checkForPass();
      }, 2000);
    }
  });

  const [open, setOpen] = React.useState(
    getCookie("doctorSearchSelContact") != null ? true : false
  );
  const handleClose = () => {
    eraseCookie("doctorSearchSelContactOpenBooking");
    eraseCookie("doctorSearchSelContact");
    setOpen(false);
  };

  useEffect(() => {
    window.showGeneralDialog = showGeneralDialog;
    setTimeout(() => {
      checkForPass();
    }, 1500);
  }, []);

  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const handleOpen = () => {
    setIsSurveyOpen(!isSurveyOpen);
  };

  const getUserSession = useCallback(() => {
    return USER_SESSION;
  });

  const setUserSession = useCallback((u) => {
    console.log("setUserSession", u);
    USER_SESSION = u;
  });

  return (
    <>
      <SurveyModal
        isDialogOpened={isSurveyOpen}
        handleCloseDialog={() => setIsSurveyOpen(false)}
      />
      <Box sx={{ marginLeft: "-32px", marginRight: "-32px" }}>
        <ChatModule
          getUserSession={getUserSession}
          setUserSession={setUserSession}
        />
      </Box>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Container>
          <Box
            sx={{
              display: "flex",
              padding: "10px 0",
            }}
          >
            {/* <Stack> */}
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              sx={{
                position: "absolute",
                right: "20px",
                top: "20px",
                border: `1px solid #000`,
                padding: "3px",
                color: "#000",
              }}
            >
              <CloseIcon />
            </IconButton>
            {/* </Stack> */}
          </Box>
        </Container>
        <Box sx={{ mt: 8 }}>
          <DoctorsList />
        </Box>
      </Dialog>
    </>
  );
};

export default DashboardWidgets;
