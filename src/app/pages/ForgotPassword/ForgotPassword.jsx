import React from "react";
import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { getAssetPath } from "@app/_utilities/helpers";
import { Div, Link } from "@jumbo/shared";
import { JumboForm, JumboInput } from "@jumbo/vendors/react-hook-form";
import { Facebook, Google, Twitter } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Card,
  CardContent,
  CardMedia,
  Collapse,
  IconButton,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import { validationSchema } from "./validation";
import { postCall } from "@app/_utilities/http";
import Logo from "/assets/images/alt-logo.png";

const ForgotPassword = () => {
  const [message, setMessage] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const hideMessage = () => {
    setMessage((prev) => {
      return { ...prev, open: false };
    });
  };

  const handleSubmit = async (data) => {
    try {
      const response = await postCall({
        inData: { email: data.email },
        path: "/user/reset-password-request",
      });

      setMessage({
        open: true,
        message: response.message,
        severity: "success",
      });
    } catch (error) {
      if (error.info && error.info.error) {
        setMessage({
          open: true,
          message: error.info.error.email,
          severity: "error",
        });
      } else {
        setMessage({
          open: true,
          message:
            "An error has occurred. If the issue persists, please contact our support team.",
          severity: "error",
        });
      }
    }
  };
  return (
    <Div
      sx={{
        width: 720,
        maxWidth: "100%",
        margin: { xs: "40px 0 0 0", md: "auto" },
        p: { xs: 2, md: 4 },
      }}
    >
      <Card
        sx={{
          display: "flex",
          minWidth: 0,
          flexDirection: { xs: "column", md: "row" },
          minHeight: "50vh",
        }}
      >
        <CardContent
          sx={{
            flex: { xs: "0 1 155px", md: "0 1 300px" },
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
            <Div sx={{ mb: 2, minHeight: "30vh" }}>
              <Typography
                variant={"h3"}
                color={"inherit"}
                fontWeight={500}
                mb={2}
                fontSize={28}
              >
                Forgot Password
              </Typography>
              <Typography
                variant={"body1"}
                mb={2}
                fontSize={18}
                fontWeight={400}
                lineHeight={1.2}
              >
                Please enter your email to request a password reset link!
              </Typography>
            </Div>
            <img
              src={Logo}
              alt="logo"
              style={{
                width: "120px",
                position: "absolute",
                bottom: 0,
              }}
            />
          </Div>
        </CardContent>
        <CardContent
          sx={{
            flex: 1,
            padding: { xs: "32px 15px", md: "32px" },
          }}
        >
          <JumboForm
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            onChange={hideMessage}
          >
            <Stack spacing={3} mb={3}>
              <Collapse in={message.open}>
                <Alert severity={message.severity} onClose={hideMessage}>
                  {message.message}
                </Alert>
              </Collapse>
              <JumboInput fieldName="email" label="Email" />
              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                // loading={isSubmitting || mutation.isLoading}
              >
                Request Reset Link
              </LoadingButton>
            </Stack>
          </JumboForm>
        </CardContent>
      </Card>
    </Div>
  );
};

export default ForgotPassword;
