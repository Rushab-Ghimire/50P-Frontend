import React from "react";

import {
  Avatar,
  AvatarGroup,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Tab,
  Typography,
  styled,
} from "@mui/material";
import { Div } from "@jumbo/shared";
import { JumboCard } from "@jumbo/components";
import { getAssetPath } from "@app/_utilities/helpers";
import { ASSET_AVATARS } from "@app/_utilities/constants/paths";
import { TabContext, TabList } from "@mui/lab";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import { Link } from "react-router-dom";

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: 24,
  height: 48,
  width: 48,
  borderRadius: "50%",
  minWidth: 42,
  marginRight: 16,
  padding: theme.spacing(1),
  alignItems: "center",
  justifyContent: "center",
  border: `solid 1px ${theme.palette.divider}`,
}));

const About = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = ({}, newValue) => {
    setValue(newValue);
  };

  return (
    <JumboCard
      title={"Profile"}
      action={
        <Stack>
          <Link to="/edit-profile">
            <Button variant="outlined" color="primary">
              Edit Profile
            </Button>
          </Link>
        </Stack>
      }
      headerSx={{
        borderBottom: 1,
        borderColor: "divider",
      }}
      contentWrapper
    >
      <List
        disablePadding
        sx={{
          display: "flex",
          flexWrap: "wrap",
          margin: (theme) => theme.spacing(0, -2),
        }}
      >
        <ListItem
          sx={{
            width: { xs: "100%", sm: "50%", xl: "33.33%" },
          }}
        >
          <StyledListItemIcon>
            <PersonOutlineIcon fontSize={"inherit"} />
          </StyledListItemIcon>
          <ListItemText
            primary={
              <Typography
                fontSize={"12px"}
                variant="h6"
                color="text.secondary"
                mb={0.5}
              >
                Name
              </Typography>
            }
            secondary={
              <Typography variant="body1" color="text.primary">
                John Doe
              </Typography>
            }
          />
        </ListItem>
        <ListItem
          sx={{
            width: { xs: "100%", sm: "50%", xl: "33.33%" },
          }}
        >
          <StyledListItemIcon>
            <EmailOutlinedIcon fontSize={"inherit"} />
          </StyledListItemIcon>
          <ListItemText
            primary={
              <Typography
                fontSize={"12px"}
                variant="h6"
                color="text.secondary"
                mb={0.5}
              >
                E-mail
              </Typography>
            }
            secondary={
              <Typography variant="body1" color="text.primary">
                john@tileflexai.com
              </Typography>
            }
          />
        </ListItem>
        <ListItem
          sx={{
            width: { xs: "100%", sm: "50%", xl: "33.33%" },
          }}
        >
          <StyledListItemIcon>
            <LocalPhoneOutlinedIcon fontSize={"inherit"} />
          </StyledListItemIcon>
          <ListItemText
            primary={
              <Typography
                fontSize={"12px"}
                variant="h6"
                color="text.secondary"
                mb={0.5}
              >
                Phone
              </Typography>
            }
            secondary={
              <Typography variant="body1" color="text.primary">
                9876543210
              </Typography>
            }
          />
        </ListItem>
        <ListItem
          sx={{
            width: { xs: "100%", sm: "50%", xl: "33.33%" },
          }}
        >
          <StyledListItemIcon>
            <BadgeOutlinedIcon fontSize={"inherit"} />
          </StyledListItemIcon>
          <ListItemText
            primary={
              <Typography
                fontSize={"12px"}
                variant="h6"
                color="text.secondary"
                mb={0.5}
              >
                Business Name
              </Typography>
            }
            secondary={
              <Typography variant="body1" color="text.primary">
                El Mediterraneo
              </Typography>
            }
          />
        </ListItem>
        <ListItem
          sx={{
            width: { xs: "100%", sm: "50%", xl: "33.33%" },
          }}
        >
          <StyledListItemIcon>
            <BusinessOutlinedIcon fontSize={"inherit"} />
          </StyledListItemIcon>
          <ListItemText
            primary={
              <Typography
                fontSize={"12px"}
                variant="h6"
                color="text.secondary"
                mb={0.5}
              >
                Business Type
              </Typography>
            }
            secondary={
              <Typography variant="body1" color="text.primary">
                Restaurant
              </Typography>
            }
          />
        </ListItem>
      </List>
    </JumboCard>
  );
};

export { About };
