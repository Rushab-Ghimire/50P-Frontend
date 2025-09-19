import EmailIcon from "@mui/icons-material/Email";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import HotelIcon from "@mui/icons-material/Hotel";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TranslateIcon from "@mui/icons-material/Translate";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InsightsIcon from "@mui/icons-material/Insights";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import AddLocationOutlinedIcon from "@mui/icons-material/AddLocationOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";

const features = [
  {
    id: 1,
    icon: <ChatOutlinedIcon fontSize={"small"} />,
    label: "Unlimited Chat with AskDaysi",
    tooltip: "Ask anything, anytime – no limits",
  },
  {
    id: 2,
    icon: <BackupOutlinedIcon fontSize={"small"} />,
    label: "Unlimited Uploads",
    tooltip: "Medical reports, insurance docs, prescriptions, etc.",
  },
  {
    id: 3,
    icon: <MicNoneOutlinedIcon fontSize={"small"} />,
    label: "Unlimited Voice Conversations",
    tooltip: "Talk directly with AskDaysi whenever needed",
  },
  {
    id: 4,
    icon: <DescriptionOutlinedIcon fontSize={"small"} />,
    label: "Health Journal",
    tooltip: "Log symptoms, medications, routines & personal notes",
  },
  {
    id: 5,
    icon: <NotificationsActiveOutlinedIcon fontSize={"small"} />,
    label: "Smart Health Reminders",
    tooltip: "Automated alerts for meds, hydration, appointments",
  },
  {
    id: 6,
    icon: <InsightsOutlinedIcon fontSize={"small"} />,
    label: "Basic Health Reports & Insights",
    tooltip: "Monthly summaries from your activity and uploads",
  },
  {
    id: 7,
    icon: <TipsAndUpdatesOutlinedIcon fontSize={"small"} />,
    label: "AI-Powered Health Tips",
    tooltip: "Personalized advice based on your health patterns",
  },
  {
    id: 8,
    icon: <AddLocationOutlinedIcon fontSize={"small"} />,
    label: "Nearby Healthcare Finder",
    tooltip: "Find hospitals, labs, pharmacies near you with one tap",
  },
  {
    id: 9,
    icon: <DateRangeOutlinedIcon fontSize={"small"} />,
    label: "Simple Appointment Reminders",
    tooltip: "Manually add and get notified before doctor visits",
  },
  {
    id: 10,
    icon: <VerifiedUserOutlinedIcon fontSize={"small"} />,
    label: "Enhanced Data Security",
    tooltip: "Extra protection and encrypted data for peace of mind",
  },
];

const listStyles = {
  "& .MuiTypography-root": {
    fontSize: "18px",
  },
};

const btnStyle = {
  color: "#475259",
  display: "block",
  textAlign: "left",
  textTransform: "none",
  fontSize: "18px",
  fontWeight: "400",
  padding: "0",
  transition: "none",
  lineHeight: "22px",
  "&:hover": {
    backgroundColor: "transparent",
  },
};

const FeaturesListPremium = () => {
  return (
    <>
      <List disablePadding sx={{ mb: 4 }}>
        {features?.map((feature, index) => (
          <ListItem
            key={index}
            sx={{ paddingTop: "4px", paddingBottom: "4px" }}
          >
            <ListItemIcon sx={{ minWidth: 32, color: "inherit" }}>
              {feature?.icon}
            </ListItemIcon>
            <ListItemText sx={listStyles}>
              <Tooltip
                title={feature?.tooltip}
                placement="top"
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -14],
                        },
                      },
                    ],
                  },
                  tooltip: {
                    sx: {
                      bgcolor: "#c96ee2",
                      color: "#fff",
                      fontSize: "16px",
                      lineHeight: "20px",
                      fontWeight: 400,
                    },
                  },
                }}
              >
                <Button sx={btnStyle}>{feature?.label}</Button>
              </Tooltip>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};
export { FeaturesListPremium };
