import {
  React,
  useState,
  useEffect,
  forwardRef,
  useCallback,
  createElement,
  useImperativeHandle,
  useRef,
  useMemo,
  PureComponent,
} from "react";
import ReactDOM from "react-dom";
import { BouncingDotsLoader } from "@app/_components/apps/common_components";
import { Div } from "@jumbo/shared";
import {
  ChatContainer,
  ChatHeader,
  ChatHeaderTitle,
  ChatMsg,
  ChatMsgBtnContainer,
  ChatMsgBtn,
  ChatMsgContainer,
  ChatMsgTextAreaUI,
  ChatMsgUser,
  ChatMsgUserText,
  ChatMsgUserTime,
  ChatContextCard,
  ChatMsgTextAreaContainer,
  ChatContextCardItem,
  ChatHeaderCol,
  ChatHeaderLogo,
  ChatInputs,
  ChatInputsList,
  ChatInputListAnchor,
} from "@app/_styles/ChatWindow";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CloseFullscreenOutlinedIcon from "@mui/icons-material/CloseFullscreenOutlined";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import ChatWindowLogo from "/assets/images/chat-window-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import SendIcon from "@mui/icons-material/Send";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import {
  getContextCardChildren,
  createMessage,
  getContextCardByKey,
  getReplyToUser,
} from "./Documents";
import {
  queryClient,
  log,
  sweetAlerts,
  gqlQuery,
  gqlMutate,
} from "@app/_utilities/http.js";
import { initiateVoiceMode, modeActivated } from "@app/_utilities/voice.js";

import { useQuery, useMutation } from "react-query";
import { getCustomDateTime } from "@app/_utilities/helpers";
import Masonry from "@mui/lab/Masonry";
import {
  TextIndicator,
  TFAReply,
} from "@app/_components/apps/common_components";
import { GLOBAL } from "@app/_utilities/globals";

import MicNoneIcon from "@mui/icons-material/MicNone";
import AttachFileIcon from "@mui/icons-material/AttachFile";

var children = [];
var uiData = {
  fetchCard: false,
  context: "root",
  fetchReply: false,
  currentMessage: "",
  addedMessage: "",
  //showTyping: false,
};

function setUIData(o) {
  uiData = {
    ...uiData,
    ...o,
  };
  //console.log("uiData", uiData);
}

