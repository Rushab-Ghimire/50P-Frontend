import { Colors } from "@app/_themes/TileFlex";
import {
  Box,
  Button,
  Container,
  InputLabel,
  Stack,
  styled,
  Typography,
} from "@mui/material";

export const NBContainer = styled(Container)(({ theme }) => ({
  maxWidth: "80%",
  width: "80%",
  margin: "auto",
  padding: "20px 0",
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
    width: "100%",
    padding: 0,
  },
}));

export const NBSectionTitle = styled(Typography)(() => ({
  fontSize: "22px",
  fontWeight: "400",
  color: Colors.dark_blue,
  marginBottom: "30px",
  textAlign: "center",
}));

export const NBBtn = styled(Button)(() => ({
  margin: "40px auto 0 auto",
  display: "block",
}));

export const NBInput = styled(InputLabel)(() => ({
  color: Colors.dark_blue,
  fontSize: "16px",
  marginBottom: "5px",
}));

export const NBSlectBankCard = styled(Box)(() => ({
  padding: "8px 15px",
  display: "flex",
  gap: "15px",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "start",
}));

export const NBBankLogo = styled("img")(({ src }) => ({
  src: `url(${src})`,
  width: "42px",
  display: "block",
  xborder: "1px solid #ccc",
  borderRadius: "50%",
}));
