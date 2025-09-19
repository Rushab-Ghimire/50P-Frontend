import React, { useState } from "react";
import { ADLogo } from "@app/modules/AskDaysi/styles/global";
import {
  Alert,
  Box,
  Button,
  Container,
  FormLabel,
  Stack,
  Typography,
} from "@mui/material";
import logo from "/assets/images/askdaysi/global/logo.png";
import {
  ADLpContnetWrapper,
  ADLpHeader,
  ADLpWrapper,
} from "@app/modules/AskDaysi/styles/LandingPage";
import { ADDaysi } from "@app/modules/AskDaysi/styles/homepage";
import daysi from "/assets/images/askdaysi/chat/daysi.png";
import { JumboForm, JumboInput } from "@jumbo/vendors/react-hook-form";
import { LoadingButton } from "@mui/lab";
import { Colors } from "@app/modules/AskDaysi/theme/colors";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { gqlMutate } from "@app/_utilities/http";
import { useMutation } from "react-query";
import { gql } from "graphql-request";
import { setCookie } from "@jumbo/utilities/cookies";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

const labelStyle = {
  fontSize: "18px",
  color: Colors.gray_1,
};

const inputStyle = {
  margin: "5px 0 25px 0",
};

const validationSchema = Yup.object().shape({
  //code: Yup.string().required("Access Code is required"),
});

export const saveAndCheckCode = (d) => {
  return gql`
    mutation M {
      checkCode(
        code: "${d.code}"
      ) {
            status
        }
    }
  `;
};

const AskDaysiLandingPage = ({ setLandingPage }) => {
  const { t } = useTranslation();

  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(d) {
    console.log("Data - ", d);
    if (d.code.trim() == "") {
      d.code = "A++DaysiAI";
    }
    setProcessing(true);
    setFormError({ isError: false, message: "" });
    mutate({
      inData: { gql: saveAndCheckCode(d) },
      path: "/graphql",
      onSuccess: (d) => {
        setProcessing(false);
        setCookie("auth_pass", "1", 30);
        setLandingPage(false);
      },
      onError: (e) => {
        setFormError({ isError: true, message: e.error });
        setProcessing(false);
        setLandingPage(true);
      },
    });
  }

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: (e) => {},
  });

  const [formError, setFormError] = React.useState({
    isError: false,
    message: "",
  });

  const handleOnChange = (e) => {
    setFormError({ isError: false, message: "" });
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ADLpWrapper maxWidth="100%">
        <ADLpHeader>
          <ADLogo src={logo} alt="AskDaysi Logo" />
        </ADLpHeader>
        <ADLpContnetWrapper>
          <Box sx={{ textAlign: "center" }}>
            <ADDaysi src={daysi} alt="Daysi Avatar" sx={{ width: "200px" }} />
          </Box>
          {formError.isError && (
            <Alert severity="error">{formError.message}</Alert>
          )}
          <Box>
            <JumboForm
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              onChange={handleOnChange}
            >
              <FormLabel sx={labelStyle}>{t("lp.enterCode")}</FormLabel>
              <JumboInput
                fullWidth
                size="small"
                defaultValue={""}
                fieldName={"code"}
                placeholder={t("lp.enterCode")}
                sx={inputStyle}
              />
              {/* <FormLabel sx={labelStyle}>{t("lp.majorConcern")}</FormLabel>
              <JumboInput
                fullWidth
                size="small"
                defaultValue={""}
                fieldName={"concern"}
                placeholder={t("lp.enterConcern")}
                multiline
                rows={4}
                sx={inputStyle}
              /> */}
              <LoadingButton
                type="submit"
                variant="contained"
                color="primary"
                loading={processing}
              >
                {t("lp.proceed")}
              </LoadingButton>
            </JumboForm>
          </Box>
        </ADLpContnetWrapper>
      </ADLpWrapper>
      <Dialog
        // fullWidth={true}
        fullScreen
        open={open}
        TransitionComponent={Transition}
        sx={{ minHeight: "0px", bottom: "0", top: "auto" }}
      >
        {/* <Container> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
            padding: "10px",
          }}
        >
          <Stack>
            <Typography variant="h5" sx={{ mb: 0 }}>
              We use cookies to enhance your experience. By continuing to visit
              this site, you agree to our use of cookies.
            </Typography>
          </Stack>
          <Stack>
            <Button variant="contained" size="small" onClick={handleClose}>
              Accept
            </Button>
          </Stack>
        </Box>
        {/* </Container> */}
      </Dialog>
    </>
  );
};

export default AskDaysiLandingPage;
