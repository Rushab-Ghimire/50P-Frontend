import LoadingButton from "@mui/lab/LoadingButton";
import {
  IconButton,
  InputAdornment,
  Stack,
  FormHelperText,
  Box,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";
import {
  JumboForm,
  JumboInput,
  JumboOutlinedInput,
} from "@jumbo/vendors/react-hook-form";
import { useNavigate } from "react-router-dom";
import { gqlMutate, postCall, queryClient } from "@app/_utilities/http";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Colors } from "@app/_themes/TileFlex";
import { Link } from "@jumbo/shared";
import { sendOTP } from "../Documents";
import { useMutation } from "react-query";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";

const validationSchema = Yup.object().shape({});
const validationSchemaLogin = Yup.object().shape({
  sms_code: Yup.string().required("OTP Code is required"),
});

const PhoneLoginForm = ({ invitation_token }) => {
  const [error, setError] = React.useState({ isError: false, message: "" });
  const [success, setSuccess] = React.useState({
    isSuccess: false,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmittingLogin, setIsSubmittingLogin] = React.useState(false);

  const [showLogin, setShowLogin] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const navigate = useNavigate();

  const { loginViaSMS } = useAuth();

  async function handleSubmitLogin(data) {
    setIsSubmittingLogin(true);
    setSuccess((prev) => ({
      isSuccess: false,
    }));
    var response = await loginViaSMS(data);
    if (response.error) {
      setError((prev) => ({
        isError: true,
        message: response.error,
      }));
      setIsSubmittingLogin(false);
    } else {
      window.open("/bridge", "_self");
    }
  }

  const handleOnChangeLogin = () => {
    setError({ isError: false, errors: [] });
  };

  async function handleSubmit(data) {
    setIsSubmitting(true);
    var payload = {};
    payload = {
      phone: "+" + phone,
    };
    mutate({
      inData: { gql: sendOTP(payload) },
      path: "/graphql",
      onSuccess: (r) => {
        setSuccess((prev) => ({
          isSuccess: true,
        }));
        setIsSubmitting(false);
        setShowLogin(true);
        queryClient.invalidateQueries({ queryKey: ["sms_code"] });
      },
      onError: (e) => {
        setError((prev) => ({
          isError: true,
          message: e.error,
        }));
        setIsSubmitting(false);
        setShowLogin(false);
        queryClient.invalidateQueries({ queryKey: ["sms_code"] });
      },
    });
  }

  const {
    mutate,
    isPending,
    isError,
    error: errorMutate,
  } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: (e) => {},
    onError: (e) => {},
  });

  const handleOnChange = () => {
    setError((prev) => ({
      isError: false,
      message: "",
    }));
  };
  return (
    <>
      {success.isSuccess && (
        <Box sx={{ textAlign: "center", marginBottom: "25px" }}>
          <Stack>
            <CheckCircleOutlineIcon
              color="success"
              sx={{
                fontSize: "40px",
                margin: "0 auto 10px auto",
                display: "block",
              }}
            />
            <Typography variant="h2" fontWeight={"500"}>
              Successful!
            </Typography>
            <Typography variant="h4">
              Please check your phone for the OTP code.
            </Typography>
          </Stack>
        </Box>
      )}
      {error.isError && (
        <Box sx={{ textAlign: "center", marginBottom: "25px" }}>
          <Stack>
            <InfoOutlinedIcon
              color="error"
              sx={{
                fontSize: "40px",
                margin: "0 auto 10px auto",
                display: "block",
              }}
            />
            <Typography variant="h2" fontWeight={"500"}>
              Failed!
            </Typography>
            <Typography variant="h4">{error.message}</Typography>
          </Stack>
        </Box>
      )}
      {!showLogin && (
        <JumboForm
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          onChange={handleOnChange}
        >
          <PhoneInput
            international={true}
            withCountryCallingCode={true}
            country={"us"}
            onChange={(phone) => {
              setPhone((prev) => phone);
              handleOnChange();
            }}
          />
          <Stack spacing={3} mb={2} sx={{ marginTop: "25px" }}>
            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}
            >
              Send OTP for Login
            </LoadingButton>
          </Stack>
          <Typography variant={"body1"}>
            Go to{" "}
            <Link to="/" underline="none" sx={{ color: Colors.dark_blue }}>
              Login
            </Link>
          </Typography>
        </JumboForm>
      )}

      {showLogin && (
        <JumboForm
          validationSchema={validationSchemaLogin}
          onSubmit={handleSubmitLogin}
          onChange={handleOnChangeLogin}
        >
          <JumboInput fullWidth fieldName={"sms_code"} label={"OTP Code"} />
          <Stack spacing={3} mb={2} sx={{ marginTop: "25px" }}>
            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmittingLogin}
            >
              Login
            </LoadingButton>
          </Stack>
          <Typography variant={"body1"}>
            <Link
              onClick={() => {
                setShowLogin(false);
                setIsSubmittingLogin(false);
                setIsSubmitting(false);
                setSuccess((prev) => ({
                  isSuccess: false,
                }));
                setError((prev) => ({
                  isError: false,
                  message: "",
                }));
              }}
              underline="none"
              sx={{ color: Colors.dark_blue }}
            >
              Resend Code
            </Link>
          </Typography>
        </JumboForm>
      )}
    </>
  );
};

export { PhoneLoginForm };