const AskDaysiChatWindow = (props, ref) => {
  //console.log("GLOBAL", GLOBAL);
  //const [children, setChildren] = useState([]);

  // const [uiData, setUIData] = useState({
  //   fetchCard: false,
  //   context: "root",
  //   fetchReply: false,
  //   currentMessage: "",
  //   showTyping: false,
  // });
  const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();

  const refMessages = useRef();
  const refTB = useRef();

  const setTyping = useCallback((typingStatus) => {
    // setUIData((prev) => {
    //   return {
    //     ...prev,
    //     showTyping: typingStatus,
    //   };
    // });
    uiData = {
      ...uiData, //showTyping: typingStatus
    };
    //setRefresh((prev) => prev + 1);
  });

  const [businessData, setBusinessData] = useState(undefined);
  const loadUserSession = useCallback(() => {
    setBusinessData((p) =>
      GLOBAL.userDetail.organizations
        ? GLOBAL.userDetail.organizations[0].organization
        : undefined
    );

    if (GLOBAL.userDetail?.organizations === undefined) {
      setTimeout(() => {
        loadUserSession();
      }, 500);
    }
  });

  useEffect(() => {
    sendIntro();
    loadUserSession();
  }, []);

  const doCommand = useCallback((c) => {
    if (c["context"].includes("ROUTE:")) {
      navigate(`${c["context"].replace("ROUTE:", "/")}`);
    }
    if (c["context"].includes("PROCESS:")) {
      initiateProcess(`${c["context"].replace("PROCESS:", "")}`);
    }
    cardClicked(c);
  });

  const initiateProcess = useCallback((ProcessKey) => {
    //if (ProcessKey == "tax-filing" || ProcessKey == "tips")
    {
      sendMessage(ProcessKey);
    }
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: (e) => {
      // setUIData((prev) => {
      //   return { ...prev, fetchCard: true };
      // });
      uiData = { ...uiData, fetchCard: true };
    },
  });

  const postTFAMessage = useCallback((message) => {
    var idx = uuid();
    children.push(
      <ChatItem
        key={idx}
        setTyping={setTyping}
        item={{
          id: idx,
          isBot: false,
          sender: "DaysiAI",
          cards: [],
          message: message == "..." ? <BouncingDotsLoader /> : message,
        }}
        onCardClick={cardClicked}
        doCommand={doCommand}
      />
    );
    setRefresh((prev) => prev + 1);
    setTimeout(() => {
      refMessages.current.scrollTop = refMessages.current?.scrollHeight;
    }, 300);

    if (message == "...") {
      loopForVoiceMode(idx);
    }
  });

  const loopForVoiceMode = useCallback((idx) => {
    setTimeout(() => {
      if (modeActivated()) {
        document.getElementById(`message-${idx}`).innerHTML = "Talk Now...";
      } else {
        loopForVoiceMode(idx);
      }
    }, 500);
  });

  window.sendVoiceCommand = useCallback((v_message) => {
    sendMessage(v_message);
  });

  const addChatToUI = useCallback((data) => {
    //console.log("---", uiData["currentMessage"], uiData["addedMessage"]);
    if (
      uiData["currentMessage"] != "" &&
      uiData["currentMessage"] == uiData["addedMessage"]
    ) {
      return;
    }
    //console.log("addChatToUI");
    var message =
      data["rows"][0]["context"] == "root"
        ? data["rows"][0]["description"]
        : uiData["currentMessage"];
    uiData = {
      ...uiData,
      addedMessage: message,
    };

    var idx = uuid();
    children.push(
      <ChatItem
        key={idx}
        setTyping={setTyping}
        item={{
          id: idx,
          isBot: data["rows"][0]["context"] == "root" ? false : true,
          sender: "CURA",
          cards: data["rows"][0]["context"] == "root" ? [] : data["rows"],
          message: message,
        }}
        onCardClick={cardClicked}
        doCommand={doCommand}
      />
    );
    setTimeout(() => {
      refMessages.current.scrollTop = refMessages.current?.scrollHeight;
    }, 300);
  });

  function sendIntro() {
    // setUIData((prev) => {
    //   return { ...prev, fetchCard: true, context: "root" };
    // });
    uiData = { ...uiData, fetchCard: true, context: "root" };
    //setRefresh((prev) => prev + 1);
  }

  const cardClicked = useCallback(
    (card) => {
      // setUIData((prev) => {
      //   return {
      //     ...prev,
      //     fetchReply: false,
      //     fetchCard: true,
      //     context: card["id"],
      //     currentMessage: card["description"],
      //   };
      // });
      uiData = {
        ...uiData,
        fetchReply: false,
        fetchCard: true,
        context: card["id"],
        currentMessage: card["description"],
      };
      setRefresh((prev) => prev + 1);
    },
    [uiData]
  );

  const useDataQuery = () => {
    //console.log("querying...", uiData["fetchReply"]);
    return useQuery({
      queryKey: [
        "message",
        {
          gql: uiData["fetchReply"]
            ? getReplyToUser(uiData["currentMessage"])
            : uiData["context"] == "root"
              ? getContextCardByKey(uiData["context"], businessData?.id)
              : getContextCardChildren(
                  Number(uiData["context"]),
                  0,
                  false,
                  businessData?.id
                ),
        },
      ],
      queryFn: ({ signal, queryKey }) =>
        gqlQuery({ signal, path: "/graphql", inData: queryKey[1] }),
    });
  };

  const {
    data,
    isLoading,
    isError: isErrorCard,
    error: errorCard,
  } = useDataQuery();

  if (uiData["fetchCard"]) {
    if (data) {
      if (data["totalCount"] > 0) {
        if (data["rows"][0]["context"] == "root") {
          // setUIData((prev) => {
          //   return {
          //     ...prev,
          //     fetchCard: true,
          //     context: data["rows"][0]["id"],
          //   };
          // });
          uiData = {
            ...uiData,
            fetchCard: true,
            context: data["rows"][0]["id"],
          };
        } else {
          // setUIData((prev) => {
          //   return {
          //     ...prev,
          //     fetchCard: false,
          //   };
          // });
          uiData = {
            ...uiData,
            fetchCard: false,
          };
        }

        if (refresh <= 1) {
          setRefresh((prev) => prev + 1);
        }
        addChatToUI(data);
      }

      // setUIData((prev) => {
      //   return {
      //     ...prev,
      //     fetchReply: false,
      //   };
      // });
      uiData = {
        ...uiData,
        fetchReply: false,
      };
    }
  }

  function sendMessage(inputValue) {
    //console.log("sendMessage", inputValue);

    if (inputValue.trim().length <= 0) return;

    if (inputValue.trim().toLowerCase() == "openai on") {
      GLOBAL["openai"] = true;
    }
    if (inputValue.trim().toLowerCase() == "openai off") {
      GLOBAL["openai"] = false;
    }

    mutate({
      inData: {
        gql: createMessage({
          message: inputValue.trim(),
        }),
      },
      path: "/graphql",
    });

    children.push(
      <ChatItem
        key={uuid()}
        setTyping={setTyping}
        item={{
          id: uuid(),
          sender: "You",
          cards: [],
          message: inputValue,
          isBot: false,
        }}
        onCardClick={cardClicked}
        doCommand={doCommand}
      />
    );

    setTimeout(() => {
      refMessages.current.scrollTop = refMessages.current?.scrollHeight;
    }, 300);
    /*setUIData((prev) => {
      return {
        ...prev,
        fetchReply: true,
      };
    });*/

    // setUIData((prev) => {
    //   return {
    //     ...prev,
    //     currentMessage: inputValue.trim(),
    //     fetchReply: true,
    //     showTyping: true,
    //   };
    // });
    uiData = {
      ...uiData,
      currentMessage: inputValue.trim(),
      fetchReply: true,
      fetchCard: true,
      //showTyping: true,
    };
    //console.log("uiData[fetchReply]", uiData["fetchReply"]);

    //setRefresh((refresh) => refresh + 1);
    //console.log("refresh", refresh);
  }

  return (
    <ChatContainer>
      <ChatHeader sx={{ padding: "16px 20px" }}>
        <ChatHeaderTitle variant="h3" sx={{ fontSize: "18px" }}>
          CURA
          {/* <ChatHeaderLogo src={ChatWindowLogo} alt="TileFlexAI Logo" /> */}
        </ChatHeaderTitle>
      </ChatHeader>
      <ChatMsgContainer ref={refMessages}>{children}</ChatMsgContainer>
      <ChatMsgTextAreaContainer>
        {/* {uiData["showTyping"] && (
          <TextIndicator label="TileFlexAI is Typing..." />
        )} */}
        <ChatMsgTextAreaUI ref={refTB} onEnter={sendMessage} />
        <Div sx={{ textAlign: "right" }}>Press Enter to Send</Div>
      </ChatMsgTextAreaContainer>

      <ChatMsgBtnContainer>
        <Stack>
          <ChatInputs>
            <ChatInputsList>
              <ChatInputListAnchor
                onClick={() => {
                  postTFAMessage("...");
                  initiateVoiceMode();
                }}
                component="a"
                href="#"
              >
                <MicNoneIcon />
              </ChatInputListAnchor>
            </ChatInputsList>
            <ChatInputsList>
              <ChatInputListAnchor component="a" href="#">
                <AttachFileIcon />
              </ChatInputListAnchor>
            </ChatInputsList>
          </ChatInputs>
        </Stack>
        <Stack>
          {
            <ChatMsgBtn
              onClick={() => {
                sendMessage(GLOBAL.current_message);
                refTB.current.clear();
              }}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Send
            </ChatMsgBtn>
          }
        </Stack>
      </ChatMsgBtnContainer>
    </ChatContainer>
  );
};

