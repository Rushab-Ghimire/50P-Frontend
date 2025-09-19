import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  TextField,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
  Box,
  Avatar,
  Button,
  Stack,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import {
  ADBtnDisabled,
  ADChatBox,
  ADChatInput,
  ADChatMsgArea,
  ADChatTitle,
  ADChatTsContainer,
  ADSendBtn,
  ADUserAvatar,
} from "@app/modules/AskDaysi/styles/chat";
import doctorIcon from "/assets/images/askdaysi/chat/doctor-b.png";
import Slide from "@mui/material/Slide";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { useMutation } from "react-query";
import { createDocument, addHistory, updateThread } from "./Document";
import { gqlMutate, postToBot } from "@app/_utilities/http";
import { BOT_ROUTER_URL } from "@app/_utilities/constants/paths-env";
import { v4 as uuid } from "uuid";
import {
  getCustomDateTime,
  getFormattedDate,
  useArrayState,
} from "@app/_utilities/helpers";
import { FileUploader } from "@app/modules/agent-components/FileUploader";
import SearchForm from "@app/modules/agent-components/SearchForm";
import EHRForm from "@app/modules/agent-components/eHRForm";
import { BouncingDotsLoader } from "@app/_components/apps";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import daysiAvatar from "/assets/images/chat-icon.png";
import userAvatar from "/assets/images/askdaysi/chat/user-avatar.png";
import daysi from "/assets/images/logo-small.png";
import { ADDaysi } from "@app/modules/AskDaysi/styles/homepage";
import { GLOBAL } from "@app/_utilities/globals";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import MicOffOutlinedIcon from "@mui/icons-material/MicOffOutlined";
import "../../../../styles/style.css";
import { Div, Span } from "@jumbo/shared";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import FeedbackForm from "@app/modules/agent-components/FeedbackForm";
import UnlockProDialog from "../../../dialogs/UnlockPro";
import { Colors } from "@app/modules/AskDaysi/theme/colors";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import UploadForm from "@app/modules/agent-components/UploadForm";
import InsuranceBlock from "@app/modules/agent-components/InsuranceBlock";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Tooltip from "@mui/material/Tooltip";
import { useTranslation } from "react-i18next";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { themeConfig } from "@jumbo/components";

import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import EmergencyCall from "../../../components/EmergencyCall";
import CallEndOutlinedIcon from "@mui/icons-material/CallEndOutlined";
import TabbedResponse from "./TabbedResponse";
import LabBlock from "@app/modules/agent-components/LabBlock";
import testTubeIcon from "/assets/images/askdaysi/chat/test-tube-b.png";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

var greetNow = false;
var ACTIONS = {
  UPLOAD_FORM: { key: "UPLOAD_FORM", label: "-", asMessage: true },
  INSURANCE_BLOCK: {
    key: "INSURANCE_BLOCK",
    label: "-",
    asMessage: true,
    fullWidth: true,
  },
  LAB_BLOCK: {
    key: "LAB_BLOCK",
    label: "-",
    asMessage: true,
    fullWidth: true,
  },
  BOOKING_FORM: { key: "BOOKING_FORM", label: "Click here to Book" },
  EHR_FORM: { key: "EHR_FORM", label: "Click for eHR" },
  SEARCH_FORM: {
    key: "SEARCH_FORM",
    label: "Use the form below for Search",
    fullWidth: true,
  },
  FEEDBACK_FORM: {
    key: "FEEDBACK_FORM",
    label:
      "Your feedback will be highly appreciated.<br/>Use the form below for Feedback",
  },
  EMERGENCY_911_FORM: {
    key: "EMERGENCY_911_FORM",
    label: "Seems like you need an Emergency Help",
  },
};

var voiceModeOn = false;
var initiateVoiceMode = -1;
var modeActivated = -1;
var sendCustomMessage = -1;
var hangup = -1;
var configureData = -1;
var getThreadContext = true;
var refresh = 0;
var m_searchTerm = "";
var uuidIdentifier = uuid();

var ctrOpenMode = 0;

