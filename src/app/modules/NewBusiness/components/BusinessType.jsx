import React, { useState } from "react";
import { NBBtn, NBContainer, NBSectionTitle } from "@app/_styles/NewBusiness";
import { JumboCard } from "@jumbo/components";
import { Box, Grid, Typography } from "@mui/material";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import { Colors } from "@app/_themes/TileFlex";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
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

const BusinessType = () => {
  const [selectBusiness, setSelectBusiness] = React.useState("");

  const handleChange = (event, newSelectBusiness) => {
    setSelectBusiness(newSelectBusiness);
  };
  return (
    <NBContainer>
      <NBSectionTitle>Select Your Business Type</NBSectionTitle>

      <ToggleButtonGroup
        color="primary"
        value={selectBusiness}
        exclusive
        onChange={handleChange}
        sx={{ width: "100%" }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} lg={4}>
            <ToggleButton value="llc" sx={ButtonStyles}>
              <Box sx={{ textAlign: "center", cursor: "pointer" }}>
                <AccountBalanceOutlinedIcon sx={IconStyles} />
                <Typography variant="h4">LLC</Typography>
              </Box>
            </ToggleButton>
          </Grid>
          <Grid item xs={12} lg={4}>
            <ToggleButton value="cor" sx={ButtonStyles}>
              <Box sx={{ textAlign: "center", cursor: "pointer" }}>
                <AccountBalanceOutlinedIcon sx={IconStyles} />
                <Typography variant="h4">Corporation</Typography>
              </Box>
            </ToggleButton>
          </Grid>
          <Grid item xs={12} lg={4}>
            <ToggleButton value="sole" sx={ButtonStyles}>
              <Box sx={{ textAlign: "center", cursor: "pointer" }}>
                <AccountBalanceOutlinedIcon sx={IconStyles} />
                <Typography variant="h4">
                  Sole <br />
                  Proprietorship
                </Typography>
              </Box>
            </ToggleButton>
          </Grid>
        </Grid>
      </ToggleButtonGroup>
    </NBContainer>
  );
};

export default BusinessType;
