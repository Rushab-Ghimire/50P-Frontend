import { StretchedLayout } from "@app/_layouts/StretchedLayout";
import { Page } from "@app/_components/_core/Page";
import withAuth from "@app/_hoc/withAuth";

import SalonCalendar from "@app/modules/salon/calendar";
import SalonAnalytics from "@app/modules/salon/analytics";

import InventoryList from "@app/modules/salon/inventory/List";
import InventoryForm from "@app/modules/salon/inventory/Form";

import ServiceList from "@app/modules/salon/services/List";
import ServiceForm from "@app/modules/salon/services/Form";

import InvitationList from "@app/modules/salon/invitation/List";
import InvitationForm from "@app/modules/salon/invitation/Form";

import SalesList from "@app/modules/salon/sales/List";

import MembershipList from "@app/modules/salon/memberships/List";
import MembershipForm from "@app/modules/salon/memberships/Form";

import CustomerList from "@app/modules/salon/customers/List";
import CustomerForm from "@app/modules/salon/customers/Form";

import StaffList from "@app/modules/salon/staffs/List";
import StaffForm from "@app/modules/salon/staffs/Form";

import ReportsList from "@app/modules/salon/reports/List";
import SettingsList from "@app/modules/salon/settings/List";

import CategoryList from "@app/modules/salon/categories/List";
import CategoryForm from "@app/modules/salon/categories/Form";

import QueueList from "@app/modules/salon/queue/List";
import QueueForm from "@app/modules/salon/queue/Form";

import FloorplanList from "@app/modules/salon/floorplan/List";
import FloorplanForm from "@app/modules/salon/floorplan/Form";

import PosList from "@app/modules/salon/pos/List";
import PosForm from "@app/modules/salon/pos/Form";
import GraphReports from "./reports/GraphReports";
import { TileFlexLayout } from "@app/_layouts/TileFlexLayout";
import PivotTable from "./reports/PivotTable";
import MedicalReport from "@app/modules/ehr/MedicalReport/Index";
import MedicalReportList from "@app/modules/ehr/MedicalReport/List";
import EditProfile from "@app/pages/profile/EditProfile";

const ROUTES_SALON = [
  {
    path: "/",
    element: <TileFlexLayout />,
    children: [
      {
        path: "/salon/edit-profile",
        element: <Page Component={EditProfile} hoc={withAuth} />,
      },
      {
        path: "/salon/calendar",
        element: <Page Component={SalonCalendar} hoc={withAuth} />,
      },
      {
        path: "/salon/analytics",
        element: <Page Component={SalonAnalytics} hoc={withAuth} />,
      },

      {
        path: "/salon/inventory",
        element: <Page Component={InventoryList} hoc={withAuth} />,
      },
      {
        path: "/salon/inventory/new",
        element: <Page Component={InventoryForm} hoc={withAuth} />,
      },
      {
        path: "/salon/inventory/:id",
        element: <Page Component={InventoryForm} hoc={withAuth} />,
      },

      {
        path: "/salon/services",
        element: <Page Component={ServiceList} hoc={withAuth} />,
      },
      {
        path: "/salon/services/new",
        element: <Page Component={ServiceForm} hoc={withAuth} />,
      },
      {
        path: "/salon/services/:id",
        element: <Page Component={ServiceForm} hoc={withAuth} />,
      },

      {
        path: "/salon/sales",
        element: <Page Component={SalesList} hoc={withAuth} />,
      },

      {
        path: "/salon/membership",
        element: <Page Component={MembershipList} hoc={withAuth} />,
      },
      {
        path: "/salon/membership/new",
        element: <Page Component={MembershipForm} hoc={withAuth} />,
      },
      {
        path: "/salon/membership/:id",
        element: <Page Component={MembershipForm} hoc={withAuth} />,
      },

      {
        path: "/salon/customer",
        element: <Page Component={CustomerList} hoc={withAuth} />,
      },
      {
        path: "/salon/customer/new",
        element: <Page Component={CustomerForm} hoc={withAuth} />,
      },
      {
        path: "/salon/customer/:id",
        element: <Page Component={CustomerForm} hoc={withAuth} />,
      },

      {
        path: "/salon/invitation",
        element: <Page Component={InvitationList} hoc={withAuth} />,
      },
      {
        path: "/salon/invitation/new",
        element: <Page Component={InvitationForm} hoc={withAuth} />,
      },
      {
        path: "/salon/invitation/:id",
        element: <Page Component={InvitationForm} hoc={withAuth} />,
      },

      {
        path: "/salon/staff",
        element: <Page Component={StaffList} hoc={withAuth} />,
      },
      {
        path: "/salon/staff/new",
        element: <Page Component={StaffForm} hoc={withAuth} />,
      },
      {
        path: "/salon/staff/:id",
        element: <Page Component={StaffForm} hoc={withAuth} />,
      },

      {
        path: "/salon/reports",
        element: <Page Component={ReportsList} hoc={withAuth} />,
      },
      {
        path: "/salon/settings",
        element: <Page Component={SettingsList} hoc={withAuth} />,
      },

      {
        path: "/salon/category",
        element: <Page Component={CategoryList} hoc={withAuth} />,
      },
      {
        path: "/salon/category/new",
        element: <Page Component={CategoryForm} hoc={withAuth} />,
      },
      {
        path: "/salon/category/:id",
        element: <Page Component={CategoryForm} hoc={withAuth} />,
      },

      {
        path: "/salon/queue",
        element: <Page Component={QueueList} hoc={withAuth} />,
      },
      {
        path: "/salon/queue/new",
        element: <Page Component={QueueForm} hoc={withAuth} />,
      },
      {
        path: "/salon/queue/:id",
        element: <Page Component={QueueForm} hoc={withAuth} />,
      },

      {
        path: "/salon/floorplan",
        element: <Page Component={FloorplanList} hoc={withAuth} />,
      },
      {
        path: "/salon/floorplan/new",
        element: <Page Component={FloorplanForm} hoc={withAuth} />,
      },
      {
        path: "/salon/floorplan/:id",
        element: <Page Component={FloorplanForm} hoc={withAuth} />,
      },

      {
        path: "/salon/floorplan/:id/pos",
        element: <Page Component={PosList} hoc={withAuth} />,
      },
      {
        path: "/salon/floorplan/:id/pos/new",
        element: <Page Component={PosForm} hoc={withAuth} />,
      },
      {
        path: "/salon/floorplan/:id/pos/:pos_id",
        element: <Page Component={PosForm} hoc={withAuth} />,
      },
      {
        path: "/salon/graph-reports",
        element: <Page Component={GraphReports} hoc={withAuth} />,
      },
      {
        path: "/salon/pivot-table",
        element: <Page Component={PivotTable} hoc={withAuth} />,
      },
      {
        path: "/salon/ehr",
        element: <Page Component={MedicalReportList} hoc={withAuth} />,
      },
      {
        path: "/salon/ehr/:id",
        element: <Page Component={MedicalReport} hoc={withAuth} />,
      },
    ],
  },
];

export { ROUTES_SALON };
