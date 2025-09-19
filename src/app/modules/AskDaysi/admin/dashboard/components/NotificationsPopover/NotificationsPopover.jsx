import {
  useJumboHeaderTheme,
  useJumboTheme,
} from "@jumbo/components/JumboTheme/hooks";
import { Div } from "@jumbo/shared";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NotificationImportantOutlinedIcon from "@mui/icons-material/NotificationImportantOutlined";
import {
  Button,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ThemeProvider,
  Badge,
} from "@mui/material";
import React, { useRef } from "react";
import {
  NotificationEHR,
  NotificationNormal,
  NotificationInvitation,
  NotificationPost,
  NotificationTip,
} from "./components";
import { notificationsData } from "./components/data";
import { JumboDdPopover } from "@jumbo/components/JumboDdPopover";
import { JumboIconButton } from "@jumbo/components/JumboIconButton";
import { subscribeToEvent, unsubscribeEvent } from "@app/_utilities/http.js";
import {
  getAssetPath,
  getCustomDateTime,
  getRoles,
  useArrayState,
} from "@app/_utilities/helpers";
import { ASSET_AVATARS } from "@app/_utilities/constants/paths";
import { useNavigate } from "react-router-dom";
import { GLOBAL } from "@app/_utilities/globals";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";

const NotificationComponent = {
  PROCESS: NotificationPost,
  TIP: NotificationTip,
  NORMAL: NotificationNormal,
  EHR: NotificationEHR,
};

const NotificationsPopover = () => {
  const { theme } = useJumboTheme();
  const { headerTheme } = useJumboHeaderTheme();

  const navigate = useNavigate();

  const [data, setData] = useArrayState([]);
  const { userDetail } = useAuth();

  React.useEffect(() => {
    subscribeToEvent("NEW_NOTIFICATION", newMessageEvent);
  }, []);

  const newMessageEvent = React.useCallback(
    (dataIn) => {
      if (dataIn.event_type == "IS_TYPING") {
        return;
      }

      if (
        dataIn.event_type == "BOOKING_REQUEST_PATIENT" ||
        dataIn.event_type == "BOOKING_REQUEST_PROVIDER"
      ) {
        var roles = getRoles(userDetail.organizations);
        if (
          dataIn.event_type == "BOOKING_REQUEST_PATIENT" &&
          !roles.includes("patient")
        ) {
          return;
        }
        if (
          dataIn.event_type == "BOOKING_REQUEST_PROVIDER" &&
          !roles.includes("doctor")
        ) {
          return;
        }
      }

      let newMessage = true;
      data.forEach(function (item, index) {
        if (item.messageId == dataIn["id"]) {
          newMessage = false;
        }
        if (dataIn.event_type == "POSTED_MESSAGE") {
          if (item.payload.booking_id == dataIn.booking_id) {
            newMessage = false;
          }
        }
      });

      if (!newMessage) return;

      var newItem = {
        type: "PROCESS",
        payload: { ...dataIn },
      };
      if (
        dataIn.event_type == "TIPS-ACT" ||
        dataIn.event_type == "TIPS-LEARN" ||
        dataIn.event_type == "MARKETING" ||
        dataIn.event_type == "SALES"
      ) {
        newItem["type"] = "TIP";
      }
      //console.log(dataIn.event_type);
      if (
        dataIn.event_type == "QUEUE" ||
        dataIn.event_type == "POSTED_MESSAGE" ||
        dataIn.event_type == "BOOKING_REQUEST_PROVIDER" ||
        dataIn.event_type == "BOOKING_REQUEST_PATIENT"
      ) {
        newItem["type"] = "NORMAL";
      }
      if (dataIn.event_type == "EHR") {
        //console.log("NORMAL");
        newItem["type"] = "EHR";
      }
      if (newMessage) {
        console.log("newItem", newItem);
        setData((it) => it.push(newItem));
        //setData((prevData) => [...prevData, newItem]);
      }
    },
    [data]
  );

  return (
    <ThemeProvider theme={theme}>
      <JumboDdPopover
        triggerButton={
          <ThemeProvider theme={headerTheme}>
            <JumboIconButton elevation={1}>
              <Badge
                badgeContent={`${data.length}`}
                color="primary"
                invisible={data.length <= 0 ? true : false}
              >
                <NotificationImportantOutlinedIcon
                  sx={{ fontSize: "1.5rem" }}
                />
              </Badge>
            </JumboIconButton>
          </ThemeProvider>
        }
        // disableInsideClick
      >
        <Div sx={{ width: 360, maxWidth: "100%" }}>
          <CardHeader
            title={"Notifications"}
            action={
              <></>
              // <IconButton sx={{ my: -1 }}>
              //   <MoreHorizIcon />
              // </IconButton>
            }
          />
          <List disablePadding>
            {data?.map((item, index) => {
              const NotificationItem = NotificationComponent[item?.type];
              return NotificationItem ? (
                <NotificationItem key={index} item={item} />
              ) : null;
            })}
          </List>
          <Divider />
          <CardActions sx={{ justifyContent: "center" }}>
            <Button
              sx={{
                textTransform: "none",
                fontWeight: "normal",
                "&:hover": { bgcolor: "transparent" },
              }}
              size={"small"}
              variant="text"
              endIcon={<ArrowForwardIcon />}
              disableRipple
              onClick={() => {
                navigate(`/askdaysi/notifications`);
              }}
            >
              View All
            </Button>
          </CardActions>
        </Div>
      </JumboDdPopover>
    </ThemeProvider>
  );
};

export { NotificationsPopover };
