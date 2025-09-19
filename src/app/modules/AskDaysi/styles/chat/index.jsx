import { ListItem } from "@app/pages/Business/Tile";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { Colors } from "../../theme/colors";

export const ADChatTitle = styled(Typography)(() => ({
  textAlign: "center",
  fontSize: "30px",
  marginBottom: "32px",
}));

export const ADChatBox = styled(Paper)(({ theme }) => ({
  // height: "400px",
  height: "calc(100vh - 300px)",
  overflowY: "auto",
  padding: "16px",
  marginBottom: "16px",
  borderRadius: "12px",
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.down(767)]: {
    // height: "525px",
    // height: "calc(100vh - 380px )", for multiple lines
    height: "calc(100vh - 300px )",
    padding: "16px 10px",
  },
  [theme.breakpoints.down(400)]: {
    // height: "300px",
    height: "calc(100vh - 300px )",
  },
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: Colors.white_1,
  },
  "&::-webkit-scrollbar-thumb": {
    background: Colors.gray_4,
    borderRadius: "3px",
  },
}));

export const ADChatMsgArea = styled(Paper)(() => ({
  // display: "flex",
  alignItems: "center",
  padding: "16px",
  borderRadius: "24px",
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
}));

export const ADIConButton = styled(IconButton)(() => ({
  backgroundColor: `${Colors.primary}`,
  padding: "10px",
  borderRadius: "50%",
  marginTop: "80px",
  cursor: "pointer",
  width: "60px",
  height: "60px",
  margin: "80px auto 0 auto",
}));

export const ADChatInput = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "10px",
  gap: "10px",
}));

export const ADSendBtn = styled(IconButton)(() => ({
  backgroundColor: `${Colors.primary}`,
  height: "40px",
  width: "40px",
  "&:hover": {
    backgroundColor: `${Colors.blue}`,
  },
}));

export const ADBtnDisabled = styled(IconButton)(() => ({
  backgroundColor: `${Colors.gray_2}`,
  height: "40px",
  width: "40px",
  "&:hover": {
    backgroundColor: `${Colors.gray_2}`,
  },
}));

export const ADFloatingBtns = styled(Box)(() => ({
  position: "absolute",
  bottom: "60px",
  right: "20px",
  display: "flex",
}));

export const ADProBlock = styled(Box)(() => ({
  display: "inline-block",
  padding: "40px 40px 20px 40px",
  backgroundColor: `${Colors.white}`,
  position: "relative",
  zIndex: 1,
  textAlign: "center",
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "10px 10px 0 0",
}));

export const ADUserAvatar = styled("img")(({ src, theme }) => ({
  src: `url(${src})`,
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  marginRight: "5px",
  [theme.breakpoints.down("sm")]: {
    width: "34px",
    height: "34px",
  },
}));

//User Chat
export const UCAvatar = styled("img")(({ src }) => ({
  src: `url(${src})`,
  width: "40px",
  borderRadius: "50%",
}));

export const UChatContainer = styled(Paper)(({ theme }) => ({
  height: "85vh",
  display: "flex",
  flexDirection: "column",
  borderRadius: 16,
  overflow: "hidden",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
}));

export const UCHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "20px",
  borderBottom: `1px solid ${Colors.gray}`,
});

export const CUMessagesContainer = styled(Box)({
  flex: 1,
  overflowY: "auto",
  padding: "20px",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: Colors.white_1,
  },
  "&::-webkit-scrollbar-thumb": {
    background: Colors.gray_4,
    borderRadius: "3px",
  },
});

export const CUMessageBubble = styled(Box)(({ isUserX }) => ({
  display: "flex",
  alignItems: "flex-start",
  marginBottom: "16px",
  flexDirection: isUserX ? "row-reverse" : "row",
}));

export const CUMessageContent = styled(Paper)(({ isUserX, theme }) => ({
  padding: "12px 16px",
  borderRadius: isUserX ? "15px 15px 0 15px" : "15px 15px 15px 0",
  //width: "80%",
  backgroundColor: isUserX ? Colors.primary : Colors.white_2,
  color: isUserX ? Colors.white : Colors.black,
  transition: "all 0.2s ease-in-out",
  marginBottom: "8px",
  // "&:hover": {
  //   transform: "scale(1.02)",
  // },
  [theme.breakpoints.down("sm")]: {
    width: "95%",
  },
}));

export const CUInputContainer = styled(Box)({
  padding: "20px",
  borderTop: `1px solid ${Colors.gray_4}`,
  position: "relative",
});

export const ADChatTsContainer = styled(Stack)(() => ({
  width: "100%",
  height: "55vh",
  overflowX: "auto",
  marginBottom: "60px",
  marginTop: "40px",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: Colors.white_1,
  },
  "&::-webkit-scrollbar-thumb": {
    background: Colors.gray_4,
    borderRadius: "3px",
  },
}));
