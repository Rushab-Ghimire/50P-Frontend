import { Div } from "@jumbo/shared";
import {
  Card,
  CardContent,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
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
import {
  gqlMutate,
  gqlQuery,
  postCall,
  queryClient,
} from "@app/_utilities/http";
import { useNavigate } from "react-router-dom";
import { gql } from "graphql-request";
import { useMutation, useQuery } from "react-query";
import * as Yup from "yup";

import providerAvatar from "/assets/images/askdaysi/configure/provider.png";
import seekerAvatar from "/assets/images/askdaysi/configure/seeker.png";
import { updateRole } from "../profile/Documents";

var business = [];

const validationSchema = Yup.object().shape({});

const ButtonStyles = {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  textAlign: "center",
  width: "100%",
  border: "1px solid #ccc !important",
  fontSize: "20px",
  textTransform: "capitalize",
  padding: "25px 10px 20px 10px",
  fontWeight: "400",
  borderRadius: "12px !important",
  "& img": {
    width: "44px",
  },
};
export default function ConfigureRoles() {
  const theme = useTheme();
  const navigate = useNavigate();
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

  const {
    mutate,
    isPending,
    isError,
    error: mError,
  } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: (e) => {},
  });

  const handleSubmit = async (data) => {
    setInProgress(true);
    mutate({
      inData: { gql: updateRole(role) },
      path: "/graphql",
      onSuccess: (dx) => {
        setInProgress(false);
        setTimeout(() => {
          setInProgress(false);
          document.location = "/bridge";
        }, 500);
      },
    });
  };

  const [inProgress, setInProgress] = React.useState(false);
  const [error, setError] = React.useState({ isError: false, message: "" });
  const { logout, userDetail } = useAuth();

  const [role, setRole] = React.useState("");

  const handleChangeRole = (event, newPro) => {
    setRole(newPro);
  };

  const toggleStyle = {
    gap: "20px",
    "& .Mui-selected": {
      border: "1px solid #6dcff6 !important",
      borderRadius: "12px",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  };

  return (
    <Div
      sx={{
        width: 720,
        maxWidth: "100%",
        margin: "auto",
        p: { xs: 2, md: 4 },
      }}
    >
      {userDetail?.first_name !== undefined && (
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
            <DescText variant="p">
              To present you with appropriate User Experience, we would like to
              understand the way you use this system
              <br />
              <br />
            </DescText>
            <DescText variant="p">This is a One-Time setting</DescText>
            <JumboForm
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              onChange={handleChange}
              sx={{ marginTop: "25px" }}
            >
              <Stack spacing={3} mb={3}>
                <DescText variant="p" sx={{ fontWeight: "400" }}>
                  Proceed as:
                </DescText>
                <ToggleButtonGroup
                  // color="primary"
                  value={role}
                  // value={""}
                  exclusive
                  onChange={handleChangeRole}
                  sx={toggleStyle}
                >
                  <ToggleButton value="doctor" sx={ButtonStyles}>
                    <img src={providerAvatar} alt="Provider" />
                    Healthcare Provider
                  </ToggleButton>
                  <ToggleButton value="patient" sx={ButtonStyles}>
                    <img src={seekerAvatar} alt="Seeker" />
                    Healthcare Seeker
                  </ToggleButton>
                </ToggleButtonGroup>
                {error.isError && (
                  <Alert severity="error">{error.message}</Alert>
                )}
                <LoadingButton
                  disabled={role != "" ? false : true}
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
      )}
    </Div>
  );
}
