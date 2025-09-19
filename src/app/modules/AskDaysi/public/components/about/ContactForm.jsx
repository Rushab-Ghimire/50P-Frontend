import { jsonEmailDocument } from "@app/modules/agent-components/Documents";
import { JumboForm, JumboInput } from "@jumbo/vendors/react-hook-form";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import * as Yup from "yup";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useMutation } from "react-query";
import { gqlMutate } from "@app/_utilities/http";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

const fieldStyle = {
  marginBottom: "25px",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  message: Yup.string().required("Message is required"),
});

const AboutContactForm = () => {
  const { t } = useTranslation();

  const [showSuccess, setShowSuccess] = useState(false);
  const [formError, setFormError] = React.useState({
    isError: false,
    message: "",
  });

  const handleOnChange = (e) => {
    setFormError({ isError: false, message: "" });
  };

  const {
    mutate,
    isPending,
    isError: feedbackIsError,
    error: feedbackError,
  } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: (e) => {},
  });

  function handleSubmit(d) {
    //d.comment = transcript.replace(/(?:\r\n|\r|\n)/g, "[-NEWLINE-]");
    console.log("Data - ", d);
    setTimeout(() => {
      setShowSuccess(true);
    }, 300);
    mutate({
      inData: { gql: jsonEmailDocument(d, "Contact Us Form Submission") },
      path: "/graphql",
      onSuccess: (d) => {},
    });
  }

  const [searchParams, setSearchParams] = useSearchParams();
  const modeOpen = searchParams.get("mode");
  React.useEffect(() => {
    if (modeOpen) {
      if (modeOpen == "contact") {
        document.querySelector("#contact-form").scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  }, [modeOpen]);

  const otherWays = [
    {
      id: 1,
      title: t("contact.title"),
      description: "info@llcwebtech.com",
    },
    {
      id: 2,
      title: t("contact.office"),
      description: t("contact.hours"),
    },
    {
      id: 3,
      title: t("contact.locationTitle"),
      description: t("contact.location"),
    },
  ];
  return (
    <>
      <Box textAlign={"center"} sx={{ mb: 8, pt: 6 }}>
        <Typography variant="h2" sx={{ fontSize: "28px", fontWeight: "500" }}>
          {t("contact.title")}
        </Typography>
        <Typography variant="h3">{t("contact.subtitle")}</Typography>
      </Box>
      <Grid id="contact-form" container spacing={4}>
        {showSuccess && (
          <Grid item xs={12} md={6}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              gap={"25px"}
            >
              <CheckCircleOutlineIcon
                color="success"
                sx={{ fontSize: "100px" }}
              />
              <Typography variant="h2">
                {t("contact.thank")},
                <br /> {t("contact.getBack")}
              </Typography>
            </Box>
          </Grid>
        )}
        {!showSuccess && (
          <Grid item xs={12} md={6}>
            <Typography variant="h2" sx={{ fontWeight: "500", mb: 2 }}>
              {t("contact.get")}
            </Typography>
            <JumboForm
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              onChange={handleOnChange}
            >
              <JumboInput
                fullWidth
                defaultValue=""
                fieldName="name"
                placeholder={t("contact.name")}
                size="small"
                label={t("contact.name")}
                sx={fieldStyle}
              />
              <JumboInput
                fullWidth
                defaultValue=""
                fieldName="email"
                placeholder={t("contact.email")}
                size="small"
                label={t("contact.email")}
                sx={fieldStyle}
              />
              <JumboInput
                fullWidth
                defaultValue=""
                fieldName="message"
                placeholder={t("contact.message")}
                size="small"
                label={t("contact.message")}
                multiline
                rows={5}
                sx={fieldStyle}
              />
              <LoadingButton
                type="submit"
                variant="contained"
                size="small"
                sx={{ backgroundColor: "#c96ee2" }}
              >
                {t("contact.send")}
              </LoadingButton>
            </JumboForm>
          </Grid>
        )}
        <Grid item xs={12} md={6}>
          <Typography variant="h2" sx={{ fontWeight: "500", mb: 2 }}>
            {t("contact.other")}
          </Typography>

          {otherWays.map((data, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Typography variant="h4" fontWeight={"500"}>
                {data.title}
              </Typography>
              <Typography variant="h5">{data.description}</Typography>
            </Box>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default AboutContactForm;
