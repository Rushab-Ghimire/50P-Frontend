import { Box, InputLabel, styled, TextField } from "@mui/material";

export const SetRows = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  width: "100%",
  marginBottom: "25px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

export const SetLabel = styled(InputLabel)(() => ({}));

export const SetField = styled(TextField)(() => ({}));
