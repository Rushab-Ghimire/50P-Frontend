import React, { useCallback, useState } from "react";
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

var USER_SESSION = {};

const AskDaysiSamplePage = () => {
  const [chat, setChat] = useState(true);
  const [talk, setTalk] = useState(false);

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
    <Container
      maxWidth="100%"
      sx={{
        padding: "0 !important",
      }}
    >
      <AskDaysiAppBar />
      <ADContentWrapper>
        {chat && (
          <ChatModule
            getUserSession={getUserSession}
            setUserSession={setUserSession}
          />
        )}
        {talk && (
          <TalkModule
            getUserSession={getUserSession}
            setUserSession={setUserSession}
          />
        )}
      </ADContentWrapper>
      {/* <ADFloatingBtns>
        <Stack>
          {chat && (
            <Box className="icon-wrap">
              <KeyboardVoiceOutlinedIcon onClick={showTalk} />
            </Box>
          )}
        </Stack>
        <Stack>
          {talk && (
            <Box className="icon-wrap">
              <KeyboardOutlinedIcon onClick={showChat} />
            </Box>
          )}
        </Stack>
      </ADFloatingBtns> */}
      <UnlockProDialog />

      {/* <Footer /> */}
    </Container>
  );
};

export default AskDaysiSamplePage;
