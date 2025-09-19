import { JumboLayoutProvider } from "@jumbo/components/JumboLayout";
import { Outlet } from "react-router-dom";

export function AskDaysiLayout() {
  return (
    <JumboLayoutProvider>
      <Outlet />
    </JumboLayoutProvider>
  );
}
