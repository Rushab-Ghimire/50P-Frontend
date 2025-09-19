import React, { useState, useCallback } from "react";
import { Div } from "@jumbo/shared";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { queryClient, gqlQuery, gqlMutate } from "@app/_utilities/http.js";
import { useQuery, useMutation } from "react-query";
import { getDocument, updateDocument } from "./Documents";
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

const validationSchema = Yup.object().shape({
  //title: Yup.string().required("title is required"),
});

const Feedback = () => {
  const [value, setValue] = useState(1);
  const [showFeedback, setShowFeedback] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [talkReady, setTalkReady] = useState(false);
  const [transcript, setTranscript] = useState("");
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  const [formError, setFormError] = React.useState({
    isError: false,
    message: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["category", { gql: getDocument(searchParams.get("code")) }],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({ signal, path: "/graphql", inData: queryKey[1] }),
    onSuccess: (d) => {
      if (d === undefined) {
        navigate("/error/link-expired");
      }
    },
  });

  const loopForVoiceMode = useCallback(() => {
    setTimeout(() => {
      if (modeActivated()) {
        setTalkReady(true);
        setShowMore(false);
      } else {
        loopForVoiceMode();
      }
    }, 500);
  });

  const handleFeedback = () => {
    setShowFeedback(false);
    setShowSuccess(true);
  };

  const handleOnChange = () => {
    setFormError({ isError: false, message: "" });
  };

  function handleSubmit(d) {
    d.rating = value;
    d.comment = transcript.replace(/(?:\r\n|\r|\n)/g, "[-NEWLINE-]");
    d.code = searchParams.get("code");
    mutate({
      inData: { gql: updateDocument(d) },
      path: "/graphql",
      onSuccess: (d) => {
        handleFeedback();
      },
    });
  }

  const {
    mutate,
    isPending,
    isError: feedbackIsError,
    error: feedbackError,
  } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: (e) => {
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
    },
  });

  window.captureTranscript = useCallback((v_message) => {
    console.log("v_message", v_message);
    setTranscript((prev) => prev + (prev.trim() == "" ? "" : "\n") + v_message);
  });

  return (
    <Div
      sx={{
        width: 720,
        maxWidth: "100%",
        margin: "auto",
        p: { xs: 2, md: 4 },
      }}
    >
      <Card
        sx={{
          display: "flex",
          minWidth: 0,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {showFeedback && (
          <CardContent
            sx={{
              flex: 1,
              padding: { xs: "32px 15px", md: "32px" },
            }}
          >
            <Box sx={{ textAlign: "center", marginBottom: "30px" }}>
              <img src={siteLogo} width={150} />
            </Box>

            {data?.order && (
              <Box sx={{ textAlign: "center", marginBottom: "30px" }}>
                You have just completed a service from
                <br />
                <b>{data?.order?.organization?.name}</b>
              </Box>
            )}

            {!talkReady && !showMore && (
              <TitleText variant="h2" textAlign={"center"}>
                Rate Your Experience
              </TitleText>
            )}
            {showMore && (
              <TitleText variant="h4" textAlign={"center"}>
                Initializing Feedback Agent
                <br />
                <Box sx={{ width: "30px", margin: "auto" }}>
                  <BouncingDotsLoader />
                </Box>
              </TitleText>
            )}
            {talkReady && (
              <TitleText variant="h2" textAlign={"center"}>
                Talk to the Feedback Agent
              </TitleText>
            )}
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
                    console.log("turning voice mode..");
                    setShowMore(true);
                    initiateVoiceMode();
                    loopForVoiceMode();
                  }}
                />
              </Box>
              {transcript.trim() != "" && (
                <Box display={"flex"} flexDirection={"column"}>
                  <JumboInput
                    fieldName="comment"
                    label="Tell us about your experience"
                    value={transcript}
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: "25px" }}
                  />
                </Box>
              )}
              <Box hidden sx={{ marginTop: "25px" }}>
                <DzFeedback
                  UploadAreaText="Select Your Image"
                  FileText="Your Image"
                />
              </Box>
              {transcript.trim() != "" && (
                <Box sx={{ textAlign: "center" }}>
                  <Button type="submit" variant="contained" color="primary">
                    Share My Experience
                  </Button>
                </Box>
              )}
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
              <Box sx={{ textAlign: "center", marginBottom: "30px" }}>
                <img src={siteLogo} width={150} />
              </Box>
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
};

export default Feedback;
