import { Div } from "@jumbo/shared";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React, { useRef } from "react";

import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";
import { Button, CardActions, Divider, ThemeProvider } from "@mui/material";
import {
  MessagesHeader,
  MessagesList,
  MessagesTriggerButton,
  SearchMessages,
  SettingHeader,
  SettingsList,
} from "./components";
import { JumboDdPopover } from "@jumbo/components/JumboDdPopover";
import { subscribeToEvent, unsubscribeEvent } from "@app/_utilities/http.js";
import { getAssetPath, getCustomDateTime } from "@app/_utilities/helpers";
import { ASSET_AVATARS } from "@app/_utilities/constants/paths";

const MessagesPopover = () => {
  const [showSettings, setShowSettings] = React.useState(false);
  const { theme } = useJumboTheme();
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    subscribeToEvent("NEW_MESSAGE", newMessageEvent);
  }, []);

  const newMessageEvent = React.useCallback(
    (dataIn) => {
      let newMessage = true;
      data.forEach(function (item, index) {
        console.log("messageId", item.messageId);
        if (item.messageId == dataIn["id"]) {
          console.log(item.messageId + "==" + dataIn["id"]);
          newMessage = false;
        }
      });

      if (!newMessage) return;

      var newItem = {
        messageId: dataIn["id"],
        user: {
          id: dataIn["user_id"],
          name: dataIn["userTitle"],
          profile_pic: getAssetPath(
            `${ASSET_AVATARS}/${dataIn["imgUrl"]}`,
            "40x40"
          ),
        },
        message: dataIn["message"],
        date: getCustomDateTime(-5, "minutes", "MMMM DD, YYYY, h:mm:ss a"),
      };

      setData((prevData) => [...prevData, newItem]);
    },
    [data]
  );

  const toggleSettingWindow = React.useCallback(() => {
    setShowSettings((showSettings) => !showSettings);
  }, [setShowSettings]);

  return (
    <ThemeProvider theme={theme}>
      <JumboDdPopover
        triggerButton={<MessagesTriggerButton count={data.length} />}
      >
        {showSettings ? (
          <Div sx={{ width: 360, maxWidth: "100%" }}>
            <SettingHeader backClickCallback={toggleSettingWindow} />
            <SettingsList />
          </Div>
        ) : (
          <Div sx={{ width: 360, maxWidth: "100%" }}>
            <MessagesHeader
              count={data.length}
              settingMenuCallback={toggleSettingWindow}
            />
            <MessagesList data={data} />
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
              >
                View All
              </Button>
            </CardActions>
          </Div>
        )}
      </JumboDdPopover>
    </ThemeProvider>
  );
};

export { MessagesPopover };
