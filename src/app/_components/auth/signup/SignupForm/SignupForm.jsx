import LoadingButton from "@mui/lab/LoadingButton";
import { validationSchema } from "../validation";
import { IconButton, InputAdornment, Stack } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";
import {
  JumboForm,
  JumboInput,
  JumboOutlinedInput,
} from "@jumbo/vendors/react-hook-form";

const SignupForm = () => {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  return (
    <JumboForm
      validationSchema={validationSchema}
      onSubmit={() => {}}
      onChange={() => {}}
    >
      <Stack spacing={3} mb={3}>
        <JumboInput fieldName={"name"} label={"Name"} defaultValue="Admin" />
        <JumboInput
          fullWidth
          fieldName={"email"}
          label={"Email"}
          defaultValue="admin@example.com"
        />
        <JumboOutlinedInput
          fieldName={"password"}
          label={"Password"}
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
          defaultValue="zab#723"
          sx={{ bgcolor: (theme) => theme.palette.background.paper }}
        />
        <LoadingButton
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          // loading={isSubmitting || mutation.isLoading}
        >
          Signup
        </LoadingButton>
      </Stack>
    </JumboForm>
  );
};

export { SignupForm };
