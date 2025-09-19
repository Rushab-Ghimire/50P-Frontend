import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import NewBusiness from "..";
import { Box, Stack, Typography } from "@mui/material";
import { NBContainer } from "@app/_styles/NewBusiness";
import { Background } from "@xyflow/react";
import { Colors } from "@app/_themes/TileFlex";
import { JumboCard } from "@jumbo/components";
import { Padding } from "@mui/icons-material";

export default function ProgressMobileStepper() {
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
    <JumboCard contentWrapper>
      <Typography
        variant={"h2"}
        mb={3}
        sx={{
          borderBottom: `1px solid ${Colors.light_gray}`,
          paddingBottom: "5px",
        }}
      >
        Starting your business? Let us guide you!
      </Typography>
      <NBContainer sx={{ margin: "0 auto 10px auto" }}>
        <MobileStepper
          variant="progress"
          steps={7}
          position="static"
          activeStep={activeStep}
          sx={stepStyles}
        />
      </NBContainer>
      <NewBusiness step={activeStep} />
      <Box
        sx={{
          marginTop: "25px",
          justifyContent: "center",
          display: activeStep != 6 ? "flex" : "none",
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
            disabled={activeStep === 6}
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
  );
}
