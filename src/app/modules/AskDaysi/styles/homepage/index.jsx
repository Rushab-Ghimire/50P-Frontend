import { Box, Button, styled } from "@mui/material";
import { Colors } from "../../theme/colors";

export const ADContentWrapper = styled(Box)(() => ({
  display: "flex",
  // height: "85vh",
  height: "calc(100vh - 80px )",
  justifyContent: "center",
  alignItems: "center",
  // background:
  //   "linear-gradient(0deg, rgba(255, 255, 255, 1), rgba(0, 0, 0, 0.5))",
}));

export const ADDaysi = styled("img")(({ src }) => ({
  src: `url(${src})`,
  width: "100px",
  marginBottom: "30px",
  // borderRadius: "50%",
}));

export const ADBtn = styled(Button)(() => ({
  borderRadius: "30px !important",
  fontWeight: "600",
  backgroundImage: `linear-gradient(to right, ${Colors.primary}, ${Colors.secondary})`,
  color: "transparent",
  backgroundClip: "text",
  borderColor: "#c96ee2",
  borderWidth: "3px",
  fontSize: "28px",
  "&:hover": {
    borderWidth: "3px",
  },
}));
