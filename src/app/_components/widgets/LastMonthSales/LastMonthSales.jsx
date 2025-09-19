import { OnlineSignupChart } from "@app/_components/charts";
import { JumboCard } from "@jumbo/components";
import { Div } from "@jumbo/shared";
import { Timeline } from "@mui/icons-material";
import PropTypes from "prop-types";
import { Colors } from "@app/_themes/TileFlex";

function LastMonthSales({ subheader }) {
  return (
    <JumboCard
      title="756+"
      subheader={subheader}
      action={<Timeline />}
      bgcolor={[Colors.light_blue, Colors.dark_blue_1]}
      textColor="common.white"
      reverse={true}
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

export { LastMonthSales };

LastMonthSales.propTypes = {
  subheader: PropTypes.node.isRequired,
};
