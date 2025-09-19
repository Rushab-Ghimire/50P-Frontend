import Login1 from "@app/pages/auth/login1";
import { createBrowserRouter } from "react-router-dom";
import SamplePage from "@app/pages";
import { StretchedLayout } from "@app/_layouts/StretchedLayout";
import { SoloLayout } from "@app/_layouts/SoloLayout";
import { NewLayout } from "@app/_layouts/NewLayout";
import { Page } from "@app/_components/_core/Page";
import withAuth from "@app/_hoc/withAuth";
import { NotFound } from "@app/_components/_core/NotFound";
import FlexHome from "@app/pages/FlexHome/FlexHome";
import ContactList from "@app/pages/contacts/List";
import calendar from "@app/pages/calendar/calendar";
import AiChat from "@app/pages/AiChat/AiChat";
import SignUp from "@app/pages/SignUp/SignUp";
import profile from "@app/pages/profile/profile";
import login from "@app/pages/login/login";
import ForgotPassword from "@app/pages/ForgotPassword/ForgotPassword";
import ResetPassword from "@app/pages/ResetPassword/ResetPassword";
import ConfirmEmail from "@app/pages/onboarding/ConfirmEmail";
import pricing from "@app/pages/pricing/pricing";
import ProcessFlowDesign from "@app/pages/ProcessFlow/ProcessFlowDesign";
import ProcessFlow from "@app/pages/ProcessFlow/ProcessFlow";

import ContextCardDesign from "@app/pages/ContextCard/ContextCardDesign";

import BusinessList from "@app/pages/Business/List";
import BusinessForm from "@app/pages/Business/Form";
import ProcessFlowForm from "@app/pages/ProcessFlow/Form";

import ContactForm from "@app/pages/contacts/Form";

import Process from "@app/pages/process/Process";
import ProcessForm from "@app/pages/process/Form";
import { TileFlexLayout } from "@app/_layouts/TileFlexLayout/TileFlexLayout";
import SingupSuccess from "@app/pages/onboarding/SingupSuccess";
import EmailVerificationFailed from "@app/pages/onboarding/EmailVerificationFailed";
import OrganizationDetails from "@app/pages/onboarding/OrganizationDetails";
import EditCompanyProfile from "@app/pages/profile/EditCompanyProfile";
import Tax from "@app/pages/tax";
import TaxFiling from "@app/pages/tax/TaxFiling";
import Assistant from "@app/modules/assistant/Assistant";

import { ROUTES_SALON } from "@app/modules/salon/routes.jsx";
import ProgressMobileStepper from "@app/modules/NewBusiness/components/NewBusinessStepper";
import Feedback from "@app/pages/feedback";
import AdminBooking from "@app/modules/booking/admin";
import BridgeComponent from "@app/pages/bridge";
import ChatBot from "@app/modules/salon/ChatBot";
import VoiceAI from "@app/modules/salon/VoiceAI";
import { ErrorPage } from "@app/pages/ErrorPage";
import Invite from "@app/pages/invite/invite";
import InviteUser from "@app/pages/invite/InviteUser";
import EditProfile from "@app/pages/profile/EditProfile";
import PhoneLogin from "@app/pages/login/PhoneLogin";
import PhoneBooking from "@app/modules/salon/modals/PhoneBooking";
import MedicalReport from "@app/modules/ehr/MedicalReport/Index";
import { ROUTES_VOGENT } from "@app/modules/agents/routes.jsx";
import { ROUTES_ASKDAYSI } from "@app/modules/AskDaysi/routes";
import Invoice from "@app/pages/invoice";

