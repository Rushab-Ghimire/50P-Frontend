import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
  useTheme,
  Box,
  Typography,
} from "@mui/material";
import { JumboDdMenu } from "@jumbo/components";
import { getCall, sweetAlerts } from "@app/_utilities/http";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import { getFormattedDate } from "@app/_utilities/helpers";
import CircularProgress from "@mui/material/CircularProgress";

// const invoicesData = [
//   {
//     invoice_no: "#133",
//     amount: "$5",
//     billing_date: "1 March, 2024",
//     due_date: "7 March, 2024",
//     status: "due",
//     other: "pay",
//   },
//   {
//     invoice_no: "#132",
//     amount: "$5",
//     billing_date: "1 Feb, 2024",
//     due_date: "7 Feb, 2024",
//     status: "paid",
//     other: "print",
//   },
//   {
//     invoice_no: "#131",
//     amount: "$5",
//     billing_date: "1 Jan, 2024",
//     due_date: "7 Jan, 2024",
//     status: "paid",
//     other: "print",
//   },
// ];

const tableHeadStyle = { fontSize: "18px" };
const tableCellStyle = { fontSize: "16px" };

const PaymentDetails = () => {
  const theme = useTheme();
  const Swal = useSwalWrapper();
  const [invoices, setInvoices] = React.useState([]);
  const [loadingData, setLoadingData] = React.useState(false);

  const getInvoices = React.useCallback(async () => {
    try {
      setLoadingData(true);
      const response = await getCall({
        path: "/payment/customer-invoices",
      });
      setInvoices(response);
      setLoadingData(false);
    } catch (error) {
      sweetAlerts("error", "Faild to load invoices.", Swal, theme);
      setInvoices([]);
      setLoadingData(false);
    }
  }, []);

  React.useEffect(() => {
    getInvoices();
  }, []);
  return (
    <>
      {loadingData && <CircularProgress />}
      {invoices.length > 0 && (
        <TableContainer>
          <Table sx={{ minWidth: 760 }}>
            <TableHead>
              <TableRow
                sx={{
                  "th:first-child": {
                    pl: 3,
                  },
                  "th:last-child": {
                    pr: 3,
                  },
                }}
              >
                <TableCell width={200} sx={tableHeadStyle}>
                  Invoice Date
                </TableCell>
                <TableCell width={200} sx={tableHeadStyle}>
                  Amount
                </TableCell>
                <TableCell width={120} sx={tableHeadStyle}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices?.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "td:first-child": {
                      pl: 3,
                    },
                    "td:last-child": {
                      pr: 3,
                    },
                  }}
                >
                  <TableCell sx={tableCellStyle}>
                    {getFormattedDate(item.date, "MMMM DD, YYYY")}
                  </TableCell>
                  <TableCell sx={tableCellStyle}>${item.total / 100}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.status}
                      color={item?.status == "paid" ? "success" : "error"}
                      size="small"
                      sx={{ textTransform: "capitalize", fontSize: "16px" }}
                    />
                  </TableCell>
                  {/* <TableCell>
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                  <Chip
                    label={item?.other}
                    size="small"
                    sx={{ textTransform: "capitalize", fontSize: "16px" }}
                  />
                </Stack>
              </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {!loadingData && invoices.length < 1 && (
        <Box>
          <Typography variant="p">No data</Typography>
        </Box>
      )}
    </>
  );
};

export default PaymentDetails;
