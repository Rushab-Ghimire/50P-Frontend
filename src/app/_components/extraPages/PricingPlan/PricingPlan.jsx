import { Span } from "@jumbo/shared";
import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { PricePlanItem } from "./components";
const PricingPlan = () => {
  return (
    <React.Fragment>
      {/* <Typography variant={"h5"} mb={3}>
        Basic
      </Typography> */}
      <Grid container spacing={3.75} mb={4}>
        <Grid item xs={12} md={6} lg={4}>
          <PricePlanItem
            title={"$25"}
            subheader={"Package 1"}
            headerSx={{
              textAlign: "center",
              bgcolor: "primary.main",
            }}
          >
            <Button variant={"contained"} disableElevation sx={{ mb: 2 }}>
              Buy Now
            </Button>
          </PricePlanItem>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <PricePlanItem
            title={"$99"}
            subheader={"Package 2"}
            headerSx={{
              textAlign: "center",
              bgcolor: "primary.dark",
            }}
            sx={{
              transform: "scale(1)",
              color: "common.white",
              bgcolor: "primary.main",
            }}
          >
            <Button
              variant={"contained"}
              disableElevation
              sx={{ mb: 2, backgroundColor: "primary.dark" }}
            >
              Buy Now
            </Button>
          </PricePlanItem>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <PricePlanItem
            title={"$49"}
            subheader={"Package 3"}
            headerSx={{
              textAlign: "center",
              bgcolor: "primary.main",
            }}
          >
            <Button variant={"contained"} disableElevation sx={{ mb: 2 }}>
              Buy Now
            </Button>
          </PricePlanItem>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export { PricingPlan };
