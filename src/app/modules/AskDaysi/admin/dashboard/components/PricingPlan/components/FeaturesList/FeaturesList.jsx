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
import SosOutlinedIcon from "@mui/icons-material/SosOutlined";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";

const features = [
  {
    id: 1,
    icon: <ChatOutlinedIcon fontSize={"small"} />,
    label: "Unlimited Chat with AskDaysi",
    tooltip: "Ask health-related questions anytime",
  },
  {
    id: 2,
    icon: <BackupOutlinedIcon fontSize={"small"} />,
    label: "3 Daily Uploads",
    tooltip: "Share test results, prescriptions, or insurance info",
  },
  {
    id: 3,
    icon: <MicNoneOutlinedIcon fontSize={"small"} />,
    label: "10 Voice Conversations per Month",
    tooltip: "Talk with AskDaysi for quick help",
  },
  {
    id: 4,
    icon: <SosOutlinedIcon fontSize={"small"} />,
    label: "Emergency Health Profile Creation",
    tooltip: "Scannable by service providers in case of emergency",
  },
  {
    id: 5,
    icon: <MedicationOutlinedIcon fontSize={"small"} />,
    label: "Basic Symptom Checker",
    tooltip: "Instant responses to common health concerns",
  },
  {
    id: 6,
    icon: <AddAlertOutlinedIcon fontSize={"small"} />,
    label: "Daily Health Reminder",
    tooltip: "One gentle nudge for medication, hydration, or self-care",
  },
  {
    id: 7,
    icon: <LightbulbOutlinedIcon fontSize={"small"} />,
    label: "Health Tip of the Day",
    tooltip: "Wellness ideas for better living",
  },
  {
    id: 8,
    icon: <LanguageOutlinedIcon fontSize={"small"} />,
    label: "Access to Public Health Resources",
    tooltip: "Find clinics, vaccine sites, and more",
  },
  {
    id: 9,
    icon: <LockOutlinedIcon fontSize={"small"} />,
    label: "HIPAA-Compliant Data Security",
    tooltip: "Your health data is safe and private",
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

const FeaturesList = () => {
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
                      bgcolor: "#33ade9",
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
export { FeaturesList };
