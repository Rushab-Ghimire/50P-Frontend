import { Colors } from "@app/_themes/TileFlex";
import { Box, Button, IconButton, styled, Typography } from "@mui/material";

export const BATitle = styled(Typography)(() => ({
  fontSize: "28px",
  fontWeight: "500",
}));

export const BAServiceWrapper = styled(Box)(() => ({}));

export const BAServiceTitle = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: "500",
  marginBottom: "20px",
}));

export const BAServiceCard = styled(Box)(() => ({
  border: "1px solid",
  borderColor: Colors.light_gray,
  padding: "20px",
  borderRadius: "15px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "20px",
  "&:hover": {
    backgroundColor: Colors.white_1,
    // cursor: "pointer",
  },
}));

export const BAServiceCardTitle = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: "500",
  marginBottom: "2px",
}));

export const BAServiceCardTime = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "400",
}));

export const BAServiceCardPrice = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "500",
  marginTop: "10px",
}));

export const BASWrapper = styled(Box)(() => ({
  border: "1px solid",
  borderColor: Colors.light_gray,
  padding: "20px",
  borderRadius: "15px",
  marginBottom: "30px",
}));

export const BAProvider = styled(Box)(() => ({
  display: "flex",
  gap: "20px",
  marginBottom: "20px",
}));

export const BAProviderImg = styled("img")(({ src }) => ({
  src: `url(${src})`,
  width: "64px",
  borderRadius: "10px",
}));

export const BAServices = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "15px",
}));

export const BAServicesTitle = styled(Typography)(() => ({
  fontSize: "15px",
  fontWeight: "400",
  marginBottom: "2px",
  color: Colors.black,
}));

export const BAServicesTime = styled(Typography)(() => ({
  fontSize: "15px",
  fontWeight: "400",
}));

export const BAServicesPrice = styled(Typography)(() => ({
  fontSize: "15px",
  color: Colors.black,
}));

export const BATotalWrapper = styled(Box)(() => ({
  display: "flex",
  borderTop: "1px solid",
  borderColor: Colors.light_gray,
  justifyContent: "space-between",
  paddingTop: "10px",
  marginTop: "20px",
}));

export const BATotalText = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: "500",
}));

export const BABtn = styled(Button)(() => ({
  display: "block",
  width: "100%",
  marginTop: "25px",
}));

export const BAUserSearch = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const BAUserTitleWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  margin: "15px 0 5px 0",
}));
export const BAUserTitle = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "600",
}));

export const BAUserDetailWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  borderTop: "1px solid",
  borderColor: Colors.light_gray_2,
  padding: "5px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: Colors.white_1,
  },
}));

export const BACusDetail = styled(Typography)(() => ({
  fontSize: "14px",
}));

export const BACusProWapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px",
  paddingBottom: "20px",
  borderBottom: "1px solid #ccc",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: "20px",
  },
}));

export const BACusProDetailWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    justifyContent: "flex-start",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "20px",
    alignItems: "flex-start",
  },
}));

export const BACusAvatar = styled("img")(({ src }) => ({
  src: `url(${src})`,
  height: "150px",
  width: "150px",
  borderRadius: "5px",
}));

export const BACusName = styled(Typography)(() => ({
  fontSize: "20px",
  marginBottom: "2px",
  fontWeight: "500",
}));

export const BACusProDetail = styled(Typography)(() => ({
  fontSize: "15px",
  marginBottom: "5px",
}));

export const BACusBooked = styled(Typography)(() => ({
  fontSize: "16px",
  color: "#8595A6",
}));

export const BARecHead = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "40px",
}));

export const BARecService = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  maxWidth: "60%",
  margin: "auto",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}));

export const BARecFoot = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  maxWidth: "60%",
  margin: "20px auto 0 auto",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}));

export const BAOrderTotal = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "20px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "20px",
    alignItems: "flex-start",
  },
}));

export const BACloseIcon = styled(IconButton)(() => ({
  position: "absolute",
  right: "-28px",
  top: "-28px",
  cursor: "pointer",
  zIndex: "9",
}));

export const BASampleLogo = styled("img")(({ src }) => ({
  src: `url(${src})`,
  width: "150px",
  marginBottom: "10px",
}));
