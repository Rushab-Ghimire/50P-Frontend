import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import { getRoles } from "@app/_utilities/helpers";
import { useTranslation } from "react-i18next";

export const get_ASKDAYSI_MENU = () => {
  const { t } = useTranslation();
  const { isAuthenticated, userDetail } = useAuth();

  var menu = [
    {
      label: "",
      children: [
        {
          path: "/askdaysi/dashboard",
          label: "Dashboard",
          icon: "dashboard",
          roles: ["patient"],
        },
        {
          path: "/askdaysi/my-appointments",
          label: "My Appoiments",
          icon: "calendar",
          roles: ["patient"],
        },
        {
          path: "/askdaysi/quick-stats",
          label: "Quick Stats",
          icon: "metric",
          roles: ["patient"],
        },
        {
          path: "/askdaysi/providers",
          label: "Providers",
          icon: "handshake",
          roles: ["general"],
        },
        {
          path: "/askdaysi/patient-inquiries",
          label: "Patient Inquiries",
          icon: "medicine",
          roles: ["general"],
        },
        {
          path: "/askdaysi/settings",
          label: "Settings",
          icon: "settings",
          roles: ["general"],
        },
        {
          path: "/askdaysi/quick-stats",
          label: "Quick Stats",
          icon: "metric",
          roles: ["doctor", "lab"],
        },
        {
          path: "/askdaysi/appointment-request",
          label: "Appointments",
          icon: "calendar",
          roles: ["doctor", "lab"],
        },
        {
          path: "/askdaysi/dashboard",
          label: "Dashboard",
          icon: "dashboard",
          roles: ["general"],
        },
        {
          path: "/askdaysi/timeslots",
          label: "Availability",
          icon: "availability",
          roles: ["doctor", "lab"],
        },
        {
          path: "/askdaysi/tracker",
          label: "No-Show / Cancellations",
          icon: "cancel",
          roles: ["doctor", "lab"],
        },
        {
          path: "/askdaysi/queue",
          label: "Rescheduling",
          icon: "reshedule",
          roles: ["doctor", "lab"],
        },
        {
          path: "/askdaysi/users",
          label: "Users",
          icon: "reshedule",
          roles: ["sa"],
        },
        {
          path: "/askdaysi/context-card",
          label: "Bot Schema",
          icon: "reshedule",
          roles: ["sa"],
        },        
        {
          path: "/askdaysi/clinics",
          label: "Clinics",
          icon: "lab",
          roles: ["doctor"],
        },
        {
          path: "/askdaysi/labs",
          label: "Labs",
          icon: "lab",
          roles: ["sa"],
        },
        {
          path: "/askdaysi/insurances",
          label: "Insurances",
          icon: "lab",
          roles: ["sa"],
        },
          {
          path: "/askdaysi/Transactions",
          label: "Transactions",
          icon: "lab",
          roles: ["sa"],
        },
        {
          path: "/askdaysi/JobModule",
          label: "JobModule",
          icon: "edit",
          roles: ["sa"],
        },
         {
          path: "/askdaysi/CourseModule",
          label: "CourseModule",
          icon: "edit",
          roles: ["sa"],
        },
        {
          path: "/askdaysi/specializations",
          label: "Specialization",
          icon: "lab",
          roles: ["sa"],
        },
        {
          path: "/askdaysi/health-check",
          label: "API Health Checker",
          icon: "heartbeat",
          roles: ["sa"],
        },
      ],
    },
  ];

  menu = filterByRoles(menu, getRoles(userDetail?.organizations));
  return menu;
};

function filterByRoles(menu, roles) {
  if (roles.length <= 0) return menu;

  var h = [];
  menu[0].children = menu[0].children.map((item) => {
    h = item.roles.filter((element) => roles.indexOf(element) !== -1);
    if (h.length > 0) {
      return item;
    }
  });
  menu[0].children = menu[0].children.filter(function (element) {
    return element !== undefined;
  });

  return menu;
}
