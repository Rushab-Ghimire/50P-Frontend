import LoadingButton from "@mui/lab/LoadingButton";
import { validationSchema } from "../validation";
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
import { Link } from "react-router-dom";
import { postCall } from "@app/_utilities/http";

const SignupForm = () => {
  const [error, setError] = React.useState({ isError: false, message: "" });
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
  async function handleSignUp(data) {
    // const response = await login(data);
    try {
      const response = await postCall({
        inData: { email: data.email, password: data.password },
        path: "/user/create",
      });
      window.location.href = "/signup-success";
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
        {/* <JumboInput fieldName={"name"} label={"Name"} defaultValue="John Doe" /> */}
        <JumboInput
          fullWidth
          fieldName={"fname"}
          label={"First Name"}
          placeholder="John"
          // error={true}
          // helperText={error.errors.email}
        />
        <JumboInput
          fullWidth
          fieldName={"lname"}
          label={"Last Name"}
          // defaultValue="Doe"
          // error={true}
          // helperText={error.errors.email}
        />
        {error.isError && !!error.errors?.email ? (
          <JumboInput
            fullWidth
            fieldName={"email"}
            label={"Email"}
            defaultValue="johndoe@gmail.com"
            error={true}
            helperText={error.errors.email}
          />
        ) : (
          <JumboInput
            fullWidth
            fieldName={"email"}
            label={"Email"}
            //defaultValue="johndoe@gmail.com"
          />
        )}

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

        {/* <Link to={"/my-analytics"}> */}
        <LoadingButton
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          // loading={isSubmitting || mutation.isLoading}
        >
          Signup
        </LoadingButton>
        {/* </Link> */}
      </Stack>
    </JumboForm>
  );
};

export { SignupForm };
