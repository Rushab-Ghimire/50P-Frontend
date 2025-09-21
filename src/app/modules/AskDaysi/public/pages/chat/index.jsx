import React, { useCallback, useEffect, useState } from "react";
import AskDaysiAppBar from "../../global/AppBar";
import { Box, Container, Stack } from "@mui/material";
import ChatModule from "./components/ChatModule";
import Footer from "../../global/footer";
import TalkModule from "./components/TalkModule";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import KeyboardOutlinedIcon from "@mui/icons-material/KeyboardOutlined";
import { ADFloatingBtns } from "@app/modules/AskDaysi/styles/chat";
import Slide from "@mui/material/Slide";
import { ADContentWrapper } from "@app/modules/AskDaysi/styles/homepage";
import "../../../styles/style.css";
import UnlockProDialog from "../../dialogs/UnlockPro";
import AskDaysiLandingPage from "../LandingPage";
import { getCookie } from "@jumbo/utilities/cookies";
import GoogleSearch from "./components/GoogleSearch";

var USER_SESSION = {};

const AskDaysiChat = () => {
  const [chat, setChat] = useState(true);
  const [talk, setTalk] = useState(false);

  const [landingPage, setLandingPage] = useState(false);

  useEffect(() => {
    return;
    var cooki = getCookie("auth_pass", 0);
    if (Number(cooki) == 1) {
      setLandingPage(false);
    } else {
      setLandingPage(true);
    }
    //console.log("cooki", cooki);
  }, []);

  const getUserSession = useCallback(() => {
    return USER_SESSION;
  });

  const setUserSession = useCallback((u) => {
    console.log("setUserSession", u);
    USER_SESSION = u;
  });

  const showChat = () => {
    setChat(true);
    setTalk(false);
  };

  const showTalk = () => {
    setChat(false);
    setTalk(true);
  };
  return (
    <>
      {landingPage && <AskDaysiLandingPage setLandingPage={setLandingPage} />}
      {!landingPage && (
        <Container
          maxWidth="100%"
          sx={{
            display: landingPage ? "none" : "block",
            padding: "0 !important",
          }}
        >
          <AskDaysiAppBar />
          <ADContentWrapper>New Design Here</ADContentWrapper>
          <UnlockProDialog />

          {/* <Footer /> */}
        </Container>
      )}
    </>
  );
};

export default AskDaysiChat;
