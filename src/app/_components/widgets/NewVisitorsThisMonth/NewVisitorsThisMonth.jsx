import { EmailCampaignChart } from "@app/_components/charts";
import { JumboCard } from "@jumbo/components";
import { Div } from "@jumbo/shared";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PropTypes from "prop-types";
import { Colors } from "@app/_themes/TileFlex";

const NewVisitorsThisMonth = ({ subheader }) => {
  return (
    <JumboCard
      title={"24,569"}
      subheader={subheader}
      action={<TrendingUpIcon fontSize={"small"} />}
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
        <EmailCampaignChart />
      </Div>
    </JumboCard>
  );
};

export { NewVisitorsThisMonth };

NewVisitorsThisMonth.propTypes = {
  subheader: PropTypes.node.isRequired,
};
