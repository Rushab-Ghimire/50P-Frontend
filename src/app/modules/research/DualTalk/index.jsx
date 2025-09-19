import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormLabel,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import CallEndOutlinedIcon from "@mui/icons-material/CallEndOutlined";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import { Colors } from "@app/modules/AskDaysi/theme/colors";
import PTT from "/assets/images/askdaysi/global/ptt-h.jpg";
import { GLOBAL } from "@app/_utilities/globals";
import { BOT_ROUTER_URL } from "@app/_utilities/constants/paths-env";
import AdvFilterLanguageSelector from "@app/modules/AskDaysi/public/components/form-components/AdvFilterLanguageSelector";
import TranscriptViewer from "./transcript";
import { v4 as uuid } from "uuid";

var voiceModeOn = false;
var initiateVoiceMode = -1;
var modeActivated = -1;
var hangup = -1;
var configureData = -1;
var getTranslatedMessage = -1;

var USER_SESSION = {};

var patient_lang = "English";
var doctor_lang = "English";

let isTranslated = true;

const DualTalk = () => {
  const [readyMsg, setReadyMsg] = useState(false);

  useEffect(() => {
    if (initiateVoiceMode === -1 && modeActivated === -1) {
      const importComponent = async () => {
        const module = await import(
          `${BOT_ROUTER_URL}/agent/voice_translator.js`
        );

        initiateVoiceMode = module.initiateVoiceMode;
        modeActivated = module.modeActivated;
        getTranslatedMessage = module.getTranslatedMessage;
        configureData = module.configureData;
        hangup = module.hangup;

        window.getTranslatedMessage = getTranslatedMessage;
        module.callbacks["getUserSession"] = getUserSession;
        module.callbacks["postTranscript"] = postTranscript;
      };
      importComponent();
    } else if (modeActivated()) {
      //console.log("MODE IS ON...", getUserSession());
      setReadyMsg(true);
      var o = getUserSession();
      if (Object.keys(o).length > 0) {
        configureData(o);
      }
    }
  }, []);

  const postTranscript = (m, isUser = true) => {
    //console.log("postTranscript", m, isUser);
    pushText(m, isUser);
    if (isUser) {
      if (doctor_lang != patient_lang) {
        getTranslatedMessage(
          `Silently Detect language in the sentence : "${onlyText(m)}". 
          If ${patient_lang} Translate and say in ${doctor_lang}. 
          If ${doctor_lang} Translate and say in ${patient_lang}.`,
          true
        );
      }
    }
  };

  const getUserSession = useCallback(() => {
    return USER_SESSION;
  });

  const setUserSession = useCallback((u) => {
    //console.log("setUserSession", u);
    USER_SESSION = u;
  });

  const onlyText = (m, first_response = false) => {
    if (first_response) {
      m = m.replace(["\n", "\r"], "");
    } else {
      m = m.replace(/\n/g, "");
    }
    m = m.replace(/<<.*>>/, "");
    m = m.replaceAll("**:", "");
    m = m.replaceAll(":**", "");
    m = m.replaceAll("**", "");
    return `${m}`;
  };

  const formatProper = (m, first_response = false) => {
    if (first_response) {
      m = m.replace(["\n", "\r"], "");
    } else {
      m = m.replace(/\n/g, "<br/>");
    }
    m = m.replace(/<<.*>>/, "");
    m = m.replaceAll("**:", "</span>:");
    m = m.replaceAll(":**", "</span>:");
    m = m.replaceAll("**", "<span style='text-decoration: underline;'>");
    return `${m}`;
  };

  const loopForVoiceMode = useCallback(() => {
    setTimeout(() => {
      if (modeActivated()) {
        setReadyMsg(true);
        var o = getUserSession();
        //console.log("loopForVoiceMode USER_SESSION", o);

        if (Object.keys(o).length > 0) {
          setTimeout(() => {
            configureData(o);
          }, 2000);
        }
        setTimeout(() => {
          try {
            getTranslatedMessage(
              `Say "Hello, I am AskDaysi Translator. I will translate all
              communications between you and your doctor.
              Please continue your conversation." in ${patient_lang}`,
              true
            );
            //getTranslatedMessage(`Say "Hello" in ${patient_lang}`, true);
          } catch (e) {}
        }, 1000);
      } else {
        loopForVoiceMode();
      }
    }, 500);
  });

  const initiateConversation = () => {
    initiateVoiceMode();
    loopForVoiceMode();
    voiceModeOn = true;
  };

  const doHangUp = () => {
    setReadyMsg(false);

    hangup();
    voiceModeOn = false;
    setShowTranscript(false);
    transcriptViewerRef.current.clearTranscripts();
  };

  const handleClick = () => {
    if (readyMsg) {
      doHangUp();
      setLangSelector(true);
    } else {
      initiateConversation();
    }
  };

  const [langSelector, setLangSelector] = useState(true);

  const handleLangForm = async () => {
    setLangSelector(false);
  };

  const labelStyle = { fontSize: "18px", color: Colors.black, mb: 1 };
  const transcriptViewerRef = useRef(null);

  const sampleArray = [
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
    "Lorem Ipsum छपाई और अक्षर योजन उद्योग का एक साधारण डमी पाठ है. Lorem Ipsum सन १५०० के बाद से अभी तक इस उद्योग का मानक डमी पाठ मन गया. जब एक अज्ञात मुद्रक ने नमूना लेकर एक नमूना किताब बनाई. यह न केवल पाँच सदियों से जीवित रहा बल्कि इसने इलेक्ट्रॉनिक मीडिया में छलांग लगाने के बाद भी मूलतः अपरिवर्तित रहा.",
  ];
  const [showTranscript, setShowTranscript] = useState(false);
  const pushText = useCallback((m, isT) => {
    isTranslated = !isTranslated;
    transcriptViewerRef.current.addTranscript({
      uuid: uuid(),
      content:
        m !== undefined
          ? m
          : sampleArray[transcriptViewerRef.current.getCount() % 2],
      isTranslated: isT !== undefined ? isT : isTranslated,
    });
    setShowTranscript(true);
  });

  return (
    <>
      <Container
        maxWidth="100%"
        sx={{
          pt: { xs: 2, sm: 2, md: !showTranscript ? 6 : 1 },
          backgroundColor: Colors.white_1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: { xs: 4, sm: 4, md: showTranscript ? 2 : 8 },
          }}
        >
          <img
            src={PTT}
            alt="Askdaysi"
            style={{ width: !showTranscript ? "300px" : "50px" }}
          />
        </Box>
        <Box
          sx={{
            display: showTranscript ? "flex" : "none",
            justifyContent: "center",
            mb: { xs: 4, sm: 4, md: 4 },
          }}
        >
          <TranscriptViewer ref={transcriptViewerRef} />
        </Box>
        <Box
          sx={{
            display: "none",
            justifyContent: "center",
            mb: { xs: 4, sm: 4, md: 8 },
          }}
        >
          <Button
            sx={{ marginRight: "10px" }}
            variant="contained"
            size="small"
            onClick={() => {
              pushText();
            }}
          >
            Push Text
          </Button>{" "}
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              setShowTranscript(false);
            }}
          >
            Hide Transcripts
          </Button>
        </Box>

        {langSelector && (
          <Box
            maxWidth={"sm"}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "20px",
              margin: "auto",
            }}
          >
            <Stack sx={{ flex: 1 }}>
              <AdvFilterLanguageSelector
                is_multiple={false}
                selected={2}
                setSelectedLanguage={(sel) => {
                  doctor_lang = sel[0].title;
                  //console.log(patient_lang, doctor_lang);
                }}
                labelTitle="Doctors Language"
              />
            </Stack>
            <Stack sx={{ flex: 1 }}>
              <AdvFilterLanguageSelector
                is_multiple={false}
                selected={2}
                setSelectedLanguage={(sel) => {
                  patient_lang = sel[0].title;
                  //console.log(patient_lang, doctor_lang);
                }}
                labelTitle="Patients Language"
              />
            </Stack>
            <Stack sx={{ flex: 1 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleLangForm}
              >
                Next
              </Button>
            </Stack>
          </Box>
        )}
        {!langSelector && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 10,
              // height: "100vh",
            }}
          >
            {readyMsg && (
              <Box className="mic-alt" onClick={handleClick}>
                <CallEndOutlinedIcon
                  sx={{
                    color: Colors.white,
                    fontSize: "125px",
                    borderRadius: "50%",
                    padding: "15px",
                  }}
                />
              </Box>
            )}
            {!readyMsg && (
              <Box className="mic listen" onClick={handleClick}>
                <KeyboardVoiceOutlinedIcon
                  sx={{
                    color: Colors.white,
                    fontSize: "125px",
                    borderRadius: "50%",
                    padding: "15px",
                  }}
                />
              </Box>
            )}
          </Box>
        )}
      </Container>
    </>
  );
};

export default DualTalk;
