import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Stack,
  Box,
  Divider,
  Grid,
} from "@mui/material";
import { JumboCard } from "@jumbo/components";
import zIndex from "@mui/material/styles/zIndex";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ShortcutOutlinedIcon from "@mui/icons-material/ShortcutOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import XIcon from "@mui/icons-material/X";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const access = [
  {
    id: 1,
    title: "Private",
    description: "Only the authour can view",
    icon: <LockOutlinedIcon />,
  },
  {
    id: 2,
    title: "Shareable",
    description: "Anyone with the link can view",
    icon: <ShortcutOutlinedIcon />,
  },
];

const socialShare = [
  {
    id: 1,
    title: "Facebook",
    icon: <FacebookOutlinedIcon />,
  },
  {
    id: 2,
    title: "Twitter",
    icon: <XIcon />,
  },
  {
    id: 3,
    title: "Copy Link",
    icon: <InsertLinkOutlinedIcon />,
  },
  {
    id: 4,
    title: "WhatsApp",
    icon: <WhatsAppIcon />,
  },
];

const AskDaysiShare = ({ btnWidth, offset }) => {
  const [show, setShow] = useState(false);

  return (
    <Box style={{ marginTop: "20px", position: "relative" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShow(!show)}
        sx={{ width: btnWidth }}
      >
        {show ? (
          <Box sx={{ display: "flex", gap: "5px" }}>
            <CloseOutlinedIcon /> Share
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: "5px" }}>
            <ShortcutOutlinedIcon /> Share
          </Box>
        )}
      </Button>
      {show && (
        <JumboCard
          sx={{
            marginTop: "10px",
            position: "absolute",
            zIndex: "9",
            width: "300px",
            right: offset,
          }}
        >
          <CardContent>
            <Typography variant="h3" fontWeight={"500"} sx={{ mb: 2 }}>
              View Access
            </Typography>
            {access.map((data, index) => (
              <Box sx={{ mt: 1, display: "flex", gap: "10px" }} key={index}>
                <Stack>{data.icon}</Stack>
                <Stack>
                  <Typography variant="h4" sx={{ mb: 0 }}>
                    {data.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {data.description}
                  </Typography>
                </Stack>
              </Box>
            ))}
            <Typography variant="h3" fontWeight={"500"} sx={{ mt: 2, mb: 2 }}>
              Share
            </Typography>
            <Grid container spacing={2}>
              {socialShare.map((data, index) => (
                <Grid item xs={6}>
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <Stack>{data.icon}</Stack>
                    <Stack>
                      <Typography variant="h4" sx={{ mb: 0 }}>
                        {data.title}
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </JumboCard>
      )}
    </Box>
  );
};

export default AskDaysiShare;
