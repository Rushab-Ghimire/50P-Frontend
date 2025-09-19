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
import { useEffect, useState } from "react";

const NotificationNormal = ({ item }) => {
  //console.log("itezzzzzzzzm", item);
  const navigate = useNavigate();
  const [labelText, setLabelText] = useState("View");

  useEffect(() => {
    if (item.payload.event_type == "POSTED_MESSAGE") {
      setLabelText("View");
    } else if (
      item.payload.event_type == "BOOKING_REQUEST_PATIENT" ||
      item.payload.event_type == "BOOKING_REQUEST_PROVIDER"
    ) {
      setLabelText("View");
    } else {
      setLabelText("View Requests");
    }
  });

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
            display: "none",
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
          {item.payload.message.replace(/<\/?[^>]+(>|$)/g, "")}
          <Span sx={{ color: "text.secondary", mt: 0.5 }}>
            {getDateElements(item.date).time}
          </Span>
        </Typography>

        <ListItemButton
          component="a"
          onClick={() => {
            if (item.payload.event_type == "BOOKING_REQUEST_PROVIDER") {
              navigate(`/askdaysi/appointment-request`);
            } else if (item.payload.event_type == "BOOKING_REQUEST_PATIENT") {
              navigate(`/askdaysi/my-appointments`);
            } else if (item.payload.event_type == "POSTED_MESSAGE") {
              window.showGeneralDialog(
                "DoctorPatientChat",
                item.payload.booking_id
              );
            } else {
              navigate(`/salon/queue`);
            }
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
          <ListItemText primary={labelText} />
        </ListItemButton>
      </ListItemText>
    </ListItemButton>
  );
};
export { NotificationNormal };
