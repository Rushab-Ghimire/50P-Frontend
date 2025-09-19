import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";

import { CalendarWrapper } from "@app/_components/calendars/components/CalendarWrapper";
import { PopupCalendar } from "@app/_components/calendars/components/PopupCalendar";
import AdminBooking from "../booking/admin";
import React from "react";
import { Link } from "react-router-dom";

const SalonCalendar = () => {
  const { t } = useTranslation();

  const [refresh, setRefresh] = React.useState(1);

  const refreshFx = () => {
    setRefresh(refresh + 1);
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: CONTAINER_MAX_WIDTH,
        display: "flex",
        minWidth: 0,
        flex: 1,
        flexDirection: "column",
      }}
      disableGutters
    >
      <Grid container spacing={4}>
        <Grid item xs={12} lg={12}>
          <CalendarWrapper>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <Stack>
                <Typography variant="h3">All Appointments</Typography>
              </Stack>
              <Stack>
                <Box sx={{ display: "flex", gap: "15px" }}>
                  <AdminBooking refreshFx={refreshFx} />
                  <Link to="/salon/queue">
                    <Button variant="outlined" size="small">
                      Manage Waiting List
                    </Button>
                  </Link>
                </Box>
              </Stack>
            </Box>
            <PopupCalendar refreshV={refresh} />
          </CalendarWrapper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SalonCalendar;
