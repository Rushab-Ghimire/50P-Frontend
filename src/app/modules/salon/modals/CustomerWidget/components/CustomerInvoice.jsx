import React from "react";
import { JumboCard } from "@jumbo/components";
import { Box, Button, Stack, Typography } from "@mui/material";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import { CWNotification } from "@app/_styles/CustomerWidgets";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";

const CustomerInvoice = ({ invoices }) => {
  return (
    <JumboCard
      title={
        <Typography variant={"h3"} mb={0} fontWeight={"500"}>
          Invoice
        </Typography>
      }
      action={
        <Stack direction={"row"} spacing={1}>
          <EventNoteOutlinedIcon fontSize={"medium"} />
        </Stack>
      }
      contentSx={{}}
      contentWrapper={true}
      headerSx={{ borderBottom: 1, borderBottomColor: "divider" }}
      sx={{ marginBottom: "25px" }}
    >
      {invoices.map((data, index) => (
        <CWNotification key={index}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant={"h4"}
              fontWeight={"500"}
              sx={{ marginBottom: 0 }}
            >
              {data.invoice_date}
            </Typography>
            <Button variant="outlined" size="small" color="primary">
              View
            </Button>
          </Box>
        </CWNotification>
      ))}
    </JumboCard>
  );
};

export default CustomerInvoice;
