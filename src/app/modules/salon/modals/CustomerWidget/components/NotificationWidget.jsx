import React from "react";
import { JumboCard } from "@jumbo/components";
import { Box, Stack, Typography } from "@mui/material";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import { CWNotification } from "@app/_styles/CustomerWidgets";

const notificationList = [
  {
    id: 1,
    title: "Client Notification",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam amet praesentium voluptate sunt, aliquid alias mollitia nam natus id at",
  },
  {
    id: 2,
    title: "Marketing Notification",
    description:
      "Aperiam amet praesentium voluptate sunt, aliquid alias mollitia nam natus id at. Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
  },
  {
    id: 3,
    title: "Campaign Notification",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam amet praesentium voluptate sunt, aliquid alias mollitia nam natus id at",
  },
];
const NotificationWidget = () => {
  return (
    <JumboCard
      title={
        <Typography variant={"h3"} mb={0} fontWeight={"500"}>
          Notifications
        </Typography>
      }
      action={
        <Stack direction={"row"} spacing={1}>
          <NotificationsActiveOutlinedIcon fontSize={"medium"} />
        </Stack>
      }
      contentSx={{}}
      contentWrapper={true}
      headerSx={{ borderBottom: 1, borderBottomColor: "divider" }}
      sx={{ marginBottom: "25px" }}
    >
      {notificationList.map((data, index) => (
        <CWNotification key={index}>
          <Typography variant={"h4"} fontWeight={"500"}>
            {data.title}
          </Typography>
          <Typography>{data.description}</Typography>
        </CWNotification>
      ))}
    </JumboCard>
  );
};

export default NotificationWidget;
