import { Button, styled, Typography } from "@mui/material";

export const TitleText = styled(Typography)(() => ({
  fontSize: "28px",
  fontWeight: "400",
  marginTop: "20px",
}));

export const DescText = styled(Typography)(() => ({
  fontSize: "20px",
  lineHeight: "26px",
  fontWeight: "300",
}));

export const BackToSiteBtn = styled(Button)(() => ({
  marginTop: "25px",
}));
