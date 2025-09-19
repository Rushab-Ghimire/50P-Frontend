import { Colors } from "@app/modules/AskDaysi/theme/colors";
import { Box, styled, Typography } from "@mui/material";

export const PAvatar = styled("img")(({ src }) => ({
  src: `url(${src})`,
  height: "150px",
  width: "150px",
  marginBottom: "20px",
  borderRadius: "5px",
}));

export const PName = styled(Typography)(() => ({
  fontSize: "24px",
  marginBottom: "2px",
  fontWeight: "600",
  color: Colors.black,
}));

export const PDetail = styled(Typography)(() => ({
  fontSize: "18px",
  marginBottom: "7px",
}));

export const PBtnContainer = styled(Box)(() => ({
  display: "flex",
  gap: "10px",
  marginTop: "20px",
}));
