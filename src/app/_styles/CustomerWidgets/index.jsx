import { Colors } from "@app/_themes/TileFlex";
import { Box, styled, ToggleButton, Typography } from "@mui/material";

export const CWAvatar = styled("img")(({ src }) => ({
  src: `url(${src})`,
  height: "150px",
  width: "150px",
  marginBottom: "20px",
}));

export const CWName = styled(Typography)(() => ({
  fontSize: "24px",
  marginBottom: "2px",
  fontWeight: "600",
  color: Colors.black,
}));

export const CWDetail = styled(Typography)(() => ({
  fontSize: "18px",
  marginBottom: "7px",
}));

export const CWNotification = styled(Box)(() => ({
  borderBottom: "1px solid #ccc",
  padding: "10px 0",
  "&:first-of-type": {
    paddingTop: 0,
  },
  "&:last-of-type": {
    borderBottom: "none",
  },
}));

export const CWTgBtn = styled(ToggleButton)(() => ({
  justifyContent: "flex-start",
  border: "none",
  textTransform: "capitalize",
  fontSize: "18px",
  fontWeight: "400",
  padding: "3px 5px",
  cursor: "pointer",
  color: Colors.black,
}));
