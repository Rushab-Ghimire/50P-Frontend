import { Colors } from "@app/_themes/TileFlex";
import { Box, styled, Typography } from "@mui/material";

export const BListWrapper = styled(Box)(() => ({
  background: "white",
  xboxShadow: "0 0.5rem 1.25rem rgba(115, 82, 199, 0.175)",
  xborderRadius: "12px",
}));

export const BTHeaderWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  maxWidth: "100%",
  justifyContent: "space-between",
  gap: "20px",
  padding: "20px 0",
}));

export const BList = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  borderTop: "1px solid",
  borderColor: `${Colors.light_gray_2}`,
  // padding: "10px 20px",
  padding: "8px 3px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "10px",
    alignItems: "flex-start",
  },
  "&:hover": {
    backgroundColor: Colors.white_2,
  },
}));

export const BTitle = styled(Typography)(() => ({
  fontSize: "16px",
  margin: 0,
  lineHeight: 1,
}));

export const BFormTitle = styled(Typography)(() => ({
  borderBottom: `1px solid ${Colors.light_gray}`,
  paddingBottom: "5px",
  marginBottom: "25px",
}));
