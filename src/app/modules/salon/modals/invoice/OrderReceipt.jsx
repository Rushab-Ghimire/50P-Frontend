import React, { useRef } from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {
  Box,
  Button,
  Container,
  DialogActions,
  Stack,
  Typography,
} from "@mui/material";
import {
  BARecFoot,
  BARecHead,
  BARecService,
  BASampleLogo,
} from "@app/_styles/BookAppointment";
import sampleLogo from "/assets/images/receipt/sample-logo.jpg";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { getOrderDetail } from "@app/modules/salon/sales/Documents";
import { useQuery, useMutation } from "react-query";
import { queryClient, gqlQuery, gqlMutate } from "@app/_utilities/http.js";
import {
  BilledDate,
  BilledToContainer,
  BilledToDetails,
  BilledToTitle,
  HeaderContainer,
  HeaderDate,
  HeaderLogo,
  HeaderTitle,
  IDContainer,
  IDDetails,
  IDDetailsDesc,
  IDFirstColumn,
  IDFourthColumn,
  IDHeading,
  IDHeadingTitle,
  IDItems,
  IDItemsWrapper,
  IDSecondColumn,
  IDThirdColumn,
  IDTotal,
  IDTotalCol1,
  IDTotalCol2,
  IDTotalCol3,
  IDTotalCol4,
  IDTotalWrapper,
  PIContainer,
  PIDetails,
  PIName,
} from "@app/_styles/OrderReceipt";
import Logo from "/assets/images/logo-dark.png";
import { getFormattedDate } from "@app/_utilities/helpers";

const STStyles = {
  borderTop: "2px solid #000000",
  paddingBottom: "10px",
  paddingTop: "10px",
};

const STTextStyle = {
  fontWeight: "400",
  paddingRight: "10px",
  fontSize: "18px",
};

const TotalStyles = {
  fontSize: "22px",
  fontWeight: "500",
};

var data = {
  organization: {
    name: "TileFlexAI",
    details: [
      {
        phone: "+1 [650] 691-3277",
        gstin: "24BBBFFF56789",
        url: "http://example.com",
      },
    ],
  },
  profile: [
    {
      name: "Sarah Williams",
      email: "sarah@sarahmail.com",
      profile_image: "http://localhost:5173/assets/images/avatar/avatar10.jpg",
      phone: "+1 215 456-7890",
      address: "San Jose–San Francisco–Oakland",
    },
  ],
  services: [
    {
      title: "Haircut",
      ttl: "30 mins",
      beautician: "Nicollette",
      amount_display: "USD 90",
    },
    {
      title: "Beard Trim",
      ttl: "1hr 30 mins",
      beautician: "Lasha",
      amount_display: "USD 120",
    },
    {
      title: "Hair Trim & Blow",
      ttl: "1hr 30 mins",
      beautician: "Rasha",
      amount_display: "USD 150",
    },
  ],
  service_total: {
    payment_mode: "Bank",
    sub_total: "405",
    sub_total_display: "USD 405",
    taxes: [
      {
        key: "SGST Tax",
        value: "2.5%",
        amount: "20",
        amount_display: "USD 20",
      },
      {
        key: "CGST Tax",
        value: "3%",
        amount: "25",
        amount_display: "USD 25",
      },
    ],
    total: "450",
    total_display: "USD 455",
  },
};

