import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import { Colors } from "@app/_themes/TileFlex";
import {
  VoButton,
  VoHeading,
  VoIConButton,
  VoMsg,
  VoSubHeading,
  VOWrapper,
} from "@app/_styles/VoiceAI";
import bgImg from "/assets/images/voice/voice-bg.jpg";
import { createDocument } from "./Document";
import { gqlMutate, gqlQuery } from "@app/_utilities/http";
import { useMutation, useQuery } from "react-query";
import { BOT_ROUTER_URL } from "@app/_utilities/constants/paths-env";
// import {
//   initiateVoiceMode,
//   modeActivated,
// } from `${BOT_ROUTER_URL}/agent/voice.js`;
import { getFormattedDate } from "@app/_utilities/helpers/index.jsx";
import { useParams } from "react-router-dom";
import Logo from "/assets/images/alt-logo.png";
import VoPalette from "@app/modules/agent-components/VoPalette";

var voiceModeOn = false;
var initiateVoiceMode = -1;
var modeActivated = -1;
var sendCustomMessage = -1;
var configureData = -1;
var USER_SESSION = {};
const VoiceAI = () => {
  const [isActive, setIsActive] = useState(false);
  const [Msg, setMsg] = useState(true);
  const [phone, setPhone] = useState("");
  const [readyMsg, setReadyMsg] = useState(false);
  const [palette, setPalette] = useState({});

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

        module.callbacks["search"] = search;
        module.callbacks["identify_phone"] = identify_phone;
        module.callbacks["m_query"] = m_query;

        if (params.org_id === undefined) {
          alert("Incorrect URL - missing org_id");
          return;
        }

        //identify_phone("+9779841882255");
        search("abcd");
        //m_query("summarize");

        // initiateVoiceMode();
        // loopForVoiceMode();
        // voiceModeOn = true;
      };
      importComponent();
    }
  }, []);

  // useQuery({
  //   queryKey: [
  //     "phone",
  //     {
  //       gql: `query Q {
  //           agentEhrByPhone(
  //               phone: "${phone}"
  //           )
  //           {
  //               id
  //               fullName
  //               json
  //               phoneNumber
  //           }
  //       }`,
  //     },
  //   ],
  //   queryFn: ({ signal, queryKey }) =>
  //     gqlQuery({
  //       signal,
  //       path: "/graphql",
  //       inData: phone == "" ? -1 : queryKey[1],
  //     }),
  //   onSuccess: (data) => {
  //     console.log("identified...", data);
  //   },
  // });

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
        var o = {
          name: "Nimesh",
          roll: "124",
          marks: "90%",
        };

        setTimeout(() => {
          configureData(o);
        }, 5000);
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

  const handleClick = () => {
    setIsActive(!isActive);
    setMsg(false);
    setReadyMsg(false);

    setTimeout(() => {
      setReadyMsg(true);
    }, 2000);
  };

  const closePalette = () => {
    console.log("closing...palette");
    setPalette((prev) => {
      return { section: "", param: "" };
    });
  };
  return (
    <VOWrapper maxWidth="100%" src={bgImg}>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <img
            src={Logo}
            alt="TileFlexAI"
            style={{ width: "150px", marginBottom: "40px" }}
          />
          <VoHeading variant="h2">Voice AI for individuals</VoHeading>
          <VoSubHeading>
            TileFlexAI lets individuals book services via voice agents.
          </VoSubHeading>

          <VoPalette
            palette={palette}
            closePalette={closePalette}
            sendCustomMessage={sendCustomMessage}
          />

          <VoIConButton
            className={`voice-mic ${isActive ? "listining" : ""}`}
            onClick={handleClick}
          >
            <KeyboardVoiceOutlinedIcon
              sx={{ color: Colors.white, fontSize: "40px", cursor: "pointer" }}
            />
          </VoIConButton>
          {Msg && <VoMsg variant="h4">Connecting...</VoMsg>}
          {readyMsg && <VoMsg variant="h4">Ready!</VoMsg>}
        </Box>
      </Container>
    </VOWrapper>
  );
};

export default VoiceAI;
