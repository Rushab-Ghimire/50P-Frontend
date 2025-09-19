import { Colors } from "@app/_themes/TileFlex";
import { Box, Container, Stack, styled, Typography } from "@mui/material";

export const HeaderContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const HeaderLogo = styled("img")(({ src }) => ({
  src: `url(${src})`,
  width: "250px",
}));

export const HeaderTitle = styled(Typography)({
  fontSize: "70px",
  textAlign: "right",
  fontFamily: "Spectral, serif",
  fontWeight: "500",
  lineHeight: "60px",
  color: Colors.black,
});

export const HeaderDate = styled(Typography)({
  fontSize: "18px",
  textAlign: "right",
  color: Colors.black,
});

export const BilledToContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "60px",
}));

export const BilledToTitle = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: "500",
  textTransform: "uppercase",
  display: "block",
  color: Colors.black,
}));

export const BilledToDetails = styled(Typography)(() => ({
  fontSize: "16px",
  color: Colors.black,
  marginBottom: "4px",
}));

export const BilledDate = styled(Typography)(() => ({
  fontSize: "16px",
  textAlign: "right",
  color: Colors.black,
}));

export const IDWrapper = styled(Container)(() => ({
  padding: "40px 50px !important",
  xbackgroundColor: "#f5f5ef",
}));

export const IDContainer = styled(Box)(() => ({
  marginTop: "20px",
}));

export const IDHeading = styled(Box)(() => ({
  borderTop: "1px solid #000",
  borderBottom: "1px solid #000",
  display: "flex",
  justifyContent: "space-between",
  padding: "10px",
}));

export const IDDetails = styled(Box)(() => ({
  borderBottom: "1px solid #000",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
}));

export const IDItems = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
}));

export const IDItemsWrapper = styled(Box)(() => ({
  padding: "10px",
  borderBottom: "1px solid #000",
}));

export const IDHeadingTitle = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: "600",
  color: Colors.black,
}));

export const IDDetailsDesc = styled(Typography)(() => ({
  fontSize: "16px",
  color: Colors.black,
  marginBottom: "5px",
}));

export const IDTotalWrapper = styled(Box)(() => ({
  margin: "10px 0 5px 0",
}));

export const IDTotal = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0",
}));

export const IDTotalCol1 = styled(Stack)(() => ({ flex: 6 }));
export const IDTotalCol2 = styled(Stack)(() => ({ flex: 1 }));
export const IDTotalCol3 = styled(Stack)(() => ({ flex: 1 }));
export const IDTotalCol4 = styled(Stack)(() => ({
  flex: 1,
  textAlign: "right",
}));

export const IDFirstColumn = styled(Stack)(() => ({
  fontSize: "16px",
  color: Colors.black,
}));

export const IDSecondColumn = styled(Stack)(() => ({
  flex: 1,
  textAlign: "center",
}));

export const IDThirdColumn = styled(Stack)(() => ({
  flex: 1,
  textAlign: "center",
}));

export const IDFourthColumn = styled(Stack)(() => ({
  textAlign: "right",
  fontSize: "16px",
  color: Colors.black,
  flex: 1,
}));

export const PIContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "20px",
}));

export const PIDetails = styled(Typography)(() => ({
  fontSize: "18px",
  color: Colors.black,
}));

export const PIName = styled(Typography)(() => ({
  fontSize: "28px",
  fontWeight: "500",
  color: Colors.black,
}));
