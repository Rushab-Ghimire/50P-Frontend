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
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Colors } from "@app/modules/AskDaysi/theme/colors";
import ForgotPasswordModal from "@app/modules/AskDaysi/public/dialogs/ForgotPassword";
import { isValidEmail } from "@app/_utilities/helpers";

const AskDaysiLoginForm = () => {
  const { t } = useTranslation();
  const { login, isLogin } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const [error, setError] = React.useState({ isError: false, message: "" });
  async function handleLogin(data) {
    if (!isValidEmail(data.email)) {
      data["phone"] = data.email.trim();
      delete data["email"];
    }

    const response = await login(data);
    if (response.error) {
      setError({
        isError: true,
        message: t(response.error),
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

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
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
          label={t("login.email") + " / " + t("phone.phone")}
          defaultValue=""
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
          defaultValue={""}
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
                //to={"/askdaysi/forgot-password"}
                sx={{ color: Colors.primary }}
                onClick={() => handleOpen()}
              >
                {t("login.forogtPassword")}
              </Link>
            </Typography>
            <ForgotPasswordModal
              isDialogOpened={isOpen}
              handleCloseDialog={() => setIsOpen(false)}
            />
          </Stack>
        </Box>
        <LoadingButton
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          loading={isLogin}
          sx={{ backgroundColor: Colors.primary }}
        >
          {t("login.login")}
        </LoadingButton>
      </Stack>
    </JumboForm>
  );
};

export { AskDaysiLoginForm };
