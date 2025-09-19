import { getDateElements } from "@app/_utilities/helpers";
import { Link, Span } from "@jumbo/shared";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import TileFlexIcon from "/assets/images/logo-small.png";
import { Colors } from "@app/_themes/TileFlex";
import { useNavigate } from "react-router-dom";

const NotificationTip = ({ item }) => {
  const navigate = useNavigate();
  return (
    <ListItemButton component={"li"} alignItems={"flex-start"}>
      <ListItemAvatar>
        <img src={TileFlexIcon} width="32px" />
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
          TileFlexAI
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
            item.payload.action == "REPORT"
              ? navigate(
                  `/assistant/${item.payload.action}/${item.payload.param}`
                )
              : navigate(`/assistant/${item.payload.event_type}`);
          }}
          sx={{
            fontSize: "12px",
            textTransform: "capitalize",
            padding: "1px",
            width: "130px",
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
          <ListItemText
            primary={
              item.payload.action == "REPORT"
                ? "View Report"
                : item.payload.event_type == "TIPS-ACT"
                  ? "Act Now"
                  : item.payload.event_type == "TIPS-LEARN"
                    ? "Learn More"
                    : item.payload.event_type == "MARKETING"
                      ? "Take Action"
                      : "Get Started"
            }
          />
        </ListItemButton>
      </ListItemText>
    </ListItemButton>
  );
};
export { NotificationTip };
