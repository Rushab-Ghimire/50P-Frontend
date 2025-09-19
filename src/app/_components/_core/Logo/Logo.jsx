import { Div, Link } from "@jumbo/shared";
import PropTypes from "prop-types";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";

const Logo = ({ mini = false, mode = "light", sx }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Div sx={{ display: "inline-flex", ...sx }}>
      <Link to={"javascript:void(0)"}>
        {matches ? (
          <img
            src={
              mode === "light"
                ? `/assets/images/logo-small.png`
                : `/assets/images/logo-small.png`
            }
            alt="TileFlexAI Logo"
            width={35}
            style={{ verticalAlign: "middle" }}
          />
        ) : (
          <img
            src={
              mode === "light"
                ? `/assets/images/logo.png`
                : `/assets/images/logo.png`
            }
            alt="TileFlexAI Logo"
            width={100}
            style={{ verticalAlign: "middle" }}
          />
        )}
        {/* <img
          src={
            mode === "light"
              ? `/assets/images/logo.png`
              : `/assets/images/logo.png`
          }
          alt="TileFlexAI Logo"
          width={100}
          xheight={35}
          style={{ verticalAlign: "middle" }}
        /> */}
        {/* {!mini ? (
          <img
            src={
              mode === "light"
                ? `/assets/images/logo.png`
                : `/assets/images/logo.png`
            }
            alt="TileFlexAI Logo"
            width={100}
            xheight={35}
            style={{ verticalAlign: "middle" }}
          />
        ) : (
          <img
            src={
              mode === "light"
                ? `/assets/images/logo.png`
                : `/assets/images/logo.png`
            }
            alt="TileFlexAI Logo"
            width={35}
            height={35}
            style={{ verticalAlign: "middle" }}
          />
        )} */}
      </Link>
    </Div>
  );
};

export { Logo };

Logo.propTypes = {
  mini: PropTypes.bool,
  mode: PropTypes.oneOf(["light", "semi-dark", "dark"]).isRequired,
  sx: PropTypes.object,
};
