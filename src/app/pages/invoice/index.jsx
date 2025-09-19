import React, { useRef, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Paper,
  Grid,
  Stack,
  Button,
} from "@mui/material";
import Logo from "/assets/images/logo.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Link } from "react-router-dom";

const thStyle = {
  fontSize: "16px",
  color: "#000",
};

const tcStyle = {
  fontSize: "16px",
  color: "#000",
  fontWeight: "600",
};

function Invoice() {
  const [items] = useState([
    { description: "Lorem Ipsum Dolor Asit", price: 100 },
    { description: "Consectetur Adipiscing Elit", price: 200 },
    { description: "Sed Do Eiusmod Tempor", price: 150 },
  ]);

  const getSubtotal = () => {
    return items.reduce((acc, item) => acc + item.price, 0);
  };

  const getTax = (subtotal) => {
    return subtotal * 0.1; // 10% tax
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    const tax = getTax(subtotal);
    return (subtotal + tax).toFixed(2);
  };

  const subtotal = getSubtotal();
  const tax = getTax(subtotal);

  const pdfRef = useRef();

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
      var blob = pdf.output("blob");
      window.open(URL.createObjectURL(blob));
      //pdf.save(`Receipt.pdf`);
    });
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, mt: 4, mb: 4 }} ref={pdfRef}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Stack>
            <img src={Logo} alt="Company Logo" style={{ height: 60 }} />
          </Stack>
          <Stack textAlign="right">
            <Typography variant="h2" sx={{ fontSize: "40px", mb: 0 }}>
              Invoice
            </Typography>
          </Stack>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          mb={4}
          mt={4}
          sx={{
            borderTop: "1px solid #ccc",
            borderBottom: "1px solid #ccc",
            paddingTop: 1,
            paddingBottom: 1,
          }}
        >
          <Stack>
            <Typography variant="h5" mb={0}>
              <Typography
                variant="span"
                fontWeight={"600"}
                display={"inline-block"}
              >
                Date:
              </Typography>{" "}
              5/27/2025
            </Typography>
          </Stack>
          <Stack>
            <Typography variant="h5" mb={0}>
              <Typography
                variant="span"
                fontWeight={"600"}
                display={"inline-block"}
              >
                Invoice #:
              </Typography>{" "}
              001
            </Typography>
          </Stack>
        </Box>

        <Box display="flex" justifyContent="space-between" mb={4}>
          <Box>
            <Typography variant="h4" fontWeight={"600"}>
              From:
            </Typography>
            <Typography>TileFlexAI</Typography>
            <Typography>Address Line 1</Typography>
            <Typography>City, Country</Typography>
          </Box>

          <Box>
            <Typography variant="h4" fontWeight={"600"}>
              To:
            </Typography>
            <Typography>Client Name</Typography>
            <Typography>Client Address</Typography>
            <Typography>Client City</Typography>
          </Box>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={thStyle}>S.No</TableCell>
              <TableCell sx={thStyle}>Description</TableCell>
              <TableCell sx={thStyle}>Price</TableCell>
              <TableCell sx={thStyle}>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell sx={tcStyle}>Sub Total</TableCell>
              <TableCell>${subtotal.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell sx={tcStyle}>Tax (10%)</TableCell>
              <TableCell>${tax.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell sx={tcStyle}>Total</TableCell>
              <TableCell>${getTotal()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Typography mt={8}>
          Thank you for your business https://tileflexai.com
        </Typography>
      </Paper>
      <Button variant="contained" onClick={downloadPDF} sx={{ mb: 4 }}>
        Print Your Invoice
      </Button>
    </Container>
  );
}

export default Invoice;
