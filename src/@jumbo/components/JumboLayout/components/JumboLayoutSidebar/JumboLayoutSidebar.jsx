import React from "react";
import { useJumboLayout } from "../../hooks";
import { JumboLayoutDrawer } from "./JumboLayoutDrawer";
import { JumboLayoutAside } from "./JumboLayoutAside";

export function JumboLayoutSidebar({ children }) {
  const { sidebarOptions } = useJumboLayout();

  if (sidebarOptions.drawer) {
    return <JumboLayoutDrawer>{children}</JumboLayoutDrawer>;
  }
  return <JumboLayoutAside>{children}</JumboLayoutAside>;
}
