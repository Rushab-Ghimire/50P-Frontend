import { Box, Container, styled, Typography } from "@mui/material";
import { Colors } from "../../theme/colors";

export const ADFooterWrapper = styled(Container)(({ theme }) => ({
  borderTop: `1px solid ${Colors.gray}`,
  padding: "0 0 10px 0",
  // position: "absolute",
  bottom: "0",
  backgroundColor: Colors.white,
  [theme.breakpoints.down("sm")]: {
    position: "static",
  },
}));

export const ADFooterContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse",
  },
}));

export const ADFooterCopy = styled(Typography)(() => ({
  fontSize: "16px",
  marginTop: "10px",
}));
