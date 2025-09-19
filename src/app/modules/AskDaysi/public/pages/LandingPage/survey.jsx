import React, { useCallback, useState } from "react";
import { ADLogo } from "@app/modules/AskDaysi/styles/global";
import { Alert, Box, Container, FormLabel } from "@mui/material";
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
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import AdvFilterHearAboutSelector from "../../components/form-components/AdvFilterHearAboutSelector";

const labelStyle = {
  fontSize: "18px",
  color: Colors.gray_1,
};

const inputStyle = {
  margin: "5px 0 25px 0",
};

const validationSchema = Yup.object().shape({
  //code: Yup.string().required("Access Code is required"),
  //concern: Yup.string().required("This field is required"),
});

export const saveAndCheckCode = (d) => {
  return gql`
    mutation M {
      saveConcern(
        primaryConcern: "${d.concern}"
        hearAbout: "${d.hearAbout}"
        other: "${d.other}"
      ) {
            status
        }
    }
  `;
};

const AskDaysiSurveyPage = ({
  isDialogOpened,
  onDialogClosed,
  handleCloseDialog,
}) => {
  const { t } = useTranslation();
  const { getUserDetail } = useAuth();
  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(d) {
    d.hearAbout = hearAbout;
    d.other = other;
    setProcessing(true);
    setFormError({ isError: false, message: "" });
    mutate({
      inData: { gql: saveAndCheckCode(d) },
      path: "/graphql",
      onSuccess: (d) => {
        setProcessing(false);
        setCookie("auth_pass", "1", 30);
        handleCloseDialog();
        getUserDetail();
      },
      onError: (e) => {
        setFormError({ isError: true, message: e.error });
        setProcessing(false);
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

  const [hearAbout, setHearAbout] = React.useState(-1);
  const [other, setOther] = React.useState("");
  const setSelected = useCallback((ins, other) => {
    setHearAbout(ins[0]);
    setOther(other);
  });

  return (
    <>
      <Container sx={{ py: 8 }}>
        {formError.isError && (
          <Alert severity="error">{formError.message}</Alert>
        )}
        <Box>
          <JumboForm
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            onChange={handleOnChange}
          >
            {/* <FormLabel sx={labelStyle}>{t("lp.enterCode")}</FormLabel>
              <JumboInput
                fullWidth
                size="small"
                defaultValue={""}
                fieldName={"code"}
                placeholder={t("lp.enterCode")}
                sx={inputStyle}
              /> */}
            <FormLabel sx={labelStyle}>{t("lp.oneConcern")}</FormLabel>
            <JumboInput
              fullWidth
              size="small"
              defaultValue={""}
              fieldName={"concern"}
              placeholder={t("lp.enterConcern")}
              multiline
              rows={4}
              sx={inputStyle}
            />

            <FormLabel sx={labelStyle}> {t("misc.surveyTitle")}</FormLabel>
            <AdvFilterHearAboutSelector
              setSelected={setSelected}
              field_name={"hear_about"}
              is_multiple={false}
              selected={[hearAbout]}
            />

            <LoadingButton
              id="mxt-survey-btn"
              type="submit"
              variant="contained"
              loading={processing}
              sx={{ backgroundColor: Colors.primary, marginTop: "20px" }}
            >
              {t("lp.proceed")}
            </LoadingButton>
          </JumboForm>
        </Box>
      </Container>
    </>
  );
};

export default AskDaysiSurveyPage;
