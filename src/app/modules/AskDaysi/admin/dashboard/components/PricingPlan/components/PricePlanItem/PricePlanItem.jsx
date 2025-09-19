import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";
import { FeaturesList } from "../FeaturesList";
import PropTypes from "prop-types";

const PricePlanItem = ({
  title,
  subheader,
  children,
  headerSx,
  sx,
  tagline,
}) => {
  return (
    <Card
      sx={{
        border: "1px solid #E0E0E0",
        borderRadius: "20px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        transform: "scale(.95)",
        transition: "all .2s ease-in-out",
        "&:hover": {
          transform: "scale(1)",
        },
        ...sx,
      }}
    >
      <Box sx={{ padding: "24px" }}>
        <Typography variant="h3" sx={{ fontSize: "28px", fontWeight: "500" }}>
          {subheader}
        </Typography>
        <Typography variant="p" sx={{ fontSize: "20px" }}>
          {tagline}
        </Typography>
        <Typography
          variant="h3"
          sx={{ fontSize: "36px", fontWeight: "600", marginTop: "24px" }}
        >
          {title}
        </Typography>
      </Box>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 0,
        }}
      >
        {children}
        <FeaturesList />
      </CardContent>
    </Card>
  );
};

export { PricePlanItem };

PricePlanItem.propTypes = {
  title: PropTypes.node.isRequired,
  subheader: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  headerSx: PropTypes.object.isRequired,
  sx: PropTypes.object,
};
