import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { Home, Settings, AccountCircle, Info } from "@mui/icons-material";
import { Colors } from "@app/modules/AskDaysi/theme/colors";

const menu = [
  {
    id: 1,
    title: "Home",
    icon: <Home />,
  },
  {
    id: 2,
    title: "Profile",
    icon: <AccountCircle />,
  },
  {
    id: 1,
    title: "Settingss",
    icon: <Settings />,
  },
  {
    id: 1,
    title: "About",
    icon: <Info />,
  },
];

const listStyle = {
  borderBottom: "1px solid #DEE2E6",
  "&:last-of-type": {
    borderBottom: "none",
  },
  "& .MuiListItemIcon-root": {
    minWidth: "30px",
  },
};

const ChatProfile = () => {
  return (
    <List
      sx={{
        maxWidth: "400px",
        backgroundColor: Colors.white_1,
        borderRadius: "12px !important",
        margin: "auto",
      }}
    >
      {menu.map((data, index) => (
        <ListItem button sx={listStyle} key={index}>
          <ListItemIcon>{data.icon}</ListItemIcon>
          <ListItemText primary={data.title} />
        </ListItem>
      ))}
    </List>
  );
};

export default ChatProfile;
