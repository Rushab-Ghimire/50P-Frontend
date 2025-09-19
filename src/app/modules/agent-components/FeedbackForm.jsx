import React, { useState, useCallback } from "react";
import { Div } from "@jumbo/shared";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { queryClient, gqlQuery, gqlMutate } from "@app/_utilities/http.js";
import { useQuery, useMutation } from "react-query";
import Rating from "@mui/material/Rating";
import { DescText, TitleText } from "@app/_styles/onboarding";
import siteLogo from "/assets/images/logo.png";
import { DzFeedback } from "@app/_components/extensions/dropzone/components/DzFeedback/DzFeedback";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import * as Yup from "yup";
import {
  JumboCheckbox,
  JumboForm,
  JumboInput,
  JumboOutlinedInput,
} from "@jumbo/vendors/react-hook-form";
import {
  initiateVoiceMode,
  modeActivated,
} from "@app/_utilities/voice_public.js";
import { BouncingDotsLoader } from "@app/_components/apps/common_components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { jsonEmailDocument } from "./Documents";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const dialogStyle = {
  "& .MuiPaper-root": {
    overflowY: "visible",
    maxWidth: "800px",
  },
};

const validationSchema = Yup.object().shape({
  comment: Yup.string().required("Comment is required"),
});

function FeedbackForm({ sendToRouter, closePopup, param }) {
  const [showFeedback, setShowFeedback] = useState(true);
  const [value, setValue] = useState(5);
  const [transcript, setTranscript] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [formError, setFormError] = React.useState({
    isError: false,
    message: "",
  });

  const handleOnChange = (e) => {
    setFormError({ isError: false, message: "" });
  };

  function handleSubmit(d) {
    d.rating = value;
    //d.comment = transcript.replace(/(?:\r\n|\r|\n)/g, "[-NEWLINE-]");
    console.log("Feedback - ", d);
    setTimeout(() => {
      setShowSuccess(true);
    }, 300);
    mutate({
      inData: { gql: jsonEmailDocument(d, "New Feedback Received") },
      path: "/graphql",
      onSuccess: (d) => {},
    });
  }

  const {
    mutate,
    isPending,
    isError: feedbackIsError,
    error: feedbackError,
  } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: (e) => {},
  });

  const theme = useTheme();
  const divStyle = {
    width: 720,
    maxWidth: "100%",
    margin: "auto",
    p: { xs: 2, md: 4 },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  };

  return (
    <Div sx={divStyle}>
      <Card
        sx={{
          display: "flex",
          minWidth: 0,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {!showSuccess && (
          <CardContent
            sx={{
              flex: 1,
              padding: { xs: "32px 15px", md: "32px" },
            }}
          >
            <TitleText
              variant="h5"
              textAlign={"center"}
              sx={{ marginTop: "0px" }}
            >
              Rate Your Experience
            </TitleText>
            <br />
            <JumboForm
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              onChange={handleOnChange}
            >
              <Box sx={{ textAlign: "center", marginBottom: "25px" }}>
                <Rating
                  name="rating"
                  value={value}
                  size="large"
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </Box>
              <Box display={"flex"} flexDirection={"column"}>
                <JumboInput
                  fieldName="comment"
                  label="Tell us about your experience"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: "25px" }}
                />
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: "#c96ee2" }}
                >
                  Share My Experience
                </Button>
              </Box>
            </JumboForm>
          </CardContent>
        )}

        {showSuccess && (
          <CardContent
            sx={{
              flex: 1,
              padding: { xs: "32px 15px", md: "32px" },
            }}
          >
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
                Thank you for sharing your experience!
              </Typography>
            </Box>
          </CardContent>
        )}
      </Card>
    </Div>
  );
}
export default FeedbackForm;
