import React from "react";
import { NBBtn, NBContainer, NBSectionTitle } from "@app/_styles/NewBusiness";
import { JumboCard } from "@jumbo/components";
import { Box, Stack, TextField, Typography } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const BusinessSignIn = () => {
  return (
    <NBContainer>
      <NBSectionTitle>Sign In To Your Bank Account</NBSectionTitle>
      <Box
        display={"flex"}
        gap="20px"
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ marginBottom: "40px" }}
      >
        <Stack>
          <AccountBalanceIcon sx={{ fontSize: "100px" }} />
        </Stack>
        <Stack>
          <Typography variant="h3">Sample Bank</Typography>
          <Typography variant="h5">777-567-1235</Typography>
        </Stack>
      </Box>
      <Box sx={{ maxWidth: { sx: "100%", md: "50%" }, margin: "auto" }}>
        <form>
          <TextField
            type="text"
            label="User ID"
            variant="outlined"
            name="user_id"
            size="small"
            fullWidth
            required
            sx={{ marginBottom: "25px" }}
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            name="password"
            size="small"
            fullWidth
            required
            sx={{ marginBottom: "25px" }}
          />
        </form>
      </Box>
    </NBContainer>
  );
};

export default BusinessSignIn;
