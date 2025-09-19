import React from "react";
import {
  NBBankLogo,
  NBContainer,
  NBSectionTitle,
  NBSlectBankCard,
} from "@app/_styles/NewBusiness";
import { JumboCard } from "@jumbo/components";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import CitiBankLogo from "/assets/images/new-business/citi.png";
import ChaseBankLogo from "/assets/images/new-business/chase.png";
import UsBankLogo from "/assets/images/new-business/us.png";
import PncBankLogo from "/assets/images/new-business/pnc.png";

const ButtonStyles = {
  width: "100%",
  display: "block",
  padding: "4px",
};

const BusinessSelectBank = () => {
  const [selectBank, setSelectBank] = React.useState("");

  const handleChange = (event, newSetSelectBank) => {
    setSelectBank(newSetSelectBank);
  };
  return (
    <NBContainer>
      <NBSectionTitle>Select Your Bank</NBSectionTitle>
      <ToggleButtonGroup
        color="primary"
        value={selectBank}
        exclusive
        onChange={handleChange}
        sx={{ width: "100%" }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} lg={4}>
            <Paper elevation={3}>
              <ToggleButton value="citi" sx={ButtonStyles}>
                <NBSlectBankCard>
                  <Stack>
                    <NBBankLogo src={CitiBankLogo} />
                  </Stack>
                  <Stack>
                    <Typography variant="h5" sx={{ m: 0 }}>
                      Citi Bank
                    </Typography>
                  </Stack>
                </NBSlectBankCard>
              </ToggleButton>
            </Paper>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Paper elevation={3}>
              <ToggleButton value="chase" sx={ButtonStyles}>
                <NBSlectBankCard>
                  <Stack>
                    <NBBankLogo src={ChaseBankLogo} />
                  </Stack>
                  <Stack>
                    <Typography variant="h5" sx={{ m: 0 }}>
                      Chase Bank
                    </Typography>
                  </Stack>
                </NBSlectBankCard>
              </ToggleButton>
            </Paper>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Paper elevation={3}>
              <ToggleButton value="pnc" sx={ButtonStyles}>
                <NBSlectBankCard>
                  <Stack>
                    <NBBankLogo src={PncBankLogo} />
                  </Stack>
                  <Stack>
                    <Typography variant="h5" sx={{ m: 0 }}>
                      PNC Bank
                    </Typography>
                  </Stack>
                </NBSlectBankCard>
              </ToggleButton>
            </Paper>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Paper elevation={3}>
              <ToggleButton value="us" sx={ButtonStyles}>
                <NBSlectBankCard>
                  <Stack>
                    <NBBankLogo src={UsBankLogo} />
                  </Stack>
                  <Stack>
                    <Typography variant="h5" sx={{ m: 0 }}>
                      US Bank
                    </Typography>
                  </Stack>
                </NBSlectBankCard>
              </ToggleButton>
            </Paper>
          </Grid>
        </Grid>
      </ToggleButtonGroup>
    </NBContainer>
  );
};

export default BusinessSelectBank;