const OrderReceipt = ({ order_id = 14 }) => {
  const pdfRef = useRef();
  var mKey = 0;

  const {
    data: dataInvoice,
    isLoading: isLoadingFetch,
    isError: isErrorFetch,
    error: errorFetch,
  } = useQuery({
    queryKey: ["invoice", { id: order_id }],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData: order_id === undefined ? -1 : { gql: getOrderDetail(order_id) },
      }),
  });

  if (dataInvoice && order_id != -1) {
    console.log("dataInvoice", dataInvoice);
    if (dataInvoice.rows) {
      data = JSON.parse(dataInvoice.rows);
    }
  }

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
    <>
      <DialogContent>
        <DialogContentText>
          <Container ref={pdfRef}>
            <HeaderContainer>
              <Stack>
                <HeaderLogo src={Logo} alt="Logo" />
              </Stack>
              <Stack>
                <Box>
                  <HeaderTitle variant="h1">Invoice</HeaderTitle>
                </Box>
              </Stack>
            </HeaderContainer>
            <BilledToContainer>
              <Stack>
                <BilledToTitle>Billed To</BilledToTitle>
                <BilledToDetails>
                  {data?.profile && (
                    <React.Fragment>
                      <BilledToDetails variant="h5">
                        {data?.profile?.name}
                      </BilledToDetails>
                      <BilledToDetails variant="h5">
                        {data?.profile?.email}
                      </BilledToDetails>
                      <BilledToDetails variant="h5">
                        {data?.profile?.phone}
                      </BilledToDetails>
                      <BilledToDetails variant="h5">
                        {data?.profile?.address}
                      </BilledToDetails>
                    </React.Fragment>
                  )}
                </BilledToDetails>
              </Stack>
              <Stack>
                <BilledToTitle>Invoice Date</BilledToTitle>
                <BilledToDetails>
                  {getFormattedDate(data?.invoice_date, "MMMM DD, YYYY")}
                </BilledToDetails>
              </Stack>
            </BilledToContainer>
            <IDContainer>
              <IDHeading>
                <IDFirstColumn>
                  <IDHeadingTitle>Item</IDHeadingTitle>
                </IDFirstColumn>

                <IDFourthColumn>
                  <IDHeadingTitle>Total</IDHeadingTitle>
                </IDFourthColumn>
              </IDHeading>
              <IDItemsWrapper>
                {data?.services?.map((service, index) => (
                  <IDItems key={index}>
                    <Stack>
                      <IDFirstColumn>
                        <IDDetailsDesc>
                          {service.title}{" "}
                          {service.ttl != "" ? "[" + service.ttl + "]" : ""}
                        </IDDetailsDesc>
                      </IDFirstColumn>
                    </Stack>

                    <IDFourthColumn>
                      <IDDetailsDesc>{service.amount_display}</IDDetailsDesc>
                    </IDFourthColumn>
                  </IDItems>
                ))}
              </IDItemsWrapper>
              <IDTotalWrapper>
                <IDTotal>
                  <IDTotalCol1></IDTotalCol1>
                  <IDTotalCol2></IDTotalCol2>
                  <IDTotalCol3>
                    <IDDetailsDesc sx={STTextStyle}>Sub Total</IDDetailsDesc>
                  </IDTotalCol3>
                  <IDTotalCol4>
                    <IDDetailsDesc sx={STTextStyle}>
                      {data.service_total.sub_total_display}
                    </IDDetailsDesc>
                  </IDTotalCol4>
                </IDTotal>
                {data.service_total.taxes.map((data, index) => (
                  <IDTotal key={index}>
                    <IDTotalCol1></IDTotalCol1>
                    <IDTotalCol2></IDTotalCol2>
                    <IDTotalCol3>
                      <IDDetailsDesc sx={STTextStyle}>{data.key}</IDDetailsDesc>
                    </IDTotalCol3>
                    <IDTotalCol4>
                      <IDDetailsDesc sx={STTextStyle}>
                        {data.amount_display}
                      </IDDetailsDesc>
                    </IDTotalCol4>
                  </IDTotal>
                ))}
              </IDTotalWrapper>
              <IDTotal>
                <IDTotalCol1>
                  <IDDetailsDesc sx={{ fontSize: "24px" }}>
                    Thank You!
                  </IDDetailsDesc>
                </IDTotalCol1>
                <IDTotalCol2></IDTotalCol2>
                <IDTotalCol3 sx={STStyles}>
                  <IDDetailsDesc sx={TotalStyles}>Total</IDDetailsDesc>
                </IDTotalCol3>
                <IDTotalCol4 sx={STStyles}>
                  <IDDetailsDesc sx={TotalStyles}>
                    {data.service_total.total_display}
                  </IDDetailsDesc>
                </IDTotalCol4>
              </IDTotal>
            </IDContainer>
            <PIContainer>
              <Stack>
                <PIDetails>
                  Payment Via {data.service_total.payment_mode}
                </PIDetails>
              </Stack>
              <Stack textAlign={"right"}>
                <PIName>{data?.organization?.name}</PIName>
                {data?.organization?.details.map((data, index) => (
                  <React.Fragment key={index}>
                    <PIDetails>Tel: {data.phone}</PIDetails>
                    <PIDetails>GSTIN: {data.gstin}</PIDetails>
                    <PIDetails>{data.url}</PIDetails>
                  </React.Fragment>
                ))}
              </Stack>
            </PIContainer>
            <Box>
              <Stack>
                <IDDetailsDesc sx={{ marginTop: "60px", textAlign: "center" }}>
                  Taking care of your looks is WORSHIP!
                </IDDetailsDesc>
              </Stack>
            </Box>
          </Container>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={downloadPDF}>
          Print Your Invoice
        </Button>
      </DialogActions>
    </>
  );
};

export default OrderReceipt;
