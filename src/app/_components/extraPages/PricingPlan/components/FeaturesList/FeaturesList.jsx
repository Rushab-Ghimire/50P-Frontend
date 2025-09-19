import EmailIcon from "@mui/icons-material/Email";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import HotelIcon from "@mui/icons-material/Hotel";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TranslateIcon from "@mui/icons-material/Translate";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InsightsIcon from "@mui/icons-material/Insights";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

const features = [
  { label: "Easy Translation", icon: <TranslateIcon fontSize={"small"} /> },
  {
    label: "Easy Admin Control Panel",
    icon: <FormatColorTextIcon fontSize={"small"} />,
  },
  {
    label: "Competetive Pricing",
    icon: <AttachMoneyIcon fontSize={"small"} />,
  },
  {
    label: "Useful charts and graphs",
    icon: <InsightsIcon fontSize={"small"} />,
  },
  {
    label: "Awesome Suggestions",
    icon: <TipsAndUpdatesIcon fontSize={"small"} />,
  },
];
const FeaturesList = () => {
  return (
    <List disablePadding sx={{ mb: 4 }}>
      {features?.map((feature, index) => (
        <ListItem key={index}>
          <ListItemIcon sx={{ minWidth: 32, color: "inherit" }}>
            {feature?.icon}
          </ListItemIcon>
          <ListItemText primary={feature?.label} />
        </ListItem>
      ))}
    </List>
  );
};
export { FeaturesList };
