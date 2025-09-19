import { Colors } from "@app/_themes/TileFlex";
import { Box, Paper, Stack, styled } from "@mui/material";

export const CBHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "20px",
  borderBottom: `1px solid ${Colors.light_gray}`,
});

export const CBChatContainer = styled(Paper)(({ theme }) => ({
  height: "80vh",
  display: "flex",
  flexDirection: "column",
  borderRadius: 16,
  overflow: "hidden",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
}));

export const CBMessagesContainer = styled(Box)({
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
    background: Colors.dark_gray,
    borderRadius: "3px",
  },
});

export const CBMessageBubble = styled(Box)(({ isUserX }) => ({
  display: "flex",
  alignItems: "flex-start",
  marginBottom: "16px",
  flexDirection: isUserX ? "row-reverse" : "row",
}));

export const CBMessageContent = styled(Paper)(({ isUserX, theme }) => ({
  padding: "12px 16px",
  borderRadius: isUserX ? "15px 15px 0 15px" : "15px 15px 15px 0",
  width: "80%",
  backgroundColor: isUserX ? Colors.dark_blue : Colors.white_2,
  color: isUserX ? Colors.white : Colors.black,
  transition: "all 0.2s ease-in-out",
  // "&:hover": {
  //   transform: "scale(1.02)",
  // },
  [theme.breakpoints.down("sm")]: {
    width: "95%",
  },
}));

export const CBInputContainer = styled(Box)({
  padding: "20px",
  borderTop: `1px solid ${Colors.light_gray}`,
  position: "relative",
});

export const CBHeaderLogo = styled("img")(({ src, theme }) => ({
  src: `url(${src})`,
  height: "20px",
  [theme.breakpoints.down("sm")]: {
    height: "24px",
  },
}));

export const CBFormWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
  },
}));

// ({ theme }({
//     display: "flex",
//     gap: "20px",
//   }));

export const CBFormCol = styled(Stack)(({ theme }) => ({
  width: "50%",
  [theme.breakpoints.down("lg")]: {
    width: "100%",
  },
}));
