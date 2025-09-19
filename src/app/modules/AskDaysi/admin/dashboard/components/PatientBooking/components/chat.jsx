import React, { useCallback, useRef, useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  Avatar,
  Stack,
  Container,
  Button,
} from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import headerLogo from "/assets/images/logo-bot-header.png";
import headerLogoMedical from "/assets/images/ask-daisy.png";
import {
  getCustomDateTime,
  getFormattedDate,
  getRoles,
} from "@app/_utilities/helpers";
import { v4 as uuid } from "uuid";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import {
  addUserChatHistory,
  getUserChatHistory,
  updateBookingStatus,
  notifyIsTypingGQL,
} from "./Document";
import { gqlMutate, gqlQuery, postToBot } from "@app/_utilities/http";
import { BouncingDotsLoader } from "@app/_components/apps";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { JumboForm, JumboInput } from "@jumbo/vendors/react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import PhoneInput from "react-phone-input-2";
import Slide from "@mui/material/Slide";
import { PickersInputBaseSectionsContainer } from "@mui/x-date-pickers/PickersTextField/PickersInputBase/PickersInputBase";
import * as Yup from "yup";
import { BOT_ROUTER_URL } from "@app/_utilities/constants/paths-env";
// import EHRForm from "../../agent-components/eHRForm";
import SearchForm from "@app/modules/agent-components/SearchForm";
import { FileUploader } from "@app/modules/agent-components/FileUploader";
import {
  CUInputContainer,
  CUMessageBubble,
  CUMessageContent,
  CUMessagesContainer,
  UCAvatar,
  UChatContainer,
  UCHeader,
} from "@app/modules/AskDaysi/styles/chat";

import patientAvatar from "/assets/images/askdaysi/chat/patient-avatar.png";
import doctorAvatar from "/assets/images/askdaysi/chat/doctor-avatar.png";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import { subscribeToEvent, unsubscribeEvent } from "@app/_utilities/http.js";
import { GLOBAL } from "@app/_utilities/globals";

