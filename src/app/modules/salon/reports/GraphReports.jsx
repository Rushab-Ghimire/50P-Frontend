import React from "react";
import { SimpleLineChart } from "@app/_components/charts/line";
import { JumboCard } from "@jumbo/components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, chairs, min, price, cost) {
  return { name, chairs, min, price, cost };
}

const rows = [
  createData("Women Hair and Service", 159, 6.0, 24, 4.0),
  createData("Men Hair Service", 237, 9.0, 37, 4.3),
  createData("Nail Services", 262, 16.0, 24, 6.0),
  createData("Pedicure", 305, 3.7, 67, 4.3),
  createData("Skin Care", 356, 16.0, 49, 3.9),
];
const GraphReports = () => {
  return (
    <>
      <SimpleLineChart title="Revenue Reports" />
      <TableContainer component={Paper} sx={{ marginTop: "25px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Categories</TableCell>
              <TableCell align="center">Chairs</TableCell>
              <TableCell align="center">Avg. Minutes</TableCell>
              <TableCell align="center">Average Price</TableCell>
              <TableCell align="center">Direct Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.chairs}</TableCell>
                <TableCell align="center">{row.min}</TableCell>
                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="center">{row.cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default GraphReports;
