import { JumboCard } from "@jumbo/components";
import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import QbImage from "/assets/images/tax/tax-filing/qb.png";
import TxImage from "/assets/images/tax/tax-filing/tx.jpg";
import { NBContainer, NBSectionTitle } from "@app/_styles/NewBusiness";
const TaxSoftware = ({ fxn }) => {
  return (
    <NBContainer>
      <NBSectionTitle>Select Tax Software</NBSectionTitle>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={2}></Grid>

        <Grid item xs={12} lg={4}>
          <JumboCard>
            <Link onClick={fxn}>
              <img src={QbImage} alt="Quick Books" width={"100%"} />
            </Link>
          </JumboCard>
        </Grid>
        <Grid item xs={12} lg={4}>
          <JumboCard>
            <Link onClick={fxn}>
              <img src={TxImage} alt="Quick Books" width={"100%"} />
            </Link>
          </JumboCard>
        </Grid>
      </Grid>
    </NBContainer>
  );
};

export default TaxSoftware;
