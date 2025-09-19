import React from "react";
import { FeaturedCard1 } from "@app/_components/cards";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import TouchAppOutlinedIcon from "@mui/icons-material/TouchAppOutlined";
import { JumboCard } from "@jumbo/components";
import { Grid } from "@mui/material";
import { NBSectionTitle } from "@app/_styles/NewBusiness";

const ActiveCampaign = () => {
  return (
    <JumboCard contentWrapper>
      <NBSectionTitle>Active Campaign - January</NBSectionTitle>
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
  );
};

export default ActiveCampaign;
