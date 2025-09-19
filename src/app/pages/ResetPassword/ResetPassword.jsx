import React, { useState } from "react";
import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { getAssetPath } from "@app/_utilities/helpers";
import { Div, Link } from "@jumbo/shared";
import {
  JumboForm,
  JumboInput,
  JumboOutlinedInput,
} from "@jumbo/vendors/react-hook-form";
import {
  Facebook,
  Google,
  Twitter,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
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
  InputAdornment,
} from "@mui/material";
import { validationSchema } from "./validation";
import { postCall, getCall } from "@app/_utilities/http";
import { useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  // const [isValidToken, setIsValidToken] = React.useState(false);
  const [message, setMessage] = React.useState({
    open: false,
    message: "",
    severity: "",
    showForm: false,
  });

  const hideMessage = () => {
    setMessage((prev) => {
      return { ...prev, open: false };
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await postCall({
        inData: {
          password: data.password,
          confirm_password: data.confirm_password,
        },
        path: `/user/reset-password/${token}`,
      });
      setIsSubmitting(false);
      // setMessage({
      //   "open": true,
      //   "message": response.message,
      //   "severity": "success",
      //   "showForm": true
      // });
      window.location.href = "/signup-success/password-reset-successful";
      //window.location.href = "/?severity=success&message=Your password has been successfully updated. Please use new password to login.";
    } catch (error) {
      setIsSubmitting(false);
      if (error.errors) {
        setMessage({
          open: true,
          message: error.errors,
          severity: "error",
          showForm: true,
        });
      } else {
        setMessage({
          open: true,
          message:
            "An error has occurred. If the issue persists, please contact our support team.",
          severity: "error",
          showForm: true,
        });
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => {
      return !prev;
    });
  };

  const verifyPasswordResetToken = async (token) => {
    try {
      const response = await getCall({
        path: `/user/verify-reset-password-request/${token}`,
      });
      setMessage({
        open: false,
        message: "",
        severity: "",
        showForm: true,
      });
    } catch (error) {
      if (error.info && error.info.error) {
        setMessage({
          open: true,
          message: error.info.error,
          severity: "error",
          showForm: false,
        });
      } else {
        setMessage({
          open: true,
          message:
            "An error has occurred. If the issue persists, please contact our support team.",
          severity: "error",
          showForm: false,
        });
      }
    }
  };

  React.useEffect(() => {
    verifyPasswordResetToken(token);
  }, [token]);

  return (
    <Div
      sx={{
        flex: 1,
        flexWrap: "wrap",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: (theme) => theme.spacing(4),
      }}
    >
      {message.showForm ? (
        <Card sx={{ maxWidth: "100%", width: 360, mb: 4 }}>
          <CardContent>
            <Collapse in={message.open} sx={{ mb: "10px" }}>
              <Alert severity={message.severity} onClose={hideMessage}>
                {message.message}
              </Alert>
            </Collapse>

            <JumboForm
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              onChange={hideMessage}
            >
              <Stack spacing={3} mb={3}>
                {/* <JumboInput fieldName="email" label="Email" /> */}
                <JumboOutlinedInput
                  fieldName={"password"}
                  label={"Password"}
                  type={showPassword ? "text" : "password"}
                  margin="none"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  sx={{ bgcolor: (theme) => theme.palette.background.paper }}
                />
                <JumboOutlinedInput
                  fieldName={"confirm_password"}
                  label={"Confirm Password"}
                  type={showPassword ? "text" : "password"}
                  margin="none"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  sx={{ bgcolor: (theme) => theme.palette.background.paper }}
                />
                <LoadingButton
                  loading={isSubmitting}
                  type="submit"
                  variant="contained"
                  size="large"
                  // loading={isSubmitting || mutation.isLoading}
                >
                  Submit
                </LoadingButton>
              </Stack>
            </JumboForm>
          </CardContent>
        </Card>
      ) : (
        <Alert severity={message.severity}>{message.message}</Alert>
      )}
    </Div>
  );
};

export default ResetPassword;
