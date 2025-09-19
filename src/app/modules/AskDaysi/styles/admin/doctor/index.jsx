import { Colors } from "@app/modules/AskDaysi/theme/colors";
import { Box, FormLabel, ListItemText, styled } from "@mui/material";

export const DocContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

export const DocPicture = styled("img")((src) => ({
  src: `url(${src})`,
  height: "150px",
  width: "150px",
  borderRadius: "50%",
}));

export const DocBtnContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  marginTop: "20px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

export const DocListItemText = styled(ListItemText)(() => ({
  "& span": {
    fontSize: "18px",
  },
}));

export const DocFormLabel = styled(FormLabel)(() => ({
  fontSize: "18px",
  color: Colors.gray_1,
  display: "block",
}));
