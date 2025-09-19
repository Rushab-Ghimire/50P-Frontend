import { useTranslation } from "react-i18next";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";

import { get_SALON_MENU } from "@app/modules/salon/sidebar-menu";
import { get_VOGENT_MENU } from "@app/modules/agents/sidebar-menu";
import { get_ASKDAYSI_MENU } from "@app/modules/AskDaysi/admin/dashboard/sidebar/sidebar-menu";

export function getMenus() {
  const { t } = useTranslation();

  let url = window.location.href;
  if (url.includes("agents")) {
    return get_VOGENT_MENU();
  } else if (url.includes("salon")) {
    return get_SALON_MENU();
  } else if (url.includes("health")) {
    return get_ASKDAYSI_MENU();
  }
}
