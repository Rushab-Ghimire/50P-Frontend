import React from "react";

import {
  Avatar,
  AvatarGroup,
  Button,
  FormControl,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Tab,
  TextField,
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

const EditCompanyProfile = () => {
  const [business, setbusiness] = React.useState("");
  const handleChange = (event) => {
    setbusiness(event.target.value);
  };

  return (
    <JumboCard
      title={"Edit Profile"}
      action={
        <Stack>
          <Link to="javascript:void(0)">
            <Button variant="contained" color="primary">
              Update Profile
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
              <TextField
                size="small"
                variant="outlined"
                defaultValue="John Doe"
              />
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
              <TextField
                size="small"
                variant="outlined"
                defaultValue="john@tileflexai.com"
              />
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
              <TextField
                size="small"
                variant="outlined"
                defaultValue="9876543210"
              />
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
              <TextField
                size="small"
                variant="outlined"
                defaultValue="El Mediterraneo"
              />
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
              <FormControl fullWidth>
                <Select value={business} onChange={handleChange} size="small">
                  <MenuItem value={"salon"}>Salon</MenuItem>
                  <MenuItem value={"spa"}>Spa</MenuItem>
                  <MenuItem value={"restaurant"}>Restaurant</MenuItem>
                  <MenuItem value={"bakery"}>Bakery</MenuItem>
                  <MenuItem value={"photography"}>Photography</MenuItem>
                </Select>
              </FormControl>
            }
          />
        </ListItem>
      </List>
    </JumboCard>
  );
};

export default EditCompanyProfile;
