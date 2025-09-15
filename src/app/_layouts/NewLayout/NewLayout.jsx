import { Sidebar } from "@app/_components/layout";
import { getMenus } from "@app/_components/layout/Sidebar/menus-items";
import { Customizer, CustomizerButton } from "@app/_shared";
import {
  JumboLayout,
  JumboLayoutProvider,
} from "@jumbo/components/JumboLayout";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { defaultLayoutConfig } from "@app/_config/layouts";

export function NewLayout() {
  const location = useLocation();
  const menus = getMenus();
  return (
    <JumboLayoutProvider layoutConfig={defaultLayoutConfig}>
      <JumboLayout
        header={"Header Option"}
        footer={"Footer Option"}
        sidebar={<Sidebar menus={menus} />}
      >
        {location.pathname === "/" && <Navigate to={"/dashboards/misc"} />}
        <Outlet />
        <Customizer />
        <CustomizerButton />
      </JumboLayout>
    </JumboLayoutProvider>
  );
}
