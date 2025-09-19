import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import {
  React,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { GLOBAL } from "@app/_utilities/globals";
import { Colors } from "@app/_themes/TileFlex";

export const ChatContainer = styled(Box)(({ theme, size = "normal" }) => ({
  backgroundColor: "rgba(255,255,255)",
  boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 20px 0px",
  borderRadius: "10px 0px 0px 0px",
  width: size == "max" ? "90%" : "450px",
  height: "100vh",
  xmarginRight: "50px",
  xmarginTop: "50px",
  position: "static",
  right: "0px",
  top: "0px",
  zIndex: "9999",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    position: "fixed",
    maxWidth: "94%",
    marginRight: "10px",
    marginLeft: "10px",
    borderRadius: "10px 10px 0 0",
  },
}));

export const ChatHeader = styled(Box)(({ theme }) => ({
  boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 20px 0px",
  padding: "20px",
  borderBottom: "1px solid rgb(222, 226, 230)",
  backgroundColor: Colors.dark_blue,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    borderRadius: "10px 10px 0px 0px",
  },
}));

export const ChatHeaderCol = styled(Stack)(() => ({
  flexDirection: "row",
}));

export const ChatHeaderLogo = styled("img")(({ src }) => ({
  src: `url(${src})`,
  width: "130px",
  display: "block",
}));

export const ChatHeaderTitle = styled(Typography)(() => ({
  fontSize: "24px",
  color: "#fff",
  fontWeight: "600",
  marginBottom: 0,
}));

export const ChatMsgContainer = styled(Box)(({ theme }) => ({
  padding: "20px",
  height: "72vh",
  overflow: "auto",
  [theme.breakpoints.down("xxl")]: {
    // height: "65vh",
    height: "calc(100vh - 262px)",
  },
  [theme.breakpoints.down("lg")]: {
    height: "60vh",
  },
  [theme.breakpoints.down("sm")]: {
    height: "45vh",
  },
}));

export const ChatMsg = styled(Box)(() => ({
  marginBottom: "20px",
}));

export const ChatMsgUser = styled(Typography)(() => ({
  fontSize: "16px",
  display: "inline",
  fontWeight: "600",
}));

export const ChatMsgUserText = styled(Typography)(() => ({
  fontSize: "16px",
  display: "inline",
}));

export const ChatMsgUserTime = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "10px",
}));

export const ChatMsgTextAreaContainer = styled(Box)(() => ({
  padding: "20px",
}));

export const ChatMsgTextArea = styled(TextField)(() => ({
  width: "100%",
}));

export const ChatMsgTextAreaUI = forwardRef((props, ref) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    GLOBAL.current_message = event.target.value;
  };

  const clearMessage = () => {
    setInputValue("");
    GLOBAL.current_message = "";
  };

  useImperativeHandle(ref, () => ({
    clear: () => {
      clearMessage();
    },
  }));

  return (
    <ChatMsgTextArea
      value={inputValue}
      onChange={handleInputChange}
      onKeyUp={(e) => {
        if (e.keyCode === 13) {
          props.onEnter(e.target.value);
          clearMessage();
        } else null;
      }}
      label="Message"
      multiline
      rows={3}
      variant="outlined"
    />
  );
});

export const ChatMsgBtnContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "0 20px",
  // alignItems: "center",
}));

export const ChatMsgBtn = styled(Button)(() => ({
  display: "flex",
  justifyContent: "end",
  backgroundColor: Colors.dark_blue,
  ":hover": {
    backgroundColor: Colors.dark_blue_1,
  },
}));

export const ChatContextCard = styled(Box)(() => ({
  marginTop: "10px",
  /*display: "flex",
  flexDirection: "row",
  gap: "15px",
  width: "auto",
  marginTop: "15px",
  textTransform: "capitalize",
  flexWrap: "wrap",*/
}));

export const ChatContextCardItem = styled(Button)(() => ({
  textTransform: "capitalize",
  padding: "10px",
  lineHeight: "18px",
  color: Colors.dark_blue_1,
  borderColor: Colors.dark_blue_1,
  borderRadius: "30px",
  ":hover": {
    borderColor: Colors.dark_blue_1,
  },
}));

export const ChatInputs = styled(List)(() => ({
  display: "flex",
  justifyContent: "flex-start",
  padding: 0,
}));

export const ChatInputsList = styled(ListItem)(() => ({
  padding: 0,
}));

export const ChatInputListAnchor = styled(ListItemButton)(() => ({
  padding: 0,
}));
