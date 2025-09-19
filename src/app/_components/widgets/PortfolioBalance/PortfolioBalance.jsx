import { ButtonStack, Progressbar } from "@app/_components/_core";
import AddIcon from "@mui/icons-material/Add";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import React from "react";
import { BalanceSummary } from "./components";
import PropTypes from "prop-types";
import { EarningExpenses } from "@app/_components/widgets/EarningExpenses";

const PortfolioBalance = ({ title }) => {
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent sx={{ pt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <BalanceSummary
              amount={"$19,626"}
              trend={{ percentage: 8, direction: "up" }}
              label="Overall Sales"
            />
            <ButtonStack>
              <Button variant={"contained"} color={"success"}>
                New workflow
              </Button>
            </ButtonStack>
            <br />
            <br />
            <EarningExpenses />
          </Grid>
          <Grid item xs={3}>
            <Typography variant={"h5"} color={"text.secondary"} mb={2}>
              Portfolio distribution
            </Typography>
            <Progressbar
              variant={"determinate"}
              color={"success"}
              label="Hairdressing"
              subLabel="8.75 %"
              value={70}
            />
            <Progressbar
              label="Facials"
              subLabel="4.87 %"
              variant="determinate"
              color="warning"
              value={40}
            />
            <Progressbar
              label="Makeups"
              subLabel="10.87 %"
              variant="determinate"
              color="info"
              value={60}
            />
            <Progressbar
              label="Manicures & Pedicures"
              subLabel="6.87 %"
              variant="determinate"
              color="primary"
              value={40}
              sx={{ mb: 0 }}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ pt: 0.5, pb: 2 }}>
        <Button startIcon={<AddIcon />} size="small">
          View Transactions
        </Button>
      </CardActions>
    </Card>
  );
};

export { PortfolioBalance };

PortfolioBalance.propTypes = {
  title: PropTypes.node.isRequired,
};