export function ChatItem({ item, onCardClick, setTyping, doCommand }) {
  return (
    <ChatMsg>
      <ChatMsgUser sx={{ float: "left" }}>{item["sender"]}: </ChatMsgUser>
      {!item["isBot"] && (
        <ChatMsgUserText id={"message-" + item["id"]}>
          {item["message"]}
        </ChatMsgUserText>
      )}
      {GLOBAL["openai"] && item["isBot"] && item["message"].trim() !== "" && (
        <TFAReply setTyping={setTyping} messageIn={item["message"]}></TFAReply>
      )}
      {item["cards"] && (
        <ChatContextCard key={uuid()}>
          <Masonry columns={{ xs: 2, sm: 3 }} spacing={1}>
            {item["cards"].map((item) => {
              return (
                <ChatContextCardItem
                  key={uuid()}
                  onClick={() => {
                    doCommand(item);
                  }}
                  variant="outlined"
                  size="medium"
                  sx={{ width: "100%", display: "block" }}
                >
                  {item["title"]}
                </ChatContextCardItem>
              );
            })}
          </Masonry>
        </ChatContextCard>
      )}
      <ChatMsgUserTime>
        <AccessTimeOutlinedIcon
          sx={{
            fontSize: "16px",
            position: "relative",
            top: "2px",
            marginRight: "2px",
          }}
        />
        {getCustomDateTime(0, "days", "HH:mm A")}
      </ChatMsgUserTime>
    </ChatMsg>
  );
}

export default AskDaysiChatWindow;
