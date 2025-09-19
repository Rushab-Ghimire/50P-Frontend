import { getDateElements } from "@app/_utilities/helpers";
import { Link, Span } from "@jumbo/shared";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import {
  Avatar,
  Button,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import TileFlexIcon from "/assets/images/logo-small.png";
import { Colors } from "@app/_themes/TileFlex";
import { HowToVoteRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import daysiIcon from "/assets/images/askdaysi/global/favicon-alt.png";

const NotificationPost = ({ item }) => {
  const navigate = useNavigate();
  return (
    <ListItemButton component={"li"} alignItems={"flex-start"}>
      <ListItemAvatar>
        <img src={daysiIcon} width="32px" />
      </ListItemAvatar>
      <ListItemText>
        <Link
          underline={"none"}
          to="javascript:void(0)"
          sx={{
            fontSize: "16px",
            fontWeight: "400",
            color: Colors.dark_blue,
          }}
        >
          DaysiAI
        </Link>
        <Typography
          component="span"
          sx={{
            display: "flex",
            flexDirection: "column",
            fontSize: "90%",
            mt: 0.3,
            lineHeight: 1.2,
          }}
        >
          {item.payload.message}
          <Span sx={{ color: "text.secondary", mt: 0.5 }}>
            {getDateElements(item.date).time}
          </Span>
        </Typography>
        <ListItemButton
          component="a"
          onClick={() => {
            navigate(`/tax-filing`);
          }}
          sx={{
            fontSize: "12px",
            textTransform: "capitalize",
            padding: "1px",
            width: "120px",
            fontWeight: "300",
            backgroundColor: Colors.dark_blue,
            color: "#ffffff",
            borderRadius: "5px",
            textAlign: "center",
            marginTop: "10px",
            "&:hover": {
              backgroundColor: Colors.dark_blue_1,
            },
          }}
        >
          <ListItemText primary="Get Started" />
        </ListItemButton>
        {/* <ListItemButton
          component="a"
          href="/tax-filing"
          sx={{
            fontSize: "12px",
            textTransform: "capitalize",
            padding: "1px",
            xwidth: "150px",
            fontWeight: "300",
            backgroundColor: Colors.dark_blue,
            color: "#ffffff",
            borderRadius: "5px",
            textAlign: "center",
            "&:hover": {
              backgroundColor: Colors.dark_blue_1,
            },
          }}
        >
          <ListItemText primary="Get Started" />
        </ListItemButton> */}
      </ListItemText>
    </ListItemButton>
  );
};

export { NotificationPost };