const mb = {
  marginBottom: "25px",
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

var destination_user_id = -1;
var broadcastIsTyping = true;
var thisUserRole = "patient";
const UserChat = ({ bookingDetail }) => {
  const [message, setMessage] = useState("");
  const [mChain, setMChain] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const refMessages = useRef();
  const { isAuthenticated, userDetail } = useAuth();

  const [open, setOpen] = useState(false);

  //console.log("UserChat bookingDetail", bookingDetail);

  React.useEffect(() => {
    subscribeToEvent("NEW_NOTIFICATION", newMessageEvent);
    if (getRoles(GLOBAL.userDetail.organizations).includes("patient")) {
      thisUserRole = "patient";
    } else {
      thisUserRole = "doctor";
    }
  }, []);
  const newMessageEvent = React.useCallback((dataIn) => {
    //console.log("dataIn - ", dataIn);
    if (dataIn.event_type == "POSTED_MESSAGE") {
      //console.log("dataIn", dataIn.booking_id, dataIn.receiver_id);
      if (
        dataIn.booking_id == bookingDetail.id &&
        dataIn.receiver_id == userDetail.id
      ) {
        sendMessage(dataIn.message, false, false);
        setRefresh(refresh + 1);
      }
    } else if (dataIn.event_type == "IS_TYPING") {
      //console.log("dataIn", dataIn.booking_id, dataIn.receiver_id);
      if (
        dataIn.booking_id == bookingDetail.id &&
        dataIn.receiver_id == userDetail.id
      ) {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    }
  }, []);

  const notifyIsTyping = useCallback(() => {
    if (!broadcastIsTyping) {
      return;
    }

    if (userDetail.id == bookingDetail.providerUserId) {
      destination_user_id = bookingDetail.user.id;
    }
    if (userDetail.id == bookingDetail.user.id) {
      destination_user_id = bookingDetail.providerUserId;
    }
    broadcastIsTyping = false;
    setTimeout(() => {
      broadcastIsTyping = true;
    }, 8000);
    mutate({
      inData: { gql: notifyIsTypingGQL(bookingDetail.id, destination_user_id) },
      path: "/graphql",
      onSuccess: (dx) => {},
    });
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  //console.log("bookingDetail", bookingDetail, userDetail);

  const addChat = useCallback((content) => {
    if (!isAuthenticated) {
      return;
    }

    if (content.trim() == "") {
      return;
    }

    var s = {};

    if (userDetail.id == bookingDetail.providerUserId) {
      s = {
        content: content,
        destination_user_id: bookingDetail.user.id,
        destination_user_lang: bookingDetail.userDefaultLang,
        booking_id: bookingDetail.id,
      };
    }
    if (userDetail.id == bookingDetail.user.id) {
      s = {
        content: content,
        destination_user_id: bookingDetail.providerUserId,
        destination_user_lang: bookingDetail.providerDefaultLang,
        booking_id: bookingDetail.id,
      };
    }

    //console.log("sssss", s, bookingDetail);

    if (Object.keys(s).length <= 0) {
      return;
    }

    mutate({
      inData: { gql: addUserChatHistory(s) },
      path: "/graphql",
      onSuccess: (dx) => {},
    });
  });

  const [history, setHistory] = useState(true);
  const {
    data,
    isLoading,
    isError: isErrorHistory,
    error: errorHistory,
  } = useQuery({
    queryKey: [
      "user_chat_history",
      { gql: getUserChatHistory(bookingDetail.id) },
    ],
    onSuccess: (dx) => {
      renderChatHistory(dx.rows);
      setHistory(false);
    },
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData: history ? queryKey[1] : -1,
      }),
  });

  const renderChatHistory = (pChats) => {
    if (pChats === undefined || pChats.length <= 0) {
      return;
    }
    pChats.map((item) => {
      item.content = formatProper(item.content);
      if (userDetail.id == item.user.id) {
        sendMessage(item.content, true, false);
      }
      if (userDetail.id == item.destinationUser.id) {
        sendMessage(item.contentDestination, false, false);
      }
      //console.log(userDetail.id, item);
    });
  };

  const sendMessage = (m, isUser = true, keepHistory = true) => {
    setMChain((prev) => {
      prev.push({
        id: uuid(),
        text: m,
        isUserX: isUser,
        timestamp: getCustomDateTime(0, "days", "HH:mm A"),
        actions: [],
      });
      return prev;
    });

    setTimeout(() => {
      setTimeout(() => {
        if (refMessages.current == null || refMessages.current == undefined) {
          return;
        }
        refMessages.current.scrollTop = refMessages.current?.scrollHeight;
      }, 500);
    }, 100);

    if (keepHistory) {
      addChat(m);
    }

    clearMessage();
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: gqlMutate,
  });

  const clearMessage = () => {
    setMessage("");
  };
  const handleOnChange = () => {};

  const formatProper = (m, first_response = false) => {
    if (first_response) {
      m = m.replace(["\n", "\r"], "");
    } else {
      m = m.replace(/\n/g, "<br/>");
    }
    m = m.replace(/<<.*>>/, "");
    return `${m}`;
  };

  return (
    <Container maxWidth="lg" sx={{ padding: 0 }}>
      <UChatContainer>
        <UCHeader>
          <Typography variant={"h3"} mb={0} fontWeight={"500"}>
            Chat With {thisUserRole == "patient" ? "Doctor" : "Patient"}
          </Typography>
        </UCHeader>
        <CUMessagesContainer ref={refMessages}>
          {/* <EHRForm sendToRouter={sendToRouter} /> */}
          {mChain.map((data, index) => (
            <CUMessageBubble key={data.id} isUserX={data.isUserX}>
              {data.isUserX ? (
                <UCAvatar
                  src={patientAvatar}
                  alt="User Avatar"
                  sx={{ ml: 1 }}
                />
              ) : (
                <UCAvatar
                  src={doctorAvatar}
                  alt="Doctor Avatar"
                  sx={{ mr: 1 }}
                />
              )}
              <CUMessageContent isUserX={data.isUserX}>
                <Typography
                  variant="body1"
                  dangerouslySetInnerHTML={{ __html: data.text }}
                  sx={{ fontSize: "16px" }}
                />

                {/* <Typography
                  variant="caption"
                  sx={{ opacity: 0.7, mt: 0.5, display: "block" }}
                >
                  {data.timestamp}
                </Typography> */}
              </CUMessageContent>
            </CUMessageBubble>
          ))}
          {isTyping && (
            <CUMessageBubble key={refresh} isUserX={false}>
              <CUMessageContent sx={{ width: "auto" }} isUserX={false}>
                <BouncingDotsLoader />
              </CUMessageContent>
            </CUMessageBubble>
          )}
        </CUMessagesContainer>
        <CUInputContainer>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ paddingBottom: "20px" }}
          >
            <TextField
              fullWidth
              multiline
              maxRows={4}
              placeholder="Type a message..."
              variant="outlined"
              size="small"
              sx={{ backgroundColor: "#fff" }}
              aria-label="Message input field"
              value={message}
              onChange={handleInputChange}
              onKeyUp={(e) => {
                if (e.keyCode === 13) {
                  sendMessage(formatProper(e.target.value));
                  clearMessage();
                  e.target.focus();
                } else {
                  notifyIsTyping();
                }
              }}
            />
            <IconButton
              color="primary"
              onClick={() => {
                sendMessage(message);
              }}
              aria-label="Send message"
              sx={{
                height: "40px",
                width: "40px",
                backgroundColor: "#268ccc",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#58cced",
                },
              }}
            >
              <SendOutlinedIcon />
            </IconButton>
          </Stack>
        </CUInputContainer>
      </UChatContainer>
    </Container>
  );
};

export default UserChat;
