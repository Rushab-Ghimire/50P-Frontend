import React, { useRef } from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Box, Button, DialogActions, Stack, Typography } from "@mui/material";
import {
  BARecFoot,
  BARecHead,
  BARecService,
  BASampleLogo,
} from "@app/_styles/BookAppointment";
import sampleLogo from "/assets/images/receipt/sample-logo.jpg";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const ServicesReceipt = ({ fxn, bookingData }) => {
  const pdfRef = useRef();
  var mKey = 0;

  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 15;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save(`Receipt.pdf`);
    });
  };
  return (
    <>
      <DialogContent ref={pdfRef}>
        <DialogContentText>
          <BARecHead>
            <BASampleLogo src={bookingData?.organization?.logo} />
            {bookingData?.organization?.receipt_header.map((item) => (
              <Typography key={mKey++} variant="">
                {item}
              </Typography>
            ))}
            <Typography variant="">
              Served by: {bookingData?.organization?.staff}
            </Typography>
          </BARecHead>

          {bookingData?.services?.map((service) => (
            <BARecService>
              <Stack>
                {service.title} [{service.ttl}]
              </Stack>
              <Stack>
                {service.amount_display} <br />
              </Stack>
            </BARecService>
          ))}

          <BARecService>
            <Stack></Stack>
            <Stack>
              ----------------
              <br />
            </Stack>
          </BARecService>

          <BARecService>
            <Stack>
              <Typography variant="">Sub Total</Typography>
              {bookingData?.totals?.taxes.map((item) => (
                <Typography key={mKey++} variant="">
                  {item.key} {item.value}
                </Typography>
              ))}
            </Stack>
            <Stack sx={{ textAlign: "right" }}>
              <Typography variant="">
                {bookingData?.totals?.subtotal_display}
              </Typography>
              {bookingData?.totals?.taxes.map((item) => (
                <Typography variant="">{item.amount_display}</Typography>
              ))}
              <Typography variant="">----------------</Typography>
              <Typography variant="h5" sx={{ color: "#8595A6" }}>
                Total: {bookingData?.totals?.total_display}
              </Typography>
            </Stack>
          </BARecService>
          <BARecFoot>
            <Stack>Payment via Bank</Stack>
            <Stack>{bookingData?.totals?.total_display}</Stack>
          </BARecFoot>
          <BARecFoot>
            <Stack>
              <Typography variant="h5" sx={{ color: "#8595A6" }}>
                Thank You!
              </Typography>
            </Stack>
          </BARecFoot>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={downloadPDF}>
          Print Your Invoice
        </Button>
        <Button variant="contained" onClick={fxn}>
          Complete Order
        </Button>
      </DialogActions>
    </>
  );
};

export default ServicesReceipt;
