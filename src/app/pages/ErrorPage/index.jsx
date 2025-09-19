import { IconButton, OutlinedInput, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import { Div, Link } from "@jumbo/shared";
import { getAssetPath } from "@app/_utilities/helpers";
import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { useParams } from "react-router-dom";

const ErrorPage = () => {
  const params = useParams();
  console.log(params.mode);
  return (
    <Div
      sx={{
        flex: 1,
        flexWrap: "wrap",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: (theme) => theme.spacing(4),
      }}
    >
      <Div sx={{ display: "inline-flex", mb: 3 }}>
        <ErrorOutlineOutlinedIcon
          sx={{
            fontSize: "140px",
          }}
          color="error"
        />
      </Div>
      {params.mode === undefined && (
        <Typography
          align={"center"}
          component={"h2"}
          variant={"h1"}
          color={"text.secondary"}
          mb={3}
        >
          Oops, an error has occurred.
        </Typography>
      )}
      {params.mode == "link-expired" && (
        <Typography
          align={"center"}
          component={"h2"}
          variant={"h1"}
          color={"text.secondary"}
          mb={3}
        >
          The Link seems to be expired.
          <br />
          Request for another invitation
        </Typography>
      )}
      {params.mode == "account-activation" && (
        <Typography
          align={"center"}
          component={"h2"}
          variant={"h1"}
          color={"text.secondary"}
          mb={3}
        >
          Your account as not been Activated.
          <br />
          Please check your Email for the activation Link or Contact Support at{" "}
          <b>info@llcwebtech.com</b>
        </Typography>
      )}
      <Link to="/">
        <Button variant="contained">Go to home</Button>
      </Link>
    </Div>
  );
};

export { ErrorPage };
