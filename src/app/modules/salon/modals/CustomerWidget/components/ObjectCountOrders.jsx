import { CardIconText } from "@jumbo/shared/CardIconText";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";

const ObjectCountOrders = ({ vertical, title, subTitle, icon, color }) => {
  return (
    <CardIconText
      icon={icon}
      title={
        <Typography variant={"h2"} color={color}>
          {title}
        </Typography>
      }
      subTitle={
        <Typography variant={"h4"} color={"text.primary"}>
          {subTitle}
        </Typography>
      }
      color={color}
      disableHoverEffect={true}
      hideArrow={true}
      variant={"outlined"}
      sx={{ marginBottom: "25px" }}
    />
  );
};
export { ObjectCountOrders };

ObjectCountOrders.propTypes = {
  vertical: PropTypes.bool,
  subTitle: PropTypes.node,
};
