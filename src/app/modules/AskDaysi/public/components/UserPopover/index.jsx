import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";
import { Div } from "@jumbo/shared";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import {
  Avatar,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { JumboDdPopover } from "@jumbo/components/JumboDdPopover";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import { useNavigate } from "react-router-dom";
import avatar from "/assets/images/avatar/steve-smith.jpg";
import Accessibility from "../accessibility";
import { useState } from "react";

const UserPopover = () => {
  const { theme } = useJumboTheme();
  const { logout, userDetail } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    return navigate("/");
  }

  const [fontSize, setFontSize] = useState(16);

  return (
    <ThemeProvider theme={theme}>
      <JumboDdPopover
        triggerButton={
          <Avatar
            src={userDetail?.profile_pic}
            // src={userDetail?.profile_pic}
            sizes={"small"}
            sx={{ boxShadow: 23, cursor: "pointer" }}
          />
        }
        sx={{ ml: { xs: 0, mc: 3 } }}
      >
        <Div
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            p: (theme) => theme.spacing(2.5),
          }}
        >
          <Avatar
            src={userDetail?.profile_pic}
            // src={userDetail?.profile_pic}
            alt={userDetail.first_name + " " + userDetail.last_name}
            sx={{ width: 60, height: 60, mb: 2 }}
          />
          <Typography variant={"h5"}>
            {userDetail.first_name + " " + userDetail.last_name}
          </Typography>
          <Typography variant={"body1"} color="text.secondary">
            {userDetail.email}
          </Typography>
        </Div>
        <Divider />
        <Accessibility fontSize={fontSize} setFontSize={setFontSize} />

        <Divider />
        <nav>
          <List disablePadding sx={{ pb: 1 }}>
            <ListItemButton onClick={() => navigate("/askdaysi/dashboard")}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <EditOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" sx={{ my: 0 }} />
            </ListItemButton>

            <ListItemButton onClick={handleLogout}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ my: 0 }} />
            </ListItemButton>
          </List>
        </nav>
      </JumboDdPopover>
    </ThemeProvider>
  );
};

export { UserPopover };
