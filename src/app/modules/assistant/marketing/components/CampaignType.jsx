import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { NBContainer, NBSectionTitle } from "@app/_styles/NewBusiness";
import { Colors } from "@app/_themes/TileFlex";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";

const IconStyles = {
  fontSize: "80px",
  border: `1px solid ${Colors.light_gray}`,
  borderRadius: "50%",
  padding: "10px",
  marginBottom: "10px",
  color: Colors.light_gray_1,
  boxShadow:
    "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
};

const ButtonStyles = {
  borderRadius: "50%",
  height: "200px",
  width: "200px",
  border: "none",
};
const CampaignType = () => {
  const [selectCampaign, setSelectCampaign] = React.useState("");

  const handleChange = (event, newSelectCampaign) => {
    setSelectCampaign(newSelectCampaign);
  };
  return (
    <NBContainer>
      <NBSectionTitle>Select Your Campaign</NBSectionTitle>

      <ToggleButtonGroup
        color="primary"
        value={selectCampaign}
        exclusive
        onChange={handleChange}
        sx={{ width: "100%", textAlign: "center" }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} lg={2}></Grid>
          <Grid item xs={12} md={6} lg={4}>
            <ToggleButton value="llc" sx={ButtonStyles}>
              <Box sx={{ textAlign: "center", cursor: "pointer" }}>
                <DiscountOutlinedIcon sx={IconStyles} />
                <Typography variant="h4" textTransform={"capitalize"}>
                  Run a Discount Campaign
                </Typography>
              </Box>
            </ToggleButton>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <ToggleButton value="cor" sx={ButtonStyles}>
              <Box sx={{ textAlign: "center", cursor: "pointer" }}>
                <CardGiftcardOutlinedIcon sx={IconStyles} />
                <Typography variant="h4" textTransform={"capitalize"}>
                  Offer Loyalty Rewards
                </Typography>
              </Box>
            </ToggleButton>
          </Grid>
        </Grid>
      </ToggleButtonGroup>
    </NBContainer>
  );
};

export default CampaignType;
