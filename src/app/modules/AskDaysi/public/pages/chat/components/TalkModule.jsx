import React, { useCallback, useEffect, useState } from "react";
import { ADChatTitle, ADIConButton } from "@app/modules/AskDaysi/styles/chat";
import { Box, Container } from "@mui/material";
import Slide from "@mui/material/Slide";

import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { gqlMutate } from "@app/_utilities/http";
import VoPalette from "@app/modules/agent-components/VoPalette";
import { BOT_ROUTER_URL } from "@app/_utilities/constants/paths-env";
import { VoMsg } from "@app/_styles/VoiceAI";
import { GLOBAL } from "@app/_utilities/globals";
import { Colors } from "@app/modules/AskDaysi/theme/colors";

var voiceModeOn = false;
var initiateVoiceMode = -1;
var modeActivated = -1;
var sendCustomMessage = -1;
var configureData = -1;

const TalkModule = ({ getUserSession, setUserSession }) => {
  const containerRef = React.useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [Msg, setMsg] = useState(false);
  const [phone, setPhone] = useState("");
  const [readyMsg, setReadyMsg] = useState(false);
  const [palette, setPalette] = useState({});
  const [refresh, setRefresh] = useState(0);

  const params = useParams();

  const search = (search) => {
    console.log("search...", search);
    setPalette((prev) => {
      return {
        section: "search",
        param: {
          q: search,
        },
      };
    });
    sendCustomMessage("Tell the user to use the form to Search");
    setRefresh(refresh + 1);
  };

  useEffect(() => {
    if (initiateVoiceMode === -1 && modeActivated === -1) {
      const importComponent = async () => {
        const module = await import(`${BOT_ROUTER_URL}/agent/voice_ehr.js`);

        initiateVoiceMode = module.initiateVoiceMode;
        modeActivated = module.modeActivated;
        sendCustomMessage = module.sendCustomMessage;
        configureData = module.configureData;

        //console.log("module.callbacks", module.callbacks);

        module.callbacks["getUserSession"] = getUserSession;

        module.callbacks["search"] = search;
        module.callbacks["identify_phone"] = identify_phone;
        module.callbacks["m_query"] = m_query;

        if (params.org_id === undefined) {
          //alert("Incorrect URL - missing org_id");
          //return;
        }

        //identify_phone("+9779841882255");
        //search("abcd");
        //m_query("summarize");
      };
      importComponent();
    } else if (modeActivated()) {
      console.log("MODE IS ON...", getUserSession());
      setMsg(false);
      setReadyMsg(true);
      var o = getUserSession();
      if (Object.keys(o).length > 0) {
        configureData(o);
      }
      setTimeout(() => {
        sendCustomMessage(
          "Hello" +
            (GLOBAL["lang_tag"] !== undefined ? " " + GLOBAL["lang_tag"] : "")
        );
      }, 500);
    }
  }, []);

  function identify_phone(phone) {
    console.log("identifying...", phone);
    setPhone(phone);
  }

  function m_query(term) {
    console.log("called m_query", term);

    sendCustomMessage(term);

    // if (Object.keys(USER_SESSION).length <= 0) {
    //   sendCustomMessage("Provide your phone number for identification.");
    // } else {
    //   sendCustomMessage("Provide your phone number for identification.");
    // }
  }

  const loopForVoiceMode = useCallback(() => {
    setTimeout(() => {
      if (modeActivated()) {
        setMsg(false);
        setReadyMsg(true);
        var o = getUserSession();
        console.log("loopForVoiceMode USER_SESSION", o);
        if (Object.keys(o).length > 0) {
          setTimeout(() => {
            configureData(o);
          }, 3000);
        }
        setTimeout(() => {
          sendCustomMessage(
            "Hello" +
              (GLOBAL["lang_tag"] !== undefined ? " " + GLOBAL["lang_tag"] : "")
          );
        }, 3000);
      } else {
        loopForVoiceMode();
      }
    }, 500);
  });

  if (!voiceModeOn) {
    window.captureParameters = (name, phone_number, date_time) => {
      console.log("captured...");
      var note = "Voice Booking";
      date_time = getFormattedDate(date_time, "YYYY-MM-DD HH:mmZZ");
      console.log(name, phone_number, date_time, note);
      var d = {
        name: name,
        contact: phone_number,
        dateTime: date_time,
        note: note,
        org_id: params.org_id,
      };
      mutate({
        inData: { gql: createDocument(d) },
        path: "/graphql",
        onSuccess: () => {
          sendCustomMessage("I have completed Appointment booking.");
        },
      });
    };

    // setTimeout(() => {
    //   window.captureParameters("Nimesh", "9841882255", "2025-02-08 05:00 PM");
    // }, 1000);
  }

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: gqlMutate,
  });

  const initiateConversation = () => {
    setIsActive(!isActive);
    setMsg(true);
    setReadyMsg(false);

    initiateVoiceMode();
    loopForVoiceMode();
    voiceModeOn = true;
  };

  const closePalette = () => {
    console.log("closing...palette");
    setPalette((prev) => {
      return { section: "", param: "" };
    });
  };

  return (
    <Box ref={containerRef} sx={{ overflow: "hidden", width: "100%" }}>
      <Slide
        direction="up"
        in
        mountOnEnter
        unmountOnExit
        container={containerRef.current}
      >
        <Container maxWidth="xl" sx={{ textAlign: "center" }}>
          <ADIConButton
            onClick={() => {
              initiateConversation();
            }}
            className={`voice-mic  "listining"}`}
          >
            <KeyboardVoiceOutlinedIcon
              sx={{
                color: `${Colors.white}`,
                fontSize: "40px",
                cursor: "pointer",
              }}
            />
          </ADIConButton>
          {!Msg && !readyMsg && <ADChatTitle>Tap to Speak</ADChatTitle>}
          {Msg && <ADChatTitle>Connecting...</ADChatTitle>}
          {readyMsg && <ADChatTitle>Ready</ADChatTitle>}
          <Box sx={{ width: "100%" }}>
            <VoPalette
              palette={palette}
              closePalette={closePalette}
              sendCustomMessage={sendCustomMessage}
            />
          </Box>
        </Container>
      </Slide>
    </Box>
  );
};

export default TalkModule;
