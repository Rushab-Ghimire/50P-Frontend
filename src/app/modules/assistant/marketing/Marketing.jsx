import React, { useEffect, useState, useCallback } from "react";
import { Typography } from "@mui/material";
import { JumboCard } from "@jumbo/components";
import { Link } from "react-router-dom";
import { DzBasic } from "@app/_components/extensions/dropzone";
import { Colors } from "@app/_themes/TileFlex";

import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Box, Stack } from "@mui/material";
import { NBContainer } from "@app/_styles/NewBusiness";
import CampaignComponents from "./components";
import ActiveCampaign from "./components/ActiveCampaign";

const Marketing = () => {
  const afterLastStep = useCallback(() => {
    bell({
      event_name: "NEW_NOTIFICATION",
      payload: {
        event_type: "MARKETING",
        action: "REPORT",
        param: "Campaign-Mid",
        message: "Your campaign has reached 70% of the target audience!",
      },
    });

    setTimeout(() => {
      bell({
        event_name: "NEW_NOTIFICATION",
        payload: {
          event_type: "MARKETING",
          action: "REPORT",
          param: "Campaign-End",
          message: "Campaign complete! 15% increase in January sales.!",
        },
      });
    }, 2000);
  });

  useEffect(() => {
    setTimeout(() => {
      afterLastStep();
    }, 2000);
  });

  //for stepper
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(1);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const stepStyles = {
    width: "100%",
    background: "transparent",
    "& .MuiLinearProgress-root": {
      width: "100%",
      height: "6px",
    },
    "& .MuiLinearProgress-bar": {
      backgroundColor: Colors.dark_blue,
    },
  };

  return (
    <>
      <JumboCard contentWrapper>
        <Typography
          variant={"h2"}
          mb={3}
          sx={{
            borderBottom: `1px solid ${Colors.light_gray}`,
            paddingBottom: "5px",
          }}
        >
          Prepare for Slow Month
        </Typography>
        <NBContainer sx={{ margin: "0 auto 10px auto" }}>
          <MobileStepper
            variant="progress"
            steps={4}
            position="static"
            activeStep={activeStep}
            sx={stepStyles}
          />
        </NBContainer>
        <CampaignComponents step={activeStep} />
        <Box
          sx={{
            marginTop: "25px",
            justifyContent: "center",
            display: activeStep != 3 ? "flex" : "none",
            gap: "5px",
          }}
        >
          <Stack>
            <Button
              size="medium"
              variant="outlined"
              onClick={handleBack}
              disabled={activeStep === 1}
              sx={{ display: activeStep === 1 ? "none" : "" }}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          </Stack>
          <Stack>
            <Button
              size="medium"
              variant="outlined"
              onClick={handleNext}
              disabled={activeStep === 3}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          </Stack>
        </Box>
      </JumboCard>
      {activeStep === 3 && (
        <Box sx={{ marginTop: "30px" }}>
          <ActiveCampaign />
        </Box>
      )}
    </>
  );
};

export default Marketing;
