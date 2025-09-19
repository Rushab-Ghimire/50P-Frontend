import { AgentsLayout } from "@app/_layouts/AgentsLayout";
import { Page } from "@app/_components/_core/Page";
import withAuth from "@app/_hoc/withAuth";
import Agents from "./agents";
import KnowledgeBases from "./KnowledgeBases";
import Functions from "./functions";
import CallSettings from "./CallSettings";

const ROUTES_VOGENT = [
  {
    path: "/",
    element: <AgentsLayout />,
    children: [
      {
        path: "/agents/agents",
        element: <Page Component={Agents} hoc={withAuth} />,
      },
      {
        path: "/agents/knowledge-bases",
        element: <Page Component={KnowledgeBases} hoc={withAuth} />,
      },
      {
        path: "/agents/functions",
        element: <Page Component={Functions} hoc={withAuth} />,
      },
      {
        path: "/agents/call-settings",
        element: <Page Component={CallSettings} hoc={withAuth} />,
      },
    ],
  },
];

export { ROUTES_VOGENT };
