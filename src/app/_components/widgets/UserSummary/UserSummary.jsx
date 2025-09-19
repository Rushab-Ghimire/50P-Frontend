import { FeaturedCard2 } from "@app/_components/cards/FeaturedCard2/FeaturedCard2";
import { Avatar } from "@mui/material";
import PropTypes from "prop-types";

function UserSummary({ title, subheader, image }) {
  return (
    <FeaturedCard2
      avatar={
        <Avatar
          sx={{
            width: 44,
            height: 44,
            boxShadow: 2,
            position: "relative",
            backgroundColor: "#fff",
            padding: "10px",
          }}
          src={image}
          alt={""}
        />
      }
      title={title}
      subheader={subheader}
      bgcolor={["#00C4B4"]}
    />
  );
}

export { UserSummary };

UserSummary.propTypes = {
  title: PropTypes.node.isRequired,
  subheader: PropTypes.node,
};