const ChatModule = ({ getUserSession, setUserSession }) => {
  const { t } = useTranslation();

  const [micModal, setMicModal] = useState(false);

  const [isDisabled, setIsDisabled] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [someMessage, setSomeMessage] = useState(false);

  const [isActive, setIsActive] = useState(false);
  const [Msg, setMsg] = useState(false);
  const [readyMsg, setReadyMsg] = useState(false);
  const [palette, setPalette] = useState({});

  const { isAuthenticated } = useAuth();

  const [searchParams, setSearchParams] = useSearchParams();
  const modeOpen = searchParams.get("mode");
  React.useEffect(() => {
    if (modeOpen && ctrOpenMode <= 0) {
      if (modeOpen == "chat") {
        setTimeout(() => {
          greet();
        }, 500);
      } else if (modeOpen == "call") {
      }
      ctrOpenMode++;
    }
  }, [modeOpen]);

  const addChat = useCallback((content, source, fromVoice = false) => {
    if (!isAuthenticated) {
      return;
    }

    if (!document.location.href.includes("dashboard")) {
      return;
    }

    if (content.trim() == "") {
      return;
    }

    var s = {
      content: content,
      source: source ? "user" : "bot",
      chatHistoryCategoryId: GLOBAL.chat_thread_id,
    };

    if (GLOBAL.chat_thread_id == -1) {
      getThreadContext = true;
    } else {
      if (GLOBAL.chat_thread_title == "--") {
        getThreadContext = true;
      } else {
        getThreadContext = false;
      }
    }

    // console.log(
    //   "calling addHistory",
    //   s,
    //   GLOBAL.chat_thread_title,
    //   "===xxxxxxxxx===="
    // );

    mutate({
      inData: { gql: addHistory(s) },
      path: "/graphql",
      onSuccess: (dx) => {
        GLOBAL.chat_thread_id =
          dx["addHistoryItem"]["chatHistory"]["chatHistoryCategory"]["id"];
        GLOBAL.chat_thread_id = Number(GLOBAL.chat_thread_id);
        //console.log("getThreadContext && source ", getThreadContext, source);
        if (getThreadContext && !source) {
          //console.log("finding context for ", content);
          getThreadContext = false;
          if (fromVoice) {
            saveThread(
              "Voice Chat on " + getFormattedDate(new Date()),
              GLOBAL.chat_thread_id
            );
          } else {
            randomResponseFromAI(
              `summarize this in 5 words "${content}"`,
              true,
              (chat_ctx_summary) => {
                //console.log("saving...", chat_ctx_summary);
                saveThread(chat_ctx_summary, GLOBAL.chat_thread_id);
              }
            );
          }
        }
      },
    });
  });

  const randomResponseFromAI = useCallback((m, first_response = false, fx) => {
    //console.log("randomResponseFromAI", m);
    fetch(
      `${BOT_ROUTER_URL}/chat_message`,
      //"http://localhost:5050/chat_message",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message:
            m +
            (GLOBAL["lang_tag"] !== undefined ? " " + GLOBAL["lang_tag"] : ""),
          ai_type: "MEDICAL",
          first_response: first_response,
          identifier: uuidIdentifier,
        }),
      }
    )
      .then((resp) => resp.json()) // or, resp.text(), etc
      .then((data) => {
        console.log("response", data.message);
        if (fx !== undefined) {
          fx(data.message);
        }
      })
      .catch((error) => {
        console.error("error", error);
      });
  });
  window.randomResponseFromAI = randomResponseFromAI;

  const loadHistory = useCallback((history) => {
    //console.log("loadHistory called");
    setMChain((it) => it.splice(0, it.length));
    //GLOBAL.chat_history_context = mChain;
    history.map((item) => {
      setMChain((it) =>
        it.push({
          id: uuid(),
          text: item.content,
          isUserX: item.source == "user" ? true : false,
          timestamp: getCustomDateTime(0, "days", "HH:mm A"),
          actions: [],
        })
      );
    });
    setIsTyping(false);
    setTimeout(() => {
      setTimeout(() => {
        try {
          refMessages.current.scrollTop = refMessages.current?.scrollHeight;
        } catch (e) {}
      }, 300);
    }, 300);
  });

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
  };

  const resetChatWindow = useCallback(() => {
    console.log("resetting chat");
    getThreadContext = true;
    GLOBAL.chat_thread_id = -1;
    GLOBAL.chat_thread_title = "--";
    setMChain((it) => it.splice(0, it.length));
  });

  const saveThread = useCallback((title, chatCategoryId) => {
    //console.log("saving thread ", title, chatCategoryId);
    GLOBAL.chat_thread_title = title;
    mutate({
      inData: { gql: updateThread(title, chatCategoryId) },
      path: "/graphql",
      onSuccess: (d) => {
        console.log("saved thread...", d);
        window.refreshThreads();
      },
    });
  });

  useEffect(() => {
    window.loadHistory = loadHistory;
    window.resetChatWindow = resetChatWindow;
    if (initiateVoiceMode === -1 && modeActivated === -1) {
      const importComponent = async () => {
        const module = await import(`${BOT_ROUTER_URL}/agent/voice_ehr.js`);

        initiateVoiceMode = module.initiateVoiceMode;
        modeActivated = module.modeActivated;
        sendCustomMessage = module.sendCustomMessage;
        configureData = module.configureData;
        hangup = module.hangup;

        //console.log("module.callbacks", module.callbacks);
        window.postTranscript = postTranscript;

        module.callbacks["getUserSession"] = getUserSession;
        module.callbacks["postTranscript"] = postTranscript;
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
      }, 300);
    }
  }, []);

  function identify_phone(phone) {
    console.log("identifying...", phone);
    setPhone(phone);
  }

  function m_query(term) {
    //console.log("called m_query", term);

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

        setIsClicked(false);
        setIsDisabled(true);

        if (Object.keys(o).length > 0) {
          setTimeout(() => {
            configureData(o);
          }, 2000);
        }
        setTimeout(() => {
          try {
            sendCustomMessage(
              "Hello" +
                (GLOBAL["lang_tag"] !== undefined
                  ? " " + GLOBAL["lang_tag"]
                  : "")
            );
          } catch (e) {}
        }, 2000);
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

  const initiateConversation = () => {
    setMicModal(true);
    setIsActive(!isActive);
    setMsg(true);
    setReadyMsg(false);

    initiateVoiceMode();
    loopForVoiceMode();
    voiceModeOn = true;
  };

  const doHangUp = () => {
    console.log("doHangUp");
    setMicModal(false);
    setIsDisabled(false);
    setIsClicked(false);
    setIsActive(!isActive);
    setMsg(false);
    setReadyMsg(true);

    getThreadContext = true;
    GLOBAL.chat_thread_id = -1;
    GLOBAL.chat_thread_title = "--";

    hangup();
    voiceModeOn = false;
    if (window.refreshThreads !== undefined) {
      window.refreshThreads();
    }
  };

  const closePalette = () => {
    console.log("closing...palette");
    setPalette((prev) => {
      return { section: "", param: "" };
    });
  };

  const handleClick = (forceCloseModal = false) => {
    if (forceCloseModal === true) {
      try {
        doHangUp();
      } catch (e) {}
      return;
    }

    setIsClicked(true);
    if (isDisabled) {
      try {
        doHangUp();
      } catch (e) {}
    } else {
      setMicModal(true);
      try {
        initiateConversation();
      } catch (e) {}
    }
  };

  const handleMicModal = () => {
    setMicModal(false);
    // Navigate
  };

  const [file, setFile] = useState(null);
  //const [messages, setMessages] = useState([]);
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const [message, setMessage] = useState("");
  const [mChain, setMChain] = useArrayState([]);
  const [isTyping, setIsTyping] = useState(true);
  const [phone, setPhone] = React.useState("");
  const [queueDateTime, setQueueDateTime] = useState(new Date());
  const refMessages = useRef();
  const params = useParams();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
    setSomeMessage(event.target.value.trim() != "");
  };

  const sendMessage = (
    m,
    isUser = true,
    actions = [],
    file,
    tabbedResponse = false
  ) => {
    setMChain((it) =>
      it.push({
        id: uuid(),
        text: m,
        file: file,
        isUserX: isUser,
        tabbedResponse: tabbedResponse,
        timestamp: getCustomDateTime(0, "days", "HH:mm A"),
        actions: actions,
      })
    );
    addChat(m, isUser);

    setTimeout(() => {
      setTimeout(() => {
        try {
          refMessages.current.scrollTop = refMessages.current?.scrollHeight;
        } catch (e) {}
      }, 300);
    }, 300);

    if (isUser && file === undefined) {
      sendToRouter(m, false, true);
      m_searchTerm = m;
    }
    clearMessage();
  };

  const postTranscript = (m, isUser = true) => {
    //console.log("----------------------------", "postTranscript ", m);
    setMChain((it) =>
      it.push({
        id: uuid(),
        text: formatProper(m),
        file: undefined,
        isUserX: isUser,
        timestamp: getCustomDateTime(0, "days", "HH:mm A"),
        actions: [],
      })
    );
    addChat(formatProper(m), isUser, true);

    setTimeout(() => {
      setIsTyping(false);
    }, 1000);

    // console.log("mChain", mChain);
    //document.getElementById("m-chat-input").focus();

    setTimeout(() => {
      setTimeout(() => {
        try {
          refMessages.current.scrollTop = refMessages.current?.scrollHeight;
        } catch (e) {}
      }, 300);
      //clearMessage("");
    }, 300);

    document.getElementById("mx-send-btn").click();
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

  const sendToRouter = useCallback(
    (m, first_response = false, tabbedResponse = false) => {
      if (false && m.includes("emergency")) {
        //var z = "some menu<<EHR_FORM>>";
        var z = "Are you in some kind of emergency?<<EMERGENCY_911_FORM>>";

        var actions = [];
        if (z.includes("<<") && z.includes(">>")) {
          actions = z.split("<<").pop().split(">>");
          //console.log("actions 11", actions);
          actions = actions.filter((item) => item != "");
          //console.log("actions 22", actions);
        }
        actions = actions.map((item) =>
          ACTIONS[item] === undefined ? item : ACTIONS[item]
        );
        z = formatProper(z);
        sendMessage(z, false, actions);
        setTimeout(() => {}, 1000);
        return;
      }

      setIsTyping(true);
      fetch(
        `${BOT_ROUTER_URL}/chat_message`,
        //"http://localhost:5050/chat_message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message:
              m +
              (GLOBAL["lang_tag"] !== undefined
                ? " " + GLOBAL["lang_tag"]
                : ""),
            ai_type: "MEDICAL",
            first_response: first_response,
            identifier: uuidIdentifier,
          }),
        }
      )
        .then((resp) => resp.json()) // or, resp.text(), etc
        .then((data) => {
          var actions = [];
          //console.log("data", data);
          if (data.message.includes("<<") && data.message.includes(">>")) {
            actions = data.message.split("<<").pop().split(">>");
            //console.log("actions 11", actions);
            actions = actions.filter((item) => item != "");
            //console.log("actions 22", actions);
          }

          actions = actions.map((item) =>
            ACTIONS[item] === undefined ? item : ACTIONS[item]
          );

          //console.log("final actions", actions);

          data.message = data.message.replace(/<<.*>>/, "");
          data.message = formatProper(data.message, first_response);
          if (data.message.length <= 250) {
            tabbedResponse = false;
          }
          sendMessage(data.message, false, actions, undefined, tabbedResponse);
          setTimeout(() => {
            setIsTyping(false);
          }, 1000);
        })
        .catch((error) => {
          console.error("error", error);
        });
    }
  );

  const launchDialog = useCallback((key) => {
    console.log(key);
    if (key === undefined) {
      alert("Popup not configured");
    } else {
      setOpen(true);
    }

    //sendToRouter("I have completed the booking. That will be all.");
    //captureParameters("Nimesh1 Shrestha1", "+111", new Date(), "aa4@w.com");
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: gqlMutate,
  });

  const captureParameters = (name, phone_number, date_time, email) => {
    console.log("captured...");
    var note = "ChatBot Booking";
    date_time = getFormattedDate(date_time, "YYYY-MM-DD HH:mmZZ");
    console.log(name, phone_number, date_time, note);
    var d = {
      action: "BOOKING",
      name: name,
      phone: phone_number,
      email: email,
      dateTime: date_time,
      note: note,
      org_id: params.org_id,
    };
    mutate({
      inData: { gql: createDocument(d) },
      path: "/graphql",
      onSuccess: () => {
        sendToRouter("thank me for completing the booking");
      },
    });
    setOpen(false);
  };

  const clearMessage = () => {
    setMessage("");
    setSomeMessage(false);
  };

  const greet = useCallback(() => {
    if (params.org_id == 2) {
      sendToRouter("Hello");
    } else {
      sendToRouter("hello");
    }
  });

  const showForm = useCallback((z) => {
    //var z = "<<SEARCH_FORM>>";

    var actions = [];
    //console.log("data", data);
    if (z.includes("<<") && z.includes(">>")) {
      actions = z.split("<<").pop().split(">>");
      //console.log("actions 11", actions);
      actions = actions.filter((item) => item != "");
      //console.log("actions 22", actions);
    }

    actions = actions.map((item) =>
      ACTIONS[item] === undefined ? item : ACTIONS[item]
    );

    if (actions.length > 0) {
      if (
        actions[0].label !== undefined &&
        actions[0].asMessage === undefined
      ) {
        sendMessage(actions[0].label, false, []);
      }
    }

    z = formatProper(z);
    sendMessage(z, false, actions);
    setTimeout(() => {
      setIsTyping(false);
    }, 500);
  });

  if (greetNow) {
    greet();
    greetNow = false;
  }

  function handleSubmit(d) {
    d.date_time = queueDateTime;
    d.phone = phone;
    console.log("form-data", d);
    captureParameters(d.name, d.phone, d.date_time, d.email);
  }

  const handleOnChange = () => {};

  //console.log(mChain);

  const [selectedFile, setSelectedFile] = useState({});

  const onFileSelect = (key, file, type = "MEDICAL_REPORT") => {
    if (file === undefined) return;
    sendMessage(file.name, true, [], file);
    sendMessage("Your file is being Analyzed.", false, []);

    setTimeout(async () => {
      var formData = new FormData();
      formData.append(key, file);
      formData.append("input_type", type);
      var response = await postToBot({
        inData: formData,
        path: "/analyze",
      });

      //console.log("response", response);

      if (JSON.stringify(response.message?.content).includes("error")) {
        if (type == "MEDICAL_REPORT") {
          sendMessage(
            "The uploaded image is not a medical document, Please upload a Medical document for analysis.",
            false,
            []
          );
        } else if (type == "INSURANCE_REPORT") {
          sendMessage(
            "The uploaded image is not an Insurance document, Please upload an Insurance document for analysis.",
            false,
            []
          );
        }
      } else {
        setUserSession(response);
        sendToRouter(
          `Consolidate this in html table format  ${JSON.stringify(response)}`,
          true
        );
      }
    }, 500);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const actionFx = useCallback((command, param) => {
    if (command == "SEND_MESSAGE") {
      sendMessage(param.message);
    } else if (command == "OPEN_FORM") {
      if (param.message == "SEARCH") {
        showForm("<<SEARCH_FORM>>");
      }
    }
  });

  const containerRef = React.useRef(null);
  const theme = useTheme();

  const helpBtnStyle = {
    color: Colors.primary,
    borderColor: Colors.primary,
    borderRadius: "30px",
    overflow: "hidden",
  };

  const helpBtn = {
    display: "flex",
    gap: "10px",
    marginTop: "5px",
    [theme.breakpoints.down("lg")]: {
      display: "none",
    },
  };

  const helpIcon = {
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
    "& button": {
      marginRight: "4px",
      padding: "3px 6px",
      minWidth: "50px",
    },
    "& button span": {
      marginRight: "1px",
    },
  };

  const feedbackLg = {
    color: Colors.primary,
    borderColor: Colors.primary,
    borderRadius: "30px",
    [theme.breakpoints.down("lg")]: {
      display: "none",
    },
  };

  const feedbackSm = {
    color: Colors.primary,
    borderColor: Colors.primary,
    borderRadius: "30px",
    // marginTop: "10px",
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  };

  const [testMessages, setTestMessages] = useState([
    { sender: "user", text: "I need some information." },
    { sender: "user", text: "I need some information." },
    { sender: "bot", text: "Sure! What do you want to know?" },
    { sender: "user", text: "I need some information." },
    { sender: "bot", text: "Hi! How can I help you today?" },
    { sender: "user", text: "I need some information." },
    { sender: "bot", text: "Sure! What do you want to know?" },
    { sender: "bot", text: "Hi! How can I help you today?" },
    { sender: "user", text: "I need some information." },
    { sender: "bot", text: "Sure! What do you want to know?" },
    { sender: "bot", text: "Hi! How can I help you today?" },
    { sender: "user", text: "I need some information." },
    { sender: "bot", text: "Sure! What do you want to know?" },
    { sender: "bot", text: "Hi! How can I help you today?" },
    { sender: "user", text: "I need some information." },
    { sender: "bot", text: "Sure! What do you want to know?" },
  ]);

  return (
    <Box
      ref={containerRef}
      sx={{ overflow: "hidden", width: "100%", paddingBottom: "10px" }}
    >
      <Slide
        direction="up"
        in
        mountOnEnter
        unmountOnExit
        container={containerRef.current}
      >
        <Container maxWidth="xl">
          {mChain.length === 0 && (
            <Box textAlign={"center"}>
              <ADDaysi src={daysi} alt="Daysi" sx={{ marginBottom: "10px" }} />
              <ADChatTitle variant="h2">
                {t("home.askdaysi")}{" "}
                <FavoriteOutlinedIcon
                  sx={{
                    color: Colors.secondary,
                    position: "relative",
                    top: "2px",
                  }}
                />
                <br />
                {t("home.askdaysidesc")}
              </ADChatTitle>
            </Box>
          )}
          {mChain.length > 0 && (
            <ADChatBox ref={refMessages} elevation={3}>
              <List>
                {mChain.map((data, index) => (
                  <ListItem
                    key={data.id}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: data.isUserX ? "flex-end" : "flex-start",
                      [theme.breakpoints.down("sm")]: {
                        padding: "8px 0",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        width:
                          data.tabbedResponse === true
                            ? "100%"
                            : data.actions[0]?.fullWidth !== undefined
                              ? "100%"
                              : "auto",
                        [theme.breakpoints.down("sm")]: {
                          flexDirection: data.isUserX
                            ? "column-reverse"
                            : "column",
                          alignItems: data.isUserX ? "flex-end" : "flex-start",
                        },
                      }}
                    >
                      {data.isUserX === false && (
                        <ADUserAvatar src={daysiAvatar} alt="Daysi Avatar" />
                      )}
                      {data.tabbedResponse === true && (
                        <TabbedResponse
                          fullResponseReply={
                            data.text !== undefined ? data.text : ""
                          }
                          searchTerm={undefined}
                          googleSearchTerm={m_searchTerm}
                        />
                      )}
                      {(data.tabbedResponse === undefined ||
                        data.tabbedResponse === false) && (
                        <ListItemText
                          primary={
                            <>
                              {data.text.trim() != "" && (
                                <Typography
                                  variant="body1"
                                  sx={{
                                    borderRadius: "8px",
                                    color: data.isUserX
                                      ? `${Colors.white}`
                                      : `${Colors.black}`,
                                  }}
                                >
                                  <Span
                                    variant="body1"
                                    dangerouslySetInnerHTML={{
                                      __html: data.text,
                                    }}
                                    sx={{ fontSize: "18px" }}
                                  ></Span>
                                </Typography>
                              )}
                              {data?.actions?.map((action) => {
                                if (action.key == "INSURANCE_BLOCK") {
                                  return (
                                    <InsuranceBlock
                                      actionFx={actionFx}
                                      onFileSelect={onFileSelect}
                                      sendToRouter={sendToRouter}
                                    />
                                  );
                                } else if (action.key == "LAB_BLOCK") {
                                  return (
                                    <LabBlock
                                      actionFx={actionFx}
                                      onFileSelect={onFileSelect}
                                      sendToRouter={sendToRouter}
                                    />
                                  );
                                } else if (action.key == "UPLOAD_FORM") {
                                  return (
                                    <UploadForm
                                      onFileSelect={onFileSelect}
                                      sendToRouter={sendToRouter}
                                    />
                                  );
                                } else if (action.key == "SEARCH_FORM") {
                                  return (
                                    <SearchForm sendToRouter={sendToRouter} />
                                  );
                                } else if (action.key == "EHR_FORM") {
                                  return (
                                    <EHRForm sendToRouter={sendToRouter} />
                                  );
                                } else if (action.key == "EMERGENCY_911_FORM") {
                                  return <EmergencyCall />;
                                } else if (action.key == "FEEDBACK_FORM") {
                                  return (
                                    <FeedbackForm sendToRouter={sendToRouter} />
                                  );
                                } else {
                                  return (
                                    <Button
                                      variant="contained"
                                      size="small"
                                      sx={{
                                        marginTop: "10px",
                                        marginBottom: "10px",
                                      }}
                                      onClick={() => {
                                        launchDialog(action.key);
                                      }}
                                    >
                                      {action?.label === undefined
                                        ? action
                                        : action.label}
                                    </Button>
                                  );
                                }
                              })}
                            </>
                          }
                          secondary={
                            <Div sx={{ mt: 1, display: "none" }}>
                              <AccessTimeIcon
                                sx={{
                                  color: data.isUserX
                                    ? `${Colors.white}`
                                    : `${Colors.black}`,
                                  position: "absolute",
                                  fontSize: "18px",
                                  marginTop: "3px",
                                }}
                              />
                              <Span
                                variant="body1"
                                sx={{
                                  color: data.isUserX
                                    ? `${Colors.white}`
                                    : `${Colors.black}`,
                                  marginLeft: "20px",
                                  fontSize: "18px",
                                }}
                                dangerouslySetInnerHTML={{
                                  __html: data.file
                                    ? `${data.file.name} <br/>${data.timestamp}`
                                    : data.timestamp,
                                }}
                              ></Span>
                            </Div>
                          }
                          sx={{
                            backgroundColor: data.isUserX
                              ? `${Colors.primary}`
                              : `${Colors.white_1}`,
                            borderRadius: data.isUserX
                              ? "15px 15px 0px 15px"
                              : "15px 15px 15px 0px",
                            padding: "12px 16px",
                            width: "100%",
                          }}
                        />
                      )}
                      {data.isUserX && (
                        <ADUserAvatar src={userAvatar} alt="User Avatar" />
                      )}
                    </Box>
                  </ListItem>
                ))}

                {isTyping && (
                  <ListItem sx={{ width: "95px" }} key={refresh++}>
                    <ListItemText
                      sx={{
                        backgroundColor: false
                          ? `${Colors.primary}`
                          : `${Colors.white_1}`,
                        borderRadius: false
                          ? "15px 15px 0px 15px"
                          : "15px 15px 15px 0px",
                        padding: "12px 16px",
                      }}
                      primary={<BouncingDotsLoader />}
                    />
                  </ListItem>
                )}
              </List>
            </ADChatBox>
          )}
          <ADChatMsgArea elevation={3}>
            <ADChatInput>
              <TextField
                id="m-chat-input"
                fullWidth
                variant="outlined"
                placeholder="CURA"
                value={message}
                onChange={handleInputChange}
                onKeyUp={(e) => {
                  if (e.keyCode === 13) {
                    sendMessage(e.target.value, true);
                    clearMessage();
                    e.target.focus();
                  } else null;
                }}
                sx={{
                  "& input": {
                    fontSize: "18px",
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "24px",
                    backgroundColor: `${Colors.white}`,
                  },
                }}
              />
              {someMessage && (
                <ADSendBtn
                  id="mx-send-btn"
                  onClick={() => {
                    if (message.trim() != "") {
                      sendMessage(message, true);
                    }
                    refresh++;
                  }}
                >
                  <SendIcon sx={{ color: `${Colors.white}` }} />
                </ADSendBtn>
              )}
              {!someMessage && (
                <>
                  {isDisabled ? (
                    <ADBtnDisabled onClick={handleClick}>
                      <MicOffOutlinedIcon sx={{ color: `${Colors.white}` }} />
                    </ADBtnDisabled>
                  ) : (
                    <ADSendBtn
                      onClick={handleClick}
                      disabled={isDisabled}
                      className={isClicked ? "listening" : ""}
                    >
                      <KeyboardVoiceOutlinedIcon
                        sx={{ color: `${Colors.white}` }}
                      />
                    </ADSendBtn>
                  )}
                </>
              )}
            </ADChatInput>

            {/* //Dialog for mic */}
            <Dialog
              fullScreen
              open={micModal}
              //onClose={handleClick}
              TransitionComponent={Transition}
            >
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => {
                  setMicModal(false);
                  setTimeout(() => {
                    handleClick(true);
                  }, 300);
                }}
                aria-label="close"
                sx={{
                  position: "fixed",
                  right: "30px",
                  top: "20px",
                  border: `1px solid ${Colors.black}`,
                  padding: "3px",
                  color: Colors.black,
                  backgroundColor: Colors.white,
                  zIndex: "9",
                }}
              >
                <CloseIcon />
              </IconButton>
              <Container>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh", // comment on PROD_BUILD_3
                    flexDirection: "column",
                  }}
                >
                  {/* PROD_BUILD_3 <ADChatTsContainer>
                    <List>
                      {testMessages.map((msg, index) => (
                        <ListItem
                          key={index}
                          sx={{
                            justifyContent:
                              msg.sender === "user" ? "flex-end" : "flex-start",
                          }}
                        >
                          <ListItemText
                            primary={msg.text}
                            sx={{
                              maxWidth: "80%",
                              backgroundColor:
                                msg.sender === "user" ? "#ddd" : "transparent",
                              color: msg.sender === "user" ? "#000" : "#000",
                              borderRadius: 5,
                              padding: "10px",
                              "& span": {
                                fontSize: "16px",
                              },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </ADChatTsContainer> */}
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
              </Container>
            </Dialog>
            {/* // */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                [theme.breakpoints.down("lg")]: {
                  alignItems: "flex-start",
                },
              }}
            >
              <Stack flexDirection={"row"}>
                {/* <IconButton
                  component="label"
                  onClick={() => {
                    showForm("<<UPLOAD_FORM>>");
                  }}
                >
                  <AttachFileIcon />
                </IconButton> */}
                <Box sx={helpBtn}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      showForm("<<SEARCH_FORM>>");
                    }}
                    sx={helpBtnStyle}
                  >
                    <img
                      src={doctorIcon}
                      alt="doctor"
                      style={{
                        width: "20px",
                        marginRight: "10px",
                        // filter: "drop-shadow(0px 100px 0 #0399e3)",
                        // transform: "translateY(-100px)",
                      }}
                    />
                    {t("home.doctor")}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      showForm("<<LAB_BLOCK>>");
                    }}
                    sx={helpBtnStyle}
                  >
                    <img
                      src={testTubeIcon}
                      alt="doctor"
                      style={{
                        width: "20px",
                        marginRight: "10px",
                        // filter: "drop-shadow(0px 100px 0 #0399e3)",
                        // transform: "translateY(-100px)",
                      }}
                    />
                    {t("home.explainResult")}
                  </Button>
                  {/* <FileUploader
                    icon={true}
                    icon_type="base"
                    onFileSelect={onFileSelect}
                    fieldName={"input_file"}
                  /> */}
                  <Button
                    variant="outlined"
                    startIcon={<SecurityOutlinedIcon />}
                    onClick={() => {
                      showForm("<<INSURANCE_BLOCK>>");
                    }}
                    sx={helpBtnStyle}
                  >
                    {t("home.insQue")}
                  </Button>
                  {/* <Button
                    size="small"
                    variant="outlined"
                    startIcon={<HelpOutlineOutlinedIcon />}
                    sx={helpBtnStyle}
                  >
                    {t("home.genHelp")}
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AddOutlinedIcon />}
                    sx={helpBtnStyle}
                  >
                    {t("home.more")}
                  </Button> */}
                </Box>
                <Box sx={helpIcon}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      showForm("<<SEARCH_FORM>>");
                    }}
                    sx={helpBtnStyle}
                  >
                    <img
                      src={doctorIcon}
                      alt="doctor"
                      style={{
                        width: "20px",
                        marginRight: "4px",
                        filter: "drop-shadow(0px 100px 0 #0399e3)",
                        transform: "translateY(-100px)",
                      }}
                    />
                    {t("home.doc1")}
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      showForm("<<LAB_BLOCK>>");
                    }}
                    sx={helpBtnStyle}
                  >
                    <img
                      src={testTubeIcon}
                      alt="doctor"
                      style={{
                        width: "20px",
                        marginRight: "4px",
                        filter: "drop-shadow(0px 100px 0 #0399e3)",
                        transform: "translateY(-100px)",
                      }}
                    />
                    {t("home.test")}
                  </Button>
                  {/* <FileUploader
                    icon={true}
                    icon_type="base"
                    onFileSelect={onFileSelect}
                    fieldName={"input_file"}
                  /> */}
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<SecurityOutlinedIcon />}
                    onClick={() => {
                      showForm("<<INSURANCE_BLOCK>>");
                    }}
                    sx={helpBtnStyle}
                  >
                    {t("home.ins1")}
                  </Button>
                  {/* <Tooltip title={t("home.doctor")} arrow>
                    <IconButton
                      component="label"
                      onClick={() => {
                        showForm("<<SEARCH_FORM>>");
                      }}
                      sx={{ overflow: "hidden" }}
                    >
                      <img
                        src={doctorIcon}
                        alt="doctor"
                        style={{
                          filter: "drop-shadow(0px 100px 0 #0399e3)",
                          transform: "translateY(-100px)",
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t("home.explainResult")} arrow>
                    <IconButton sx={{ p: 0 }}>
                      <FileUploader
                        icon={true}
                        icon_type="base"
                        onFileSelect={onFileSelect}
                        fieldName={"input_file"}
                      />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title={t("home.insQue")} arrow>
                    <IconButton
                      component="label"
                      onClick={() => {
                        showForm("<<INSURANCE_BLOCK>>");
                      }}
                    >
                      <SecurityOutlinedIcon sx={{ color: Colors.primary }} />
                    </IconButton>
                  </Tooltip> */}
                  {/* <Tooltip title={t("home.genHelp")} arrow>
                    <IconButton component="label">
                      <HelpOutlineOutlinedIcon sx={{ color: Colors.primary }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t("home.more")} arrow>
                    <IconButton component="label">
                      <AddOutlinedIcon sx={{ color: Colors.primary }} />
                    </IconButton>
                  </Tooltip> */}
                </Box>
              </Stack>
              <Stack>
                <Button
                  variant="outlined"
                  startIcon={<ReviewsOutlinedIcon />}
                  onClick={() => {
                    showForm("<<FEEDBACK_FORM>>");
                  }}
                  sx={feedbackLg}
                >
                  {t("home.feedback")}
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<ReviewsOutlinedIcon />}
                  onClick={() => {
                    showForm("<<FEEDBACK_FORM>>");
                  }}
                  sx={feedbackSm}
                >
                  {t("home.feedback")}
                </Button>
              </Stack>
            </Box>
          </ADChatMsgArea>
          <UnlockProDialog />
        </Container>
      </Slide>
    </Box>
  );
};

export default ChatModule;
