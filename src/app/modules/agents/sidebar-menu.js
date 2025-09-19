import { useTranslation } from "react-i18next";

export const get_VOGENT_MENU = () => {
  const { t } = useTranslation();
  return [
    {
      label: "",
      children: [
        {
          path: "/agents/agents",
          label: "Agents",
          icon: "agent",
        },
        {
          path: "/agents/knowledge-bases",
          label: "Knowledge Bases",
          icon: "knowledge",
        },
        {
          path: "/agents/functions",
          label: "Functions",
          icon: "function",
        },
      ],
    },
    {
      label: "Settings",
      children: [
        {
          path: "/agents/call-settings",
          label: "Call Settings",
          icon: "phone",
        },
      ],
    },
  ];
};
