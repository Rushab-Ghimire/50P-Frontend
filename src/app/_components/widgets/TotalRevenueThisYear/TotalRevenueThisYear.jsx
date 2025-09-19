import { OnlineSignupChart } from "@app/_components/charts";
import { JumboCard } from "@jumbo/components";
import { Div } from "@jumbo/shared";
import { Chip } from "@mui/material";
import PropTypes from "prop-types";
import { Colors } from "@app/_themes/TileFlex";

function TotalRevenueThisYear({ subheader }) {
  return (
    <JumboCard
      title={"$235,659"}
      subheader={subheader}
      action={
        <Chip
          size={"small"}
          label={"2024"}
          sx={{ bgcolor: "#F5F7FA", color: "grey.800" }}
        />
      }
      textColor="common.white"
      bgcolor={[Colors.light_blue, Colors.dark_blue_1]}
      reverse
      sx={{
        borderTop: `4px solid ${Colors.light_blue}`,
        ".MuiCardHeader-title": {
          color: "inherit",
          fontSize: "1.25rem",
        },
        ".MuiCardHeader-subheader": {
          color: "inherit",
        },
      }}
    >
      <Div sx={{ p: 3, pb: 0 }}>
        <OnlineSignupChart />
      </Div>
    </JumboCard>
  );
}

export { TotalRevenueThisYear };

TotalRevenueThisYear.propTyeps = {
  subheader: PropTypes.node.isRequired,
};
