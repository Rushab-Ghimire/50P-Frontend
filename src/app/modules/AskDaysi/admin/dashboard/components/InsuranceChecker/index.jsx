import { Div } from "@jumbo/shared";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import React, { forwardRef, useCallback, useImperativeHandle } from "react";
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
import InsuranceSelector from "@app/modules/AskDaysi/public/components/form-components/InsuranceSelector";
import { checkInsurance } from "../../pages/profile/Documents";
import { JumboCard } from "@jumbo/components";

import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AdvFilterInsuranceSelector from "@app/modules/AskDaysi/public/components/form-components/AdvFilterInsuranceSelector";

var business = [];

export const validationSchema = Yup.object().shape({
  subscription_number: Yup.string()
    .min(6, "Subscription Number must be at least 6 characters")
    .required("Subscription Number is required"),
  member_id: Yup.string()
    .min(10, "Membership ID must be at least 10 characters")
    .required("Member ID is required"),
});

var fD = {};
const InsuranceChecker = forwardRef((props, ref) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [message, setMessage] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  useImperativeHandle(ref, () => {
    return {
      getValues() {
        return fD;
      },
    };
  }, []);

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

  const handleSubmit = async () => {
    var data = await validationSchema
      .validate(fD)
      .catch((error) =>
        setFormError({ isError: true, message: error.message })
      );

    if (data === undefined) {
      return;
    }

    //console.log("data", data);

    setSearchComplete(false);
    setInProgress(true);
    data.insurance_provider = insuranceProvider;
    mutate({
      inData: { gql: checkInsurance(data) },
      path: "/graphql",
      onSuccess: (dx) => {
        setInProgress(false);
        setSearchComplete(true);
        setIsFound(dx.checkInsurance.totalCount > 0 ? true : false);
      },
    });
  };

  const [isFound, setIsFound] = React.useState(false);
  const [searchComplete, setSearchComplete] = React.useState(false);
  const [inProgress, setInProgress] = React.useState(false);
  const [formError, setFormError] = React.useState({
    isError: false,
    message: "",
  });

  const handleOnChange = (d) => {
    fD = { ...fD, ...d };
    setInProgress(false);
    setSearchComplete(false);
    setFormError({ isError: false, message: "" });
  };

  const [insuranceProvider, setInsuranceProvider] = React.useState(
    props.default?.insurance_provider === undefined
      ? -1
      : props.default?.insurance_provider
  );
  //console.log("insuranceProvider", insuranceProvider);

  const setSelectedInsurances = useCallback((ins) => {
    fD = { ...fD, insurance_provider: ins[0] };
    //console.log("fD", fD);
    setInsuranceProvider((p) => ins[0]);
    setInProgress(false);
    setSearchComplete(false);
  });

  const buttonStyle = {
    backgroundColor: "#6dcff6",
    "&:hover": {
      backgroundColor: "#268ccc",
    },
  };

  //console.log("default", props.default);

  return (
    <JumboCard contentWrapper sx={{ marginTop: "20px" }}>
      <JumboForm
        validationSchema={validationSchema}
        //onSubmit={handleSubmit}
        onChange={handleOnChange}
      >
        <Typography
          variant="h3"
          sx={{
            margin: "0 0 15px 0",
            fontWeight: props.ftWeight ? `${props.ftWeight}` : "500",
          }}
        >
          Check Insurance
        </Typography>
        {formError.isError && (
          <Alert sx={{ marginBottom: "10px" }} severity="error">
            {formError.message}
          </Alert>
        )}
        <Box display={"flex"} flexDirection={"column"}>
          <AdvFilterInsuranceSelector
            setSelectedInsurance={setSelectedInsurances}
            field_name={"insurances"}
            is_multiple={false}
            selected={[insuranceProvider]}
            labelTitle="Insurances"
          />

          <JumboInput
            id="subscription_number"
            fullWidth
            size="small"
            defaultValue={props.default?.subscription_number}
            fieldName={"subscription_number"}
            label={"Subscription Number"}
            sx={{ marginBottom: "25px", marginTop: "25px" }}
          />
          <JumboInput
            id="member_id"
            fullWidth
            size="small"
            defaultValue={props.default?.member_id}
            fieldName={"member_id"}
            label={"Member Id"}
            sx={{ marginBottom: "25px" }}
          />

          {searchComplete && isFound && (
            <Box
              sx={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                marginBottom: "25px",
              }}
            >
              <CheckCircleOutlineOutlinedIcon color="success" />
              <Typography variant="h4" sx={{ mb: 0 }}>
                Your Insurance Detail Found!
              </Typography>
            </Box>
          )}
          {searchComplete && !isFound && (
            <Box
              sx={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                marginBottom: "25px",
              }}
            >
              <CancelOutlinedIcon color="error" />
              <Typography variant="h4" sx={{ mb: 0 }}>
                Your Insurance Detail Is Not Found In Our Database!
              </Typography>
            </Box>
          )}
          <LoadingButton
            type="button"
            onClick={() => {
              handleSubmit();
            }}
            variant="contained"
            color="primary"
            loading={inProgress}
            sx={buttonStyle}
          >
            Check
          </LoadingButton>
        </Box>
      </JumboForm>
    </JumboCard>
  );
});

export { InsuranceChecker };
