import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";
import { FeaturesListPremium } from "../FeaturesList";
import PropTypes from "prop-types";
import { Colors } from "@app/modules/AskDaysi/theme/colors";

const PricePlanItemPremium = ({
  title,
  subheader,
  children,
  headerSx,
  sx,
  tagline,
  tagline1,
}) => {
  return (
    <Card
      sx={{
        border: "2px solid #c96ee2",
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
          {subheader}{" "}
          <Typography
            variant="span"
            sx={{
              display: "inline-block",
              backgroundColor: Colors.secondary,
              color: Colors.white,
              borderRadius: "30px",
              padding: "5px 10px",
              fontSize: "16px",
            }}
          >
            Most Popular
          </Typography>
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
        <Typography
          variant="p"
          sx={{ fontSize: "20px", fontWeight: "500", mt: 1, mb: 1 }}
        >
          {tagline1}
        </Typography>
        <FeaturesListPremium />
      </CardContent>
    </Card>
  );
};

export { PricePlanItemPremium };

PricePlanItemPremium.propTypes = {
  title: PropTypes.node.isRequired,
  subheader: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  headerSx: PropTypes.object.isRequired,
  sx: PropTypes.object,
};
