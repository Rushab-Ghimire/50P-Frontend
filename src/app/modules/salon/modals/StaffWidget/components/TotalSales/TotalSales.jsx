import { JumboCard } from "@jumbo/components";
import { Span } from "@jumbo/shared";
import { TrendingDown } from "@mui/icons-material";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import { Chip } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import PropTypes from "prop-types";

const TotalSales = ({ title, currency, sales }) => {
  return (
    <JumboCard
      title={
        <Typography variant={"h3"} mb={0} fontWeight={"500"}>
          {title}
        </Typography>
      }
      action={
        <Stack direction={"row"} spacing={1}>
          <AttachMoneyOutlinedIcon fontSize={"medium"} />
        </Stack>
      }
      contentSx={{}}
      contentWrapper={true}
      headerSx={{ borderBottom: 1, borderBottomColor: "divider" }}
      sx={{ marginBottom: "25px" }}
    >
      <Typography variant={"h2"} fontWeight={"500"}>
        {sales}
      </Typography>
    </JumboCard>
  );
};

export { TotalSales };

TotalSales.propTypes = {
  title: PropTypes.node,
};
