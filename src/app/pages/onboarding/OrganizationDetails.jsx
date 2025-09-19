import { Div } from "@jumbo/shared";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import { Alert, Collapse, IconButton, alpha } from "@mui/material";
import {
  JumboForm,
  JumboInput,
  JumboSelect,
} from "@jumbo/vendors/react-hook-form";

import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import { DescText, TitleText } from "@app/_styles/onboarding";
import { Colors } from "@app/_themes/TileFlex";
import LoadingButton from "@mui/lab/LoadingButton";
import { organizationDetailValidationSchema } from "./OrganizationDetailValidation";
import {
  gqlMutate,
  gqlQuery,
  postCall,
  queryClient,
} from "@app/_utilities/http";
import { useNavigate } from "react-router-dom";
import { gql } from "graphql-request";
import { useMutation, useQuery } from "react-query";
import { queryDocument } from "@app/pages/Business/Documents";

var business = [];
export default function OrganizationDetails() {
  const navigate = useNavigate();
  const { logout, getUserDetail } = useAuth();

  const [message, setMessage] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const hideMessage = () => {
    setMessage((prev) => {
      return { ...prev, open: false };
    });
  };

  const handleChange = (event) => {
    //pass
  };

  async function handleLogout() {
    await logout();
    return navigate("/");
  }

  const handleSubmitX = (data) => {
    setInProgress(true);
    setTimeout(() => {
      setInProgress(false);
      navigate("/bridge");
    }, 3000);
  };

  const handleSubmit = async (data) => {
    setInProgress(true);
    //console.log("submitting..", data);
    try {
      const response = await postCall({
        inData: { name: data.business_name, business_id: data.business },
        path: "/organization",
      });
      await getUserDetail();
      setInProgress(false);
      navigate("/bridge");
    } catch (error) {
      console.log("error", error);
      setMessage({
        open: true,
        message:
          "An error has occurred. If the issue persists, please contact our support team.",
        severity: "error",
      });
    }
  };

  const [inProgress, setInProgress] = React.useState(false);
  const [error, setError] = React.useState({ isError: false, message: "" });
  const { userDetail } = useAuth();

  const {
    data: allBusiness,
    isLoading,
    isError,
    error: allBusinessError,
  } = useQuery({
    queryKey: ["business", { gql: queryDocument("", 0) }],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({ signal, path: "/graphql", inData: queryKey[1] }),
  });

  //console.log("allBusiness", allBusiness);
  if (allBusiness && allBusiness.rows.length > 0) {
    business = [];
    allBusiness.rows.map((item) => {
      business.push({
        value: item.id,
        label: item.title,
      });
    });
  }

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
        <CardContent
          sx={{
            flex: 1,
            padding: { xs: "32px 15px", md: "32px" },
          }}
        >
          <TitleText variant="h2">
            Dear {userDetail.first_name + " " + userDetail.last_name},
          </TitleText>
          <DescText>Please provide your organization details</DescText>
          <Stack mt={2}>
            <Collapse in={message.open}>
              <Alert severity={message.severity} onClose={hideMessage}>
                {message.message}
              </Alert>
            </Collapse>
          </Stack>

          <JumboForm
            validationSchema={organizationDetailValidationSchema}
            onSubmit={handleSubmit}
            onChange={handleChange}
            sx={{ marginTop: "25px" }}
          >
            <Stack spacing={3} mb={3}>
              <JumboInput
                fullWidth
                fieldName={"business_name"}
                label={"Business Name"}
              />

              <JumboSelect
                fieldName="business"
                label="Business Type"
                formControl={true}
                options={business}
                defaultValue=""
              />

              {error.isError && <Alert severity="error">{error.message}</Alert>}
              <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                loading={inProgress}
                sx={{ backgroundColor: Colors.dark_blue }}
              >
                Submit
              </LoadingButton>
              <Typography
                variant="h4"
                sx={{ marginTop: "10px !important", textAlign: "center" }}
              >
                Or
              </Typography>
              <LoadingButton
                variant="outlined"
                size="large"
                onClick={handleLogout}
                sx={{ marginTop: "10px !important" }}
              >
                Logout
              </LoadingButton>
              {/* </Link> */}
            </Stack>
          </JumboForm>
        </CardContent>
      </Card>
    </Div>
  );
}
