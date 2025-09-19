import { Colors } from "@app/_themes/TileFlex";
import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export const ModuleCardContainer = styled(Box)(() => ({
  boxShadow: "0 0.5rem 1.25rem rgba(115, 82, 199, 0.175)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  borderRadius: "5px",
  position: "relative",
}));

export const ModuleCardTitle = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: "400",
  margin: "15px 0 0 0",
}));

export const CircularProgressLoader = styled(CircularProgress)(() => ({
  color: Colors.dark_blue,
}));
