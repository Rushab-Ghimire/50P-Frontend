import React from "react";
import { StatsWidget } from "./widget";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import { Box, Grid } from "@mui/material";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { PatientExpensesBarChart } from "./charts/PatientExpenses";
const PatientQuickStats = () => {
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <StatsWidget
            vertical={false}
            currency="USD"
            cost="200"
            subTitle={"Bearing Cost"}
            icon={<AttachMoneyOutlinedIcon />}
            color="#0399e3"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatsWidget
            vertical={false}
            currency="USD"
            cost="400"
            subTitle={"Insurance Cost"}
            icon={<SecurityOutlinedIcon />}
            color="#0399e3"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatsWidget
            vertical={false}
            cost="27"
            subTitle={"Doctor's Appointments"}
            icon={<EventAvailableOutlinedIcon />}
            color="#0399e3"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatsWidget
            vertical={false}
            currency="USD"
            cost="270"
            subTitle={"coPay Amount With Insurance"}
            icon={<AttachMoneyOutlinedIcon />}
            color="#0399e3"
          />
        </Grid>
      </Grid>
      <Box sx={{ marginTop: "30px" }}>
        <PatientExpensesBarChart />
      </Box>
    </>
  );
};

export default PatientQuickStats;
