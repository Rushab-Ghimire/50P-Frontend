import { NBContainer, NBInput, NBSectionTitle } from "@app/_styles/NewBusiness";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

const CampaignFields = () => {
  const [campaign, setCampaign] = useState("");
  const handleChange = (e) => {
    setCampaign(e.target.value);
  };

  const [audience, setAudience] = useState("");
  const handleAudience = (e) => {
    setAudience(e.target.value);
  };
  return (
    <NBContainer>
      <NBSectionTitle>Create Your Campaign</NBSectionTitle>
      <form>
        <NBInput>Select Your Campaign</NBInput>
        <FormControl fullWidth sx={{ marginBottom: "25px" }}>
          <Select value={campaign} onChange={handleChange} displayEmpty>
            <MenuItem value="">Select Your Campaign</MenuItem>
            <MenuItem value="A">Mid Week Discount</MenuItem>
            <MenuItem value="B">Refer A Friend</MenuItem>
            <MenuItem value="C">Flat 25% Discount</MenuItem>
            <MenuItem value="D">Flat 50% Discount</MenuItem>
          </Select>
        </FormControl>
        <NBInput>Target Audiences</NBInput>
        <FormControl fullWidth sx={{ marginBottom: "25px" }}>
          <Select value={audience} onChange={handleAudience} displayEmpty>
            <MenuItem value="">Select Your Audiences</MenuItem>
            <MenuItem value="gold">Gold Level Audiences</MenuItem>
            <MenuItem value="silver">Silver Level Audiences</MenuItem>
            <MenuItem value="bronze">Bronze Level Audiences</MenuItem>
          </Select>
        </FormControl>
        <NBInput>Discount Percentage</NBInput>
        <TextField
          placeholder="Enter the value in percentage"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "25px" }}
        />
      </form>
    </NBContainer>
  );
};

export default CampaignFields;
