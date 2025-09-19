import { getMenus } from "@app/_components/layout/Sidebar/menus-items";
import { Customizer, CustomizerButton } from "@app/_shared";
import {
  JumboLayout,
  JumboLayoutProvider,
} from "@jumbo/components/JumboLayout";
import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { defaultLayoutConfig } from "@app/_config/layouts";
import { TileFlexLayoutConfig } from "@app/_config/layouts/TileFlex";
import { JumboAskDaysiLayout } from "@jumbo/components/JumboLayout/JumboAskDaysiLayout";
import { Header } from "../../admin/dashboard/global/Header";
import { Sidebar } from "../../admin/dashboard/global/Sidebar";
import { Footer } from "../../admin/dashboard/global/Footer";

export function AskDaysiStretchedLayout() {
  const location = useLocation();
  const menus = getMenus();
  return (
    <JumboLayoutProvider layoutConfig={TileFlexLayoutConfig}>
      <JumboAskDaysiLayout
        header={<Header />}
        footer={<Footer />}
        sidebar={<Sidebar menus={menus} cl="sb-nav" />}
      >
        {/* {location.pathname === "/" && <Navigate to={"/dashboards/misc"} />} */}
        <Outlet />
        {/* <Customizer /> */}
        {/* <CustomizerButton /> */}
      </JumboAskDaysiLayout>
    </JumboLayoutProvider>
  );
}