const ROUTES_COMMON = [
  {
    path: "/",
    element: <SoloLayout />,
    children: [
      {
        path: "/bridge",
        element: <Page Component={BridgeComponent} hoc={withAuth} />,
      },
      {
        path: "/signup-success/:mode?",
        element: <Page Component={SingupSuccess} />,
      },
      {
        path: "/error/:mode?",
        element: <Page Component={ErrorPage} />,
      },
      {
        path: "/confirm-email",
        element: <Page Component={ConfirmEmail} />,
      },
      {
        path: "/reset-password",
        element: <Page Component={ResetPassword} />,
      },
      {
        path: "/invoice",
        element: <Page Component={Invoice} />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

var routes = [
  {
    path: "/",
    element: <SoloLayout />,
    children: [
      {
        path: "/",
        element: <Page Component={FlexHome} hoc={withAuth} />,
      },
      {
        path: "/signup",
        element: <Page Component={SignUp} hoc={withAuth} />,
      },
      {
        path: "/login",
        element: <Page Component={login} hoc={withAuth} />,
      },
      {
        path: "/confirm-email",
        element: <Page Component={ConfirmEmail} />,
      },
      {
        path: "/forgot-password",
        element: <Page Component={ForgotPassword} />,
      },
      {
        path: "/signup-success/:mode?",
        element: <Page Component={SingupSuccess} />,
      },
      // {
      //   path: "/email-verification-failed",
      //   element: <Page Component={EmailVerificationFailed} />,
      // },
      {
        path: "/organization-details",
        element: <Page Component={OrganizationDetails} />,
      },
      // {
      //   path: "/auth/login-1",
      //   element: <Page Component={Login1} hoc={withAuth} />,
      // },
      {
        path: "/feedback",
        element: <Page Component={Feedback} />,
      },
      {
        path: "/booking",
        element: <Page Component={AdminBooking} />,
      },
      {
        path: "/chat/:org_id",
        element: <Page Component={ChatBot} />,
      },
      {
        path: "/voice/:org_id",
        element: <Page Component={VoiceAI} />,
      },
      {
        path: "/error/:mode?",
        element: <Page Component={ErrorPage} />,
      },
      {
        path: "/invite",
        element: <Page Component={Invite} />,
      },
      {
        path: "/invite-user",
        element: <Page Component={InviteUser} />,
      },
      {
        path: "/phone-login",
        element: <Page Component={PhoneLogin} />,
      },
      {
        path: "/test",
        element: <Page Component={PhoneBooking} />,
      },
    ],
  },
  {
    path: "/",
    element: <TileFlexLayout />,
    children: [
      {
        path: "/my-analytics",
        element: <Page Component={SamplePage} hoc={withAuth} />,
      },
      {
        path: "/contacts",
        element: <Page Component={ContactList} hoc={withAuth} />,
      },
      {
        path: "/calendar",
        element: <Page Component={calendar} hoc={withAuth} />,
      },
      {
        path: "/profile",
        element: <Page Component={profile} hoc={withAuth} />,
      },
      {
        path: "/edit-company-profile",
        element: <Page Component={EditCompanyProfile} hoc={withAuth} />,
      },
      {
        path: "/chat-ai",
        element: <Page Component={AiChat} hoc={withAuth} />,
      },
      {
        path: "/chat-ai/:chatBy/:id",
        element: <Page Component={AiChat} hoc={withAuth} />,
      },
      {
        path: "/pricing",
        element: <Page Component={pricing} hoc={withAuth} />,
      },
      {
        path: "/process",
        element: <Page Component={Process} hoc={withAuth} />,
      },
      {
        path: "/process/new",
        element: <Page Component={ProcessForm} hoc={withAuth} />,
      },
      {
        path: "/process/:id",
        element: <Page Component={ProcessForm} hoc={withAuth} />,
      },
      {
        path: "/processflow-design/:id",
        element: <Page Component={ProcessFlowDesign} hoc={withAuth} />,
      },
      {
        path: "/process-flow",
        element: <Page Component={ProcessFlow} hoc={withAuth} />,
      },
      {
        path: "/process-flow/new",
        element: <Page Component={ProcessFlowForm} hoc={withAuth} />,
      },
      {
        path: "/process-flow/:id",
        element: <Page Component={ProcessFlowForm} hoc={withAuth} />,
      },
      {
        path: "/context-card/:id",
        element: <Page Component={ContextCardDesign} hoc={withAuth} />,
      },
      {
        path: "/business",
        element: <Page Component={BusinessList} hoc={withAuth} />,
      },
      {
        path: "/business/new",
        element: <Page Component={BusinessForm} hoc={withAuth} />,
      },
      {
        path: "/business/:id",
        element: <Page Component={BusinessForm} hoc={withAuth} />,
      },

      {
        path: "/contact/new",
        element: <Page Component={ContactForm} hoc={withAuth} />,
      },
      {
        path: "/contact/:id",
        element: <Page Component={ContactForm} hoc={withAuth} />,
      },
      {
        path: "/tax",
        element: <Page Component={Tax} hoc={withAuth} />,
      },
      {
        path: "/tax-filing",
        element: <Page Component={TaxFiling} />,
      },
      {
        path: "/assistant/:type?/:param?",
        element: <Page Component={Assistant} hoc={withAuth} />,
      },
      {
        path: "/new-business",
        element: <Page Component={ProgressMobileStepper} hoc={withAuth} />,
      },
    ],
  },
  {
    path: "/auth",
    element: <SoloLayout />,
    children: [
      {
        path: "login-1",
        element: <Login1 />,
      },
    ],
  },
];

if (
  document.location.href.includes("localhost:5173") ||
  document.location.href.includes("health") ||
  document.location.href.includes("staging.daysiai.com")
) {
  routes = ROUTES_ASKDAYSI;
  routes = routes.concat(ROUTES_COMMON);
} else {
  routes = routes.concat(ROUTES_SALON);
  routes = routes.concat(ROUTES_VOGENT);
  routes = routes.concat(ROUTES_COMMON);
}

export const router = createBrowserRouter(routes);
