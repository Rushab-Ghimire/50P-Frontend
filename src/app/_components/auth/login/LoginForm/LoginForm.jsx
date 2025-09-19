import LoadingButton from "@mui/lab/LoadingButton";
import {
  JumboCheckbox,
  JumboForm,
  JumboInput,
  JumboOutlinedInput,
} from "@jumbo/vendors/react-hook-form";
import { validationSchema } from "../validation";
import {
  IconButton,
  InputAdornment,
  Stack,
  Typography,
  Alert,
  Box,
} from "@mui/material";
import { Link } from "@jumbo/shared";
import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Colors } from "@app/_themes/TileFlex";
const LoginForm = () => {
  const { t } = useTranslation();
  const { login, isLogin } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const [error, setError] = React.useState({ isError: false, message: "" });
  async function handleLogin(data) {
    const response = await login(data);
    if (response.info && response.info.error.error) {
      setError({
        isError: true,
        message: t(response.info.error.error),
      });
    } else {
      window.open("/bridge", "_self");
    }
  }
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleOnChange = () => {
    setError({ isError: false, message: "" });
  };
  return (
    <JumboForm
      validationSchema={validationSchema}
      onSubmit={handleLogin}
      onChange={handleOnChange}
    >
      <Stack spacing={3} mb={3}>
        <JumboInput
          fullWidth
          fieldName={"email"}
          label={t("login.email")}
          defaultValue="demo@tileflexai.com"
        />
        <JumboOutlinedInput
          fieldName={"password"}
          label={t("login.password")}
          type={values.showPassword ? "text" : "password"}
          margin="none"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          sx={{ bgcolor: (theme) => theme.palette.background.paper }}
          defaultValue={"demo@123"}
        />
        {error.isError && <Alert severity="error">{error.message}</Alert>}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack>
            <JumboCheckbox
              fieldName="rememberMe"
              label={t("login.rememberMe")}
              defaultChecked
            />
          </Stack>
          <Stack>
            <Typography textAlign={"right"} variant={"body1"}>
              <Link
                underline="none"
                to={"/forgot-password"}
                sx={{ color: Colors.dark_blue }}
              >
                {t("login.forgotPassword")}
              </Link>
            </Typography>
          </Stack>
        </Box>
        {/* <Link to={"/my-analytics"}> */}
        <LoadingButton
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          loading={isLogin}
          sx={{ backgroundColor: Colors.dark_blue }}
        >
          {t("login.loggedIn")}
        </LoadingButton>
        {/* </Link> */}
      </Stack>
    </JumboForm>
  );
};

export { LoginForm };
