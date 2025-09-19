import { Box, Container, styled } from "@mui/material";
import { Colors } from "../../theme/colors";

export const ADLpWrapper = styled(Container)(() => ({
  padding: "0 !important",
}));

export const ADLpHeader = styled(Box)(() => ({
  background: `${Colors.white}`,
  borderBottom: `1px solid ${Colors.gray}`,
  textAlign: "center",
  padding: "16px 0",
}));

export const ADLpContnetWrapper = styled(Container)(() => ({
  height: "calc(100vh - 80px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));
