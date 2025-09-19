import { Colors } from "@app/modules/AskDaysi/theme/colors";
import { ListItem, styled, Typography } from "@mui/material";

export const CHTitle = styled(Typography)(() => ({
  fontSize: "18px",
  margin: "0 0 0 32px",
  fontWeight: "500",
}));

export const CHListItem = styled(ListItem)(() => ({
  padding: "0 0 0 32px",
  transition: "background-color 0.3s",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: Colors.gray_3,
  },
  "& span": {
    width: "160px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));
