import { Colors } from "@app/_themes/TileFlex";
import {
  Button,
  Container,
  IconButton,
  styled,
  Typography,
} from "@mui/material";

export const VOWrapper = styled(Container)(({ src }) => ({
  background: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${src})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
}));

export const VoHeading = styled(Typography)(() => ({
  fontSize: "36px",
  fontWeight: "500",
  marginBottom: "2px",
  color: Colors.white,
  textAlign: "center",
}));

export const VoSubHeading = styled(Typography)(() => ({
  fontSize: "24px",
  color: Colors.white,
  textAlign: "center",
}));

export const VoIConButton = styled(IconButton)(() => ({
  backgroundColor: Colors.dark_blue,
  padding: "10px",
  borderRadius: "50%",
  marginTop: "80px",
  cursor: "pointer",
}));

export const VoButton = styled(Button)(() => ({
  marginTop: "50px",
  pointerEvents: "none",
}));

export const VoMsg = styled(Typography)(() => ({
  fontSize: "20px",
  marginTop: "30px",
  color: Colors.white,
  textAlign: "center",
}));
