import LoadingButton from "@mui/lab/LoadingButton";
import {
  IconButton,
  InputAdornment,
  Stack,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";
import {
  JumboForm,
  JumboInput,
  JumboOutlinedInput,
} from "@jumbo/vendors/react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { postCall } from "@app/_utilities/http";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
});

const InviteUserForm = ({ invitation_token }) => {
  const [error, setError] = React.useState({ isError: false, message: "" });
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  async function handleSignUp(data) {
    var payload = {};
    payload = {
      password: data.password,
      confirm_password: data.password,
    };

    try {
      const response = await postCall({
        inData: payload,
        path: `/user/set-invited-user-password/${invitation_token}`,
      });
      navigate("/signup-success/invite-user");
    } catch (error) {
      if (error.info && error.info.error) {
        setError({
          isError: true,
          errors: error.info.error,
        });
      }
    }
  }
  const handleOnChange = () => {
    setError({ isError: false, errors: [] });
  };
  return (
    <JumboForm
      validationSchema={validationSchema}
      onSubmit={handleSignUp}
      onChange={handleOnChange}
    >
      <Stack spacing={3} mb={2}>
        <JumboOutlinedInput
          fieldName={"password"}
          label={"Password"}
          type={values.showPassword ? "text" : "password"}
          margin="none"
          // endAdornment={
          //   <InputAdornment position="end">
          //     <IconButton
          //       aria-label="toggle password visibility"
          //       onClick={handleClickShowPassword}
          //       edge="end"
          //     >
          //       {values.showPassword ? <VisibilityOff /> : <Visibility />}
          //     </IconButton>
          //   </InputAdornment>
          // }
          //defaultValue="johndoe@123"
          sx={{ bgcolor: (theme) => theme.palette.background.paper }}
        />

        <LoadingButton
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          // loading={isSubmitting || mutation.isLoading}
        >
          Join Now
        </LoadingButton>
      </Stack>
    </JumboForm>
  );
};

export { InviteUserForm };
