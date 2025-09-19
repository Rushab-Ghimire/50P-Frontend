import { Box, Grid, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";
import { TotalSales } from "./components/TotalSales";
import { ObjectCountOrders } from "./components/ObjectCountOrders";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import NoteWidget from "./components/NoteWidget";
import NotificationWidget from "./components/NotificationWidget";
import { CWTgBtn } from "@app/_styles/CustomerWidgets";
import { getStaffSummary } from "@app/modules/salon/staffs/Documents";
import { useQuery, useMutation } from "react-query";
import { queryClient, gqlQuery, gqlMutate } from "@app/_utilities/http.js";
import StaffProfileWidget from "./components/StaffProfileWidget";
import StaffInvoice from "./components/StaffInvoice";
import StaffAppointment from "./components/StaffAppointment";
import StaffVoucher from "./components/StaffVoucher";

var data = {
  profile: {
    user_id: 90,
    profile_image: "/assets/images/avatar/avatar10.jpg",
    full_name: "Sarah Williams",
    email: "sarah@abc.com",
    phone: "+1 215 456-7890",
    address: "San Jose–San Francisco–Oakland",
  },
  invoices: [
    {
      invoice_date: "2025-Jan-21",
      invoice_id: 1,
    },
    {
      invoice_date: "2025-Jan-25",
      invoice_id: 2,
    },
    {
      invoice_date: "2025-Feb-21",
      invoice_id: 3,
    },
  ],
  vouchers: [
    {
      title: "25% Flat",
      status: "Sent",
    },
    {
      title: "5% Flat",
      status: "Sent",
    },
    {
      title: "10% On First Visit",
      status: "Used",
    },
  ],
  appointments: [
    {
      date: "01 December, 2024",
      services: ["30 mins - Hair Cut", "15 mins - Padicure"],
      beauticians: ["Scott Williams", "Ben Pratt"],
    },
    {
      date: "01 February, 2024",
      services: ["10 mins - Beard Trim", "15 mins - Padicure"],
      beauticians: ["Noah Franklin", "Max Gabriel"],
    },
    {
      date: "01 April, 2024",
      services: ["1hr 30 mins - Hair Cut & Blow"],
      beauticians: ["David Griffin"],
    },
  ],
  summary: {
    total_sales: "USD 2,048",
    all_appointments: 10,
    completed_appointments: 7,
    cancelled_appointments: 2,
    no_show_appointments: 1,
  },
  notes: "Very friendly customer",
};

const StaffWidget = ({ staffId }) => {
  const [widgets, setWidget] = useState(true);
  const [appointment, setAppointment] = useState(false);
  const [voucher, setVoucher] = useState(false);
  const [invoice, setInvoice] = useState(false);

  const {
    data: staff,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["staffSummary", { gql: getStaffSummary(staffId) }],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({ signal, path: "/graphql", inData: queryKey[1] }),
  });

  if (staff && staff?.rows?.length > 0) {
    data = JSON.parse(staff.rows);
    //console.log(data);
    data["summary"] = data["summary"][0];
    //console.log("loaded...", staff);
    // data.rows.map((item) => {
    //   item["onStartDelete"] = (idx) => handleStartDelete(idx);
    //   item["handleClickOpen"] = (idx) => handleClickOpen(idx);
    //   return item;
    // });
  }

  const showAppointments = () => {
    setWidget(false);
    setVoucher(false);
    setInvoice(false);
    setAppointment(true);
  };

  const showVouchers = () => {
    setWidget(false);
    setAppointment(false);
    setInvoice(false);
    setVoucher(true);
  };

  const showInvoices = () => {
    setWidget(false);
    setAppointment(false);
    setVoucher(false);
    setInvoice(true);
  };

  const showDetails = () => {
    setAppointment(false);
    setVoucher(false);
    setInvoice(false);
    setWidget(true);
  };

  const [highlight, setHighlight] = useState();

  const handleChange = (event, newhighlight) => {
    setHighlight(newhighlight);
  };
  return (
    <>
      <Grid container spacing={4} sx={{ padding: "25px 40px 0 40px" }}>
        <Grid item xs={12} md={6}>
          <StaffProfileWidget profile={data?.profile} />
          <Box>
            <ToggleButtonGroup
              color="primary"
              value={highlight}
              exclusive
              onChange={handleChange}
              orientation="vertical"
              sx={{ width: "100%" }}
            >
              <CWTgBtn value="details" selected={widgets} onClick={showDetails}>
                Details
              </CWTgBtn>
              <CWTgBtn value="appointments" onClick={showAppointments}>
                Appointments
              </CWTgBtn>
            </ToggleButtonGroup>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid item xs={12}>
            {appointment && (
              <StaffAppointment appointments={data?.appointments} />
            )}

            {widgets && (
              <React.Fragment>
                <TotalSales
                  title="Total Sales"
                  currency="USD"
                  sales={data?.summary?.total_sales}
                />
                <ObjectCountOrders
                  vertical={false}
                  title={data?.summary?.all_appointments}
                  subTitle={"All Appointments"}
                  icon={<EventAvailableOutlinedIcon />}
                  color="primary.main"
                />
                <ObjectCountOrders
                  vertical={true}
                  title={data?.summary?.completed_appointments}
                  subTitle={"Completed"}
                  icon={<CheckOutlinedIcon />}
                  color="success.main"
                />
                <ObjectCountOrders
                  vertical={true}
                  title={data?.summary?.cancelled_appointments}
                  subTitle={"Cancelled"}
                  icon={<CloseOutlinedIcon />}
                  color="error.main"
                />
                <ObjectCountOrders
                  vertical={true}
                  title={data?.summary?.no_show_appointments}
                  subTitle={"No-Show"}
                  icon={<BlockOutlinedIcon />}
                  color="warning.main"
                />
                <NoteWidget title="Client Notes" note={data?.notes} />
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default StaffWidget;
