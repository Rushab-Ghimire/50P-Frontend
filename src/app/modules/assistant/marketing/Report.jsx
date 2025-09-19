import React, { useState, useEffect } from "react";
import { Typography, Grid } from "@mui/material";
import { JumboCard } from "@jumbo/components";
import { Link } from "react-router-dom";
import { DzBasic } from "@app/_components/extensions/dropzone";
import { Colors } from "@app/_themes/TileFlex";
import { WidthNormal } from "@mui/icons-material";
import { NBSectionTitle } from "@app/_styles/NewBusiness";
import { TinyBarChart } from "@app/_components/charts/bar";
import { BeforeChart } from "./components/BeforeChart";
import { AfterChart } from "./components/AfterChart";
import { FeaturedCard1 } from "@app/_components/cards";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import TouchAppOutlinedIcon from "@mui/icons-material/TouchAppOutlined";

const Report = ({ type }) => {
  const [endReport, setEndReport] = useState(false);
  const [midReport, setMidReport] = useState(false);

  useEffect(() => {
    if (type == "Campaign-Mid") {
      setMidReport(true);
    }
    if (type == "Campaign-End") {
      setEndReport(true);
    }
  });

  return (
    <>
      {endReport && (
        <>
          <JumboCard contentWrapper>
            <Typography
              variant={"h2"}
              mb={3}
              sx={{
                borderBottom: `1px solid ${Colors.light_gray}`,
                paddingBottom: "5px",
              }}
            >
              End-of-Month Report
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={12} lg={6}>
                <BeforeChart title="Before Campaign" />
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <AfterChart title="After Campaign" />
              </Grid>
            </Grid>
          </JumboCard>
        </>
      )}

      {midReport && (
        <JumboCard contentWrapper>
          <Typography
            variant={"h2"}
            mb={3}
            sx={{
              borderBottom: `1px solid ${Colors.light_gray}`,
              paddingBottom: "5px",
            }}
          >
            Mid-Month Status
          </Typography>
          <NBSectionTitle>
            Your campaign has reached 70% of the target audience!
          </NBSectionTitle>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} lg={4}>
              <FeaturedCard1
                title={"764"}
                subheader="Targeted Audiences"
                icon={<PeopleAltOutlinedIcon sx={{ fontSize: 42 }} />}
                bgcolor={["135deg", "#FBC79A", "#D73E68"]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <FeaturedCard1
                title={"934"}
                subheader="Emails Sent"
                icon={<EmailOutlinedIcon sx={{ fontSize: 42 }} />}
                bgcolor={["135deg", "#FBC79A", "#D73E68"]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <FeaturedCard1
                title={"85%"}
                subheader="Engagement Rate"
                icon={<TouchAppOutlinedIcon sx={{ fontSize: 42 }} />}
                bgcolor={["135deg", "#FBC79A", "#D73E68"]}
              />
            </Grid>
          </Grid>
        </JumboCard>
      )}
    </>
  );
};

export default Report;
