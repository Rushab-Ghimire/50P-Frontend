import React from "react";
import { JumboCard } from "@jumbo/components";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { NBContainer, NBSectionTitle } from "@app/_styles/NewBusiness";

const ConnectAccount = ({ fxn }) => {
  return (
    <NBContainer>
      <NBSectionTitle>Connect Your Account</NBSectionTitle>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4">
          Save hours of work by tax filing automatically
        </Typography>
        <Link to="">
          <Button
            variant="contained"
            color="primary"
            startIcon={<LockOutlinedIcon />}
            sx={{
              mt: 1,
            }}
            onClick={fxn}
          >
            Connect Account
          </Button>
        </Link>
      </Box>
    </NBContainer>
  );
};

export default ConnectAccount;
