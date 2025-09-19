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
import { authUser } from "./data";
import { JumboDdPopover } from "@jumbo/components/JumboDdPopover";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { GLOBAL } from "@app/_utilities/globals";
import PriceChangeOutlinedIcon from "@mui/icons-material/PriceChangeOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";

const AuthUserPopover = () => {
  const { theme } = useJumboTheme();
  const { logout, userDetail } = useAuth();
  const [app, setApp] = useState("");
  const navigate = useNavigate();
  const currentSubscription = userDetail["subscription"]
  // console.log(currentSubscription)

  useEffect(() => {
    getAppUserDetail();
  }, []);

  const getAppUserDetail = useCallback(() => {
    if (Object.keys(GLOBAL.userDetail).length <= 0) {
      setTimeout(() => {
        getAppUserDetail();
      }, 2000);
    } else {
      if (GLOBAL.userDetail?.organizations[0]?.organization.business.id == 1) {
        setApp("askdaysi");
      } else {
        setApp("salon");
      }
    }
  });

  async function handleLogout() {
    if (GLOBAL.userDetail?.organizations[0]?.organization.business.id == 1) {
      await logout();
      navigate("/");
    } else {
      await logout();
      navigate("/");
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <JumboDdPopover
        triggerButton={
          <Avatar
            src={userDetail?.profile_pic}
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
        <nav>
          <List disablePadding sx={{ pb: 1 }}>
            {/* <ListItemButton>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <PersonOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" sx={{ my: 0 }} />
            </ListItemButton> */}
            <ListItemButton onClick={() => navigate(`/${app}/edit-profile`)}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <EditOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Edit Profile" sx={{ my: 0 }} />
            </ListItemButton>
            {/* <ListItemButton>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <RepeatOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                // onClick={() => navigate('/samples/content-layout')}
                primary="Switch User"
                sx={{ my: 0 }}
              />
            </ListItemButton> */}
            {/*
              currentSubscription ? <ListItemButton>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <PriceChangeOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  onClick={() => navigate('/askdaysi/subscription')}
                  primary="Subscription"
                  sx={{ my: 0 }}
                />
              </ListItemButton>
                :
                <ListItemButton
                  onClick={() => {
                    window.showGeneralDialog("PricingPlan");
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <PriceChangeOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Pricing Plan" sx={{ my: 0 }} />
                </ListItemButton>
            */}
            <ListItemButton
              onClick={() => {
                window.showGeneralDialog("ReferFriend");
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CardGiftcardOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Refer a Friend" sx={{ my: 0 }} />
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

export { AuthUserPopover };
