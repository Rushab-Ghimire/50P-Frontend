import React from "react";
import { Box, Grid } from "@mui/material";
import { StatsWidget } from "./widget";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import { DoctorsAppointmentBarChart } from "./charts/DoctorsAppointments";
import PatientInsurancePieChart from "./charts/PatientsInsurances";

const DoctorsQuickStats = () => {
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <StatsWidget
            vertical={false}
            cost="379"
            subTitle={"Appointments"}
            icon={<EventAvailableOutlinedIcon />}
            color="#0399e3"
          />
        </Grid>
      </Grid>
      <Box sx={{ marginTop: "30px" }}>
        <PatientInsurancePieChart />
      </Box>
      <Box sx={{ marginTop: "30px" }}>
        <DoctorsAppointmentBarChart />
      </Box>
    </>
  );
};

export default DoctorsQuickStats;
