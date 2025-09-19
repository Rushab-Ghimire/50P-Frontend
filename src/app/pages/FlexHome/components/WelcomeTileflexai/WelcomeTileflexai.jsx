import React from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  alpha,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import { Facebook, Google, Twitter } from "@mui/icons-material";
import { Div, Link } from "@jumbo/shared";
import { ASSET_AVATARS, ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { LoginForm } from "@app/_components/auth/login";
import { getAssetPath } from "@app/_utilities/helpers";
import { useTranslation } from "react-i18next";
import { UserSummary } from "@app/_components/widgets/UserSummary";
import { FacebookIcon, GoogleIcon } from "@app/_icons";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import { Colors } from "@app/_themes/TileFlex";
import { useSearchParams } from "react-router-dom";
import Logo from "/assets/images/alt-logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";

function WelcomeTileflexai() {
  const { loginWithGoogle } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [business, setbusiness] = React.useState("");
  const handleChange = (event) => {
    setbusiness(event.target.value);
  };

  const [isOpen, setIsOpen] = React.useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const severity = searchParams.get("severity") || "string";
  const queryMessage = searchParams.get("message");

  React.useEffect(() => {
    if (queryMessage) {
      setIsOpen(true);
    }
  }, [queryMessage]);

  return (
    <Div
      sx={{
        width: 990,
        maxWidth: "100%",
        margin: "auto",
        p: { xs: 2, md: 4 },
      }}
    >
      <Card
        sx={{
          display: "flex",
          minWidth: 0,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <CardContent
          sx={{
            flex: { xs: "0 1 155px", md: "0 1 400px" },
            marginBottom: { xs: "20px", md: "0" },
            position: "relative",
            background: `#0267a0 url(${getAssetPath(
              `${ASSET_IMAGES}/widgets/keith-luke.jpg`,
              "640x428"
            )}) no-repeat center`,
            backgroundSize: "cover",

            "&::after": {
              display: "inline-block",
              position: "absolute",
              content: `''`,
              inset: 0,
              backgroundColor: alpha("#0267a0", 0.65),
            },
          }}
        >
          <Div
            sx={{
              display: "flex",
              minWidth: 0,
              flex: 1,
              flexDirection: "column",
              color: "common.white",
              position: "relative",
              zIndex: 1,
              height: "100%",
            }}
          >
            <Div sx={{ mb: 2, minHeight: "25vh" }}>
              <Typography
                variant={"h3"}
                color={"inherit"}
                fontWeight={500}
                mb={1}
                fontSize={28}
              >
                Welcome to TileFlexAI
              </Typography>
              <Typography
                variant={"body1"}
                mb={2}
                fontSize={18}
                fontWeight={400}
                lineHeight={1.2}
              >
                Tell us a little about yourself so we can give you the best
                experience.
              </Typography>
              <img
                src={Logo}
                alt="logo"
                style={{
                  width: "120px",
                  // display: "block",
                  // margin: "auto",
                  // marginBottom: "25px",
                  position: "absolute",
                  bottom: 0,
                }}
              />
            </Div>
          </Div>
        </CardContent>
        <CardContent sx={{ flex: 1, p: { xs: 2, sm: 4 } }}>
          <Collapse in={isOpen}>
            <Alert
              severity={severity}
              onClose={() => {
                setIsOpen(false);
              }}
            >
              {queryMessage}
            </Alert>
          </Collapse>
          {/* <Box sx={{ marginBottom: "25px", marginTop: "10px" }}>

            <FormControl fullWidth>
              <InputLabel>Business Type</InputLabel>
              <Select
                value={business}
                label="Businees Type"
                onChange={handleChange}
              >
                <MenuItem value={"salon"}>Salon</MenuItem>
                <MenuItem value={"spa"}>Spa</MenuItem>
                <MenuItem value={"restaurant"}>Restaurant</MenuItem>
                <MenuItem value={"bakery"}>Bakery</MenuItem>
                <MenuItem value={"photography"}>Photography</MenuItem>
              </Select>
            </FormControl>
          </Box> */}
          <LoginForm />
          <Stack sx={{ marginTop: "20px" }}>
            <LoadingButton
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={loginWithGoogle}
              sx={{
                textTransform: "capitalize",
                marginBottom: "20px",
                color: "black",
              }}
            >
              Sign in with Google
            </LoadingButton>
            <Button
              disabled={true}
              fullWidth
              variant="outlined"
              startIcon={<FacebookIcon />}
              sx={{
                textTransform: "capitalize",
                marginBottom: "20px",
                color: "black",
              }}
            >
              Sign in with Facebook
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<PhoneAndroidIcon />}
              sx={{
                textTransform: "capitalize",
                marginBottom: "20px",
                color: "black",
              }}
              onClick={() => navigate("/phone-login")}
            >
              Sign in with Phone
            </Button>
            <Typography variant={"body1"} mb={2}>
              {t("login.account")}{" "}
              <Link
                underline="none"
                to="/signup"
                sx={{ color: Colors.dark_blue }}
              >
                {t("login.recover")}
              </Link>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Div>
  );
}

export default WelcomeTileflexai;
