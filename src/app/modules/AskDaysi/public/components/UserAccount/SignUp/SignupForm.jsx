import LoadingButton from "@mui/lab/LoadingButton";
import { validationSchema } from "./validation";
import {
  IconButton,
  InputAdornment,
  Stack,
  FormHelperText,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useCallback, useEffect, useState } from "react";
import {
  JumboForm,
  JumboInput,
  JumboOutlinedInput,
  JumboSelect,
} from "@jumbo/vendors/react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { postCall } from "@app/_utilities/http";
import { useTranslation } from "react-i18next";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { GoogleIcon } from "@app/_icons";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { GLOBAL } from "@app/_utilities/globals";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import { Span } from "@jumbo/shared";
import { ADPhoneInput } from "@app/modules/AskDaysi/styles/global";
import ReCAPTCHA from "react-google-recaptcha";

const telStyle = {
  "& .form-control ": {},
};

const CAPTCHA_SITE_KEY = "6LfA1wkrAAAAAB3LiiGG1DUcioU9uFUJ_vuul6-0";

const SignupForm = ({ mode = "" }) => {
  const [captchaValue, setCaptchaValue] = useState(null);
  const { loginWithGoogleAD } = useAuth();
  const { t } = useTranslation();
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
    setError({ isError: false, errors: [] });
    data.email = data.email === undefined ? "" : data.email;
    data.lname = data.lname === undefined ? "" : data.lname;
    data.role_identifier = mode === undefined ? "patient" : mode;

    setIsSubmitting(true);
    // const response = await login(data);
    try {
      const response = await postCall({
        inData: {
          email: data.email,
          password: data.password,
          first_name: data.fname,
          phone: data.phone,
          last_name: data.lname,
          role_identifier: data.role_identifier,
          organization_id: 2, //AskDaysi
          referral_code: refCode.trim(), //AskDaysi
        },
        path: "/user/create",
      });
      window.location.href = "/signup-success";
    } catch (error) {
      setIsSubmitting(false);
      if (error.errors) {
        setError({
          isError: true,
          errors: error.errors,
        });
      } else {
        setError((p) => {
          return {
            ...p,
            isError: true,
            message: error.message,
          };
        });
      }
    }
  }

  const [eventInput, setEventInput] = useState(false);
  const handleOnChange = (d) => {
    d.ref_code = ""; // comment on PROD_BUILD_3
    setEventInput(true);
    setRefCode(d.ref_code.trim());
    setError({ isError: false, errors: [] });
  };

  const [valX, setValX] = useState(mode);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    setValX((p) => e.target.value);
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const [refCode, setRefCode] = useState("");
  useEffect(() => {
    if (!eventInput) {
      if (
        searchParams.get("ref") !== undefined &&
        searchParams.get("ref") !== null
      ) {
        setRefCode((p) => searchParams.get("ref").trim());
      }
    }
  });

  const [phone, setPhone] = useState("");
  return (
    <JumboForm
      validationSchema={validationSchema}
      onSubmit={handleSignUp}
      onChange={handleOnChange}
    >
      {error.isError && (
        <Alert sx={{ marginBottom: "20px" }} severity="error">
          {error.message
            ? error.message
            : Object.values(error.errors).map((it) => (
                <Span sx={{ marginTop: "0px" }} key={it}>
                  {it}
                </Span>
              ))}
        </Alert>
      )}
      <Stack spacing={3} mb={2}>
        {mode == "" && (
          <JumboSelect
            onChange={handleChange}
            fieldName={"role_identifier"}
            formControl={true}
            options={[
              {
                label: "Healthcare Provider",
                value: "doctor",
              },
              {
                label: "Patient",
                value: "patient",
              },
            ]}
            defaultValue={valX}
            value={valX}
          />
        )}
        <JumboInput
          fullWidth
          // size="small"
          fieldName={"fname"}
          label={t("signup.fname")}
          placeholder="John"
          // error={true}
          // helperText={error.errors.email}
        />
        <JumboInput
          fullWidth
          // size="small"
          fieldName={"lname"}
          label={t("signup.lname")}
          // defaultValue="Doe"
          // error={true}
          // helperText={error.errors.email}
        />
        <JumboInput
          fullWidth
          // size="small"
          fieldName={"email"}
          label={t("login.email")}
          //defaultValue="johndoe@gmail.com"
        />
        {/* <PhoneInput
          international={true}
          withCountryCallingCode={true}
          country={"us"}
          onChange={(phone) => {
            setPhone((prev) => phone);
          }}
          style={telStyle}
        /> */}
        <ADPhoneInput
          international={true}
          withCountryCallingCode={true}
          country={"us"}
          onChange={(phone) => {
            setPhone((prev) => phone);
          }}
        />
        <JumboInput
          className={"hideInputPhone"}
          fullWidth
          fieldName={"phone"}
          defaultValue={phone}
          value={phone}
        />
        <JumboOutlinedInput
          fullWidth
          // size="small"
          fieldName={"password"}
          label={t("login.password")}
          type={values.showPassword ? "text" : "password"}
          // margin="none"
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

        <ReCAPTCHA
          sitekey={CAPTCHA_SITE_KEY}
          onChange={(val) => setCaptchaValue(val)}
          size="normal"
        />

        {/* PROD_BUILD_3 <hr />
        {refCode === "" && <h4>Have a referral code? Enter it here.</h4>}
        {refCode !== "" && (
          <h4>You seem to be using a referral for signing up.</h4>
        )}
        <JumboInput
          fullWidth
          fieldName={"ref_code"}
          label={""}
          defaultValue={refCode}
        /> */}

        <LoadingButton
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          disabled={!captchaValue}
        >
          {t("login.signUp")}
        </LoadingButton>
        <LoadingButton
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={() => {
            GLOBAL.google_organization_id = 2;
            GLOBAL.google_role = mode;
            GLOBAL.referral_code = refCode !== undefined ? refCode : "";

            loginWithGoogleAD();
          }}
          sx={{
            textTransform: "capitalize",
            marginBottom: "20px",
            color: "black",
          }}
        >
          {t("signup.googleSignUp")}
        </LoadingButton>
      </Stack>
    </JumboForm>
  );
};

export { SignupForm };
