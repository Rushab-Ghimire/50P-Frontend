import { Footer, Header, Sidebar } from "@app/_components/layout";
import { getMenus } from "@app/_components/layout/Sidebar/menus-items";
import { Customizer, CustomizerButton } from "@app/_shared";
import {
  JumboLayout,
  JumboLayoutProvider,
} from "@jumbo/components/JumboLayout";
import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { defaultLayoutConfig } from "@app/_config/layouts";
import { TileFlexLayoutConfig } from "@app/_config/layouts/TileFlex";
import { JumboAgentsLayout } from "@jumbo/components/JumboLayout/JumboAgentsLayout";

export function AgentsLayout() {
  const location = useLocation();
  const menus = getMenus();
  return (
    <JumboLayoutProvider layoutConfig={TileFlexLayoutConfig}>
      <JumboAgentsLayout
        header={<Header />}
        footer={<Footer />}
        sidebar={<Sidebar menus={menus} cl="sb-nav" />}
      >
        {/* {location.pathname === "/" && <Navigate to={"/dashboards/misc"} />} */}
        <Outlet />
        {/* <Customizer /> */}
        {/* <CustomizerButton /> */}
      </JumboAgentsLayout>
    </JumboLayoutProvider>
  );
}
