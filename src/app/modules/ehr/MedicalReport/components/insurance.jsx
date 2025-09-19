import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { JumboCard } from "@jumbo/components";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";

function createData(type, premium, paid, due) {
  return { type, premium, paid, due };
}

const rows = [
  createData("Life Insurance", 1000, 800, 200),
  createData("Vehicle Insurance", 500, 400, 100),
];

const Insurance = ({ ehrData }) => {
  function renderTable(doc) {
    if (Object.keys(doc).length === 1) {
      doc = Object.values(doc)[0];
    }

    const div = document.getElementById("render-target");
    div.innerHTML = "";

    let table = document.createElement("table");
    //table.border = 1;
    table.width = "100%";
    for (let key in doc) {
      let row = table.insertRow();
      if (typeof doc[key] == "object") {
        row.insertCell().innerHTML = `<strong>${key.replace(/_/g, " ").replace(/^\w/, (char) => char.toUpperCase())}</strong>`;
        row.insertCell().appendChild(childTable(doc[key]));
      } else {
        row.insertCell().innerHTML = `<strong>${key.replace(/_/g, " ").replace(/^\w/, (char) => char.toUpperCase())}</strong>`;
        row.insertCell().innerHTML = doc[key];
      }
    }

    div.appendChild(table);
  }

  function childTable(obj) {
    let table = document.createElement("table");
    //table.border = 1;
    table.width = "100%";
    for (let key in obj) {
      let row = table.insertRow();
      //row.insertCell();
      row.insertCell().innerHTML = key
        .replace(/_/g, " ")
        .replace(/^\w/, (char) => char.toUpperCase());

      if (typeof obj[key] === "object") {
        row.insertCell().appendChild(childTable(obj[key]));
      } else {
        row.insertCell().innerHTML = obj[key];
      }
    }

    return table;
  }

  React.useEffect(() => {
    if (document.getElementById("render-target") !== undefined)
      if (
        ehrData?.documents[0] !== undefined &&
        Object.keys(ehrData?.documents[0]).length > 0
      )
        renderTable(ehrData?.documents[0].content);
  }, []);

  const { theme } = useJumboTheme();

  const cardHeaderStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  };

  return (
    <>
      {Object.keys(ehrData?.documents[0]).length <= 0 && (
        <JumboCard
          contentWrapper
          title={"--"}
          sx={{ marginBottom: "40px" }}
          headerSx={{ borderBottom: 1, borderBottomColor: "divider" }}
        >
          No File Uploaded
        </JumboCard>
      )}
      {Object.keys(ehrData?.documents[0]).length > 0 && (
        <JumboCard
          contentWrapper
          // title={ehrData?.documents[0]?.title}
          sx={{ marginBottom: "40px" }}
          // headerSx={{ borderBottom: 1, borderBottomColor: "divider" }}
        >
          <Box sx={cardHeaderStyle}>
            <Stack>
              <Typography variant="h3">
                {ehrData?.documents[0]?.title}
              </Typography>
            </Stack>
            <Stack>
              <Box sx={{ display: "flex", gap: "15px" }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    window.open(ehrData?.documents[0]?.file_link, "_blank");
                  }}
                >
                  Download Original Document
                </Button>
              </Box>
            </Stack>
          </Box>

          <div class="extracted-data" id="render-target"></div>
        </JumboCard>
      )}
    </>
  );
};

export default Insurance;
