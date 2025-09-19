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
import Face3OutlinedIcon from "@mui/icons-material/Face3Outlined";
import EventRepeatOutlinedIcon from "@mui/icons-material/EventRepeatOutlined";
import AddLocationOutlinedIcon from "@mui/icons-material/AddLocationOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AddchartOutlinedIcon from "@mui/icons-material/AddchartOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import Diversity2OutlinedIcon from "@mui/icons-material/Diversity2Outlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";

const features = [
  {
    id: 1,
    icon: <Face3OutlinedIcon fontSize={"small"} />,
    label: "Dedicated Health Assistant (AskDaysi Concierge)",
    tooltip:
      "Get real help booking, rebooking, and following up on appointments",
  },
  {
    id: 2,
    icon: <CalendarMonthOutlinedIcon fontSize={"small"} />,
    label: "Smart Appointment Scheduler",
    tooltip: "Schedule and manage doctor visits with reminders and directions",
  },
  {
    id: 3,
    icon: <AddLocationOutlinedIcon fontSize={"small"} />,
    label: "Doctor & Specialist Finder",
    tooltip: "AI helps you find top-rated, in-network providers nearby",
  },
  {
    id: 4,
    icon: <AddShoppingCartOutlinedIcon fontSize={"small"} />,
    label: "Medical Shopping Assistant",
    tooltip: "Find and order prescriptions, devices, and wellness products",
  },
  {
    id: 5,
    icon: <EventRepeatOutlinedIcon fontSize={"small"} />,
    label: "Automatic Follow-ups & Rebooking",
    tooltip: "Daysi tracks missed appointments and reschedules them",
  },
  {
    id: 6,
    icon: <AddchartOutlinedIcon fontSize={"small"} />,
    label: "Advanced Health Tracking",
    tooltip:
      "Track vitals, symptoms, trends – and get alerts if something seems off",
  },
  {
    id: 7,
    icon: <PsychologyOutlinedIcon fontSize={"small"} />,
    label: "Personalized Wellness Plans",
    tooltip:
      "Custom routines for sleep, diet, hydration, exercise based on user data",
  },
  {
    id: 8,
    icon: <Diversity2OutlinedIcon fontSize={"small"} />,
    label: "Care Circle Access",
    tooltip: "Add trusted family/friends to get updates or emergency access",
  },
  {
    id: 9,
    icon: <SupportAgentOutlinedIcon fontSize={"small"} />,
    label: "Priority Support & Early Feature Access",
    // tooltip: "Add trusted family/friends to get updates or emergency access",
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

const FeaturesListPremiumPlus = () => {
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
export { FeaturesListPremiumPlus };
