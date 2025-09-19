import React, { useState, useCallback, useEffect } from "react";
import { Div } from "@jumbo/shared";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
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
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import { useNavigate } from "react-router-dom";
import { getRoles } from "@app/_utilities/helpers";

const BridgeComponent = () => {
  const { isAuthenticated, loading, userDetail } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (isAuthenticated && userDetail.organizations !== undefined) {
        if (userDetail.organizations.length <= 0) {
          navigate("/organization-details");
          return;
        } else {
          if (userDetail.organizations[0].organization.business.id == 1) {
            var roles = getRoles(userDetail.organizations);
            console.log("roles", roles);
            if (roles.length <= 0) {
              navigate("/askdaysi/configure");
            } else {
              if (
                !["doctor", "patient", "sa", "lab"].includes(roles[0].trim())
              ) {
                navigate("/askdaysi/configure");
              } else {
                if (["sa"].includes(roles[0].trim())) {
                  navigate("/askdaysi/users");
                } else if (["doctor", "lab"].includes(roles[0].trim())) {
                  navigate("/askdaysi/quick-stats");
                } else {
                  navigate("/askdaysi/dashboard");
                }
              }
            }
          } else {
            navigate("/salon/calendar");
          }
          return;
        }
      }
    }, 2000);
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div className="loader">
          <div className="inner one"></div>
          <div className="inner two"></div>
          <div className="inner three"></div>
        </div>
        <Typography variant="h3" sx={{ marginTop: "200px", color: "#268ccc" }}>
          Preparing to Launch Dashboard
        </Typography>
      </Box>
    </>
  );
};

export default BridgeComponent;
