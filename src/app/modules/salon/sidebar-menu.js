import { useTranslation } from "react-i18next";

export const get_SALON_MENU = () => {
  const { t } = useTranslation();
  return [
    {
      label: "",
      children: [
        {
          path: "/salon/calendar",
          label: "Dashboard",
          icon: "dashboard",
        },
        {
          path: "/salon/analytics",
          label: "Analytics & KPI",
          icon: "metric",
        },
        {
          label: t("Business"),
          collapsible: true,
          icon: "business",
          children: [
            {
              path: "/salon/category",
              label: t("Categories"),
            },
            // {
            //   path: "/salon/inventory",
            //   label: t("Inventory"),
            // },
            {
              path: "/salon/services",
              label: t("Services"),
            },
            {
              path: "/salon/sales",
              label: t("Sales"),
            },
            {
              path: "/salon/queue",
              label: t("Booking Queue"),
            },
            {
              path: "/salon/floorplan",
              label: t("Point of Sales"),
            },
          ],
        },
        {
          label: t("People"),
          collapsible: true,
          icon: "people",
          children: [
            {
              path: "/salon/customer",
              label: t("Customers"),
            },
            {
              path: "/salon/staff",
              label: t("Staffs"),
            },
            {
              path: "/salon/invitation",
              label: t("Invitations"),
            },
          ],
        },
        {
          path: "/salon/reports",
          label: "Reports",
          icon: "report",
        },
        {
          path: "/salon/settings",
          label: "Settings",
          icon: "settings",
        },        
        {
          path: "/salon/ehr",
          label: "eHR - Demo",
          icon: "settings",
        },
      ],
    },
  ];
};
