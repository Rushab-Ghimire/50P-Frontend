import { AskDaysiLayout } from "../layouts/AskDaysiLayout";
import { AskDaysiStretchedLayout } from "../layouts/AskDaysiStretchedLayout";
import { Page } from "@app/_components/_core/Page";
import withAuth from "@app/_hoc/withAuth";

// 🔹 Public Pages
import AskDaysiChat from "../public/pages/chat";
import AskDaysiForgotPassword from "../public/components/UserAccount/ForgotPassword/ForgotPassword";
import AskDaysiPhoneLogin from "../public/components/UserAccount/PhoneLogin/PhoneLogin";
import AskDaysiSignUp from "../public/components/UserAccount/SignUp/SignUp";
import DecoratedChat from "../public/pages/chat/components/DecoratedChat";
import AskDaysiLandingPage from "../public/pages/LandingPage";
import AskDaysiSamplePage from "../public/pages/SamplePage";
import PrivacyPolicyPage from "../public/pages/PrivacyPolicy";
import TermsOfServicePage from "../public/pages/TermsOfService";

// 🔹 Admin Dashboard
import DashboardWidgets from "../admin/dashboard/pages/DashboardWidgets";
import Providers from "../admin/dashboard/pages/providers";
import QuickStats from "../admin/dashboard/pages/QuickStats";
import PatientInquiries from "../admin/dashboard/pages/PatientInquiries";
import Settings from "../admin/dashboard/pages/settings";
import EditProfile from "../admin/dashboard/pages/profile/EditProfile";
import NotificationList from "../admin/dashboard/pages/Notifications/List";
import AppointmentRequest from "../admin/dashboard/pages/AppointmentRequest";
import MyAppointments from "../admin/dashboard/pages/MyAppointments";
import ConfigureRoles from "../admin/dashboard/pages/ConfigureRoles";
import AppointmentTracker from "../admin/dashboard/pages/AppointmentTracker";
import ProcessFlowDesign from "@app/pages/ProcessFlow/ProcessFlowDesign";
import ADContextCardDesign from "../admin/dashboard/components/ContextCard";
import UserManagement from "../admin/dashboard/pages/UserManagement";
import Subscription from "../admin/dashboard/components/PricingPlan/components/subscription";
import HealthChecker from "../admin/dashboard/pages/HealthChecker";

// 🔹 Modules
import ADQueueList from "../admin/dashboard/pages/Queue/List";
import ADQueueForm from "../admin/dashboard/pages/Queue/Form";
import ADTimeslotList from "../admin/dashboard/pages/Timeslots/List";
import LabsList from "../admin/dashboard/pages/Labs/List";
import LabsForm from "../admin/dashboard/pages/Labs/Form";
import InsurancesList from "../admin/dashboard/pages/Insurances/List";
import InsurancesForm from "../admin/dashboard/pages/Insurances/Form";
import TransactionsList from "../admin/dashboard/pages/Transactions/List";
import TransactionsForm from "../admin/dashboard/pages/Transactions/Form";
import UserList from "../admin/dashboard/pages/UserModule/List";
import UserForm from "../admin/dashboard/pages/UserModule/Form";
import SubscriptionList from "../admin/dashboard/pages/Subscriptionmodule/List";
import SubscriptionForm from "../admin/dashboard/pages/Subscriptionmodule/Form";
import SpecializationsList from "../admin/dashboard/pages/Specializations/List";
import SpecializationsForm from "../admin/dashboard/pages/Specializations/Form";
import ClinicsList from "../admin/dashboard/pages/Clinics/List";
import ClinicsForm from "../admin/dashboard/pages/Clinics/Form";

// 🔹 Research / Extra
import TestComponent from "@app/modules/research/TestComponent";
import KnowledgeBase from "@app/modules/research/KnowledgeBase";
import DualTalk from "../../research/DualTalk";
import NewUI from "@app/modules/research/NewUI";

const ROUTES_ASKDAYSI = [
  // -----------------------
  // 🔹 PUBLIC ROUTES
  // -----------------------
  {
    path: "/",
    element: <AskDaysiLayout />,
    children: [
      {
        path: "/",
        element: <Page Component={AskDaysiChat} />,
      },
      {
        path: "/askdaysi/forgot-password",
        element: <Page Component={AskDaysiForgotPassword} />,
      },
      {
        path: "/askdaysi/phone-login",
        element: <Page Component={AskDaysiPhoneLogin} />,
      },
      {
        path: "/askdaysi/sign-up",
        element: <Page Component={AskDaysiSignUp} />,
      },
      {
        path: "/askdaysi/decorate-chat",
        element: <Page Component={DecoratedChat} />,
      },
      {
        path: "/askdaysi/landing-page",
        element: <Page Component={AskDaysiLandingPage} />,
      },
      {
        path: "/askdaysi/sample-page",
        element: <Page Component={AskDaysiSamplePage} />,
      },
      {
        path: "/terms-of-service",
        element: <Page Component={TermsOfServicePage} />,
      },
      {
        path: "/privacy-policy",
        element: <Page Component={PrivacyPolicyPage} />,
      },
      {
        path: "/askdaysi/test",
        element: <Page Component={TestComponent} />,
      },
      {
        path: "/askdaysi/test-kb",
        element: <Page Component={KnowledgeBase} />,
      },
      {
        path: "/askdaysi/test-talk",
        element: <Page Component={DualTalk} />,
      },
      {
        path: "/askdaysi/test-new-ui",
        element: <Page Component={NewUI} />,
      },
    ],
  },

  // -----------------------
  // 🔹 AUTH-PROTECTED DASHBOARD ROUTES
  // -----------------------
  {
    path: "/",
    element: <AskDaysiStretchedLayout />,
    children: [
      { path: "/askdaysi/edit-profile", element: <Page Component={EditProfile} hoc={withAuth} /> },
      { path: "/askdaysi/dashboard", element: <Page Component={DashboardWidgets} hoc={withAuth} /> },
      { path: "/askdaysi/providers", element: <Page Component={Providers} hoc={withAuth} /> },
      { path: "/askdaysi/quick-stats", element: <Page Component={QuickStats} hoc={withAuth} /> },
      { path: "/askdaysi/patient-inquiries", element: <Page Component={PatientInquiries} hoc={withAuth} /> },
      { path: "/askdaysi/settings", element: <Page Component={Settings} hoc={withAuth} /> },
      { path: "/askdaysi/notifications", element: <Page Component={NotificationList} hoc={withAuth} /> },
      { path: "/askdaysi/appointment-request", element: <Page Component={AppointmentRequest} hoc={withAuth} /> },
      { path: "/askdaysi/my-appointments", element: <Page Component={MyAppointments} hoc={withAuth} /> },
      { path: "/askdaysi/configure", element: <Page Component={ConfigureRoles} hoc={withAuth} /> },
      { path: "/askdaysi/tracker", element: <Page Component={AppointmentTracker} hoc={withAuth} /> },
      { path: "/askdaysi/processflow-design/:id", element: <Page Component={ProcessFlowDesign} hoc={withAuth} /> },
      { path: "/askdaysi/context-card", element: <Page Component={ADContextCardDesign} hoc={withAuth} /> },
      { path: "/askdaysi/users", element: <Page Component={UserManagement} hoc={withAuth} /> },
      { path: "/askdaysi/subscription", element: <Page Component={Subscription} hoc={withAuth} /> },
      { path: "/askdaysi/health-check", element: <Page Component={HealthChecker} hoc={withAuth} /> },

      // -----------------------
      // LABS
      // -----------------------
      { path: "/askdaysi/labs", element: <Page Component={LabsList} hoc={withAuth} /> },
      { path: "/askdaysi/labs/new", element: <Page Component={LabsForm} hoc={withAuth} /> },
      { path: "/askdaysi/labs/:id", element: <Page Component={LabsForm} hoc={withAuth} /> },

      // -----------------------
      // INSURANCES
      // -----------------------
      { path: "/askdaysi/insurances", element: <Page Component={InsurancesList} hoc={withAuth} /> },
      { path: "/askdaysi/insurances/new", element: <Page Component={InsurancesForm} hoc={withAuth} /> },
      { path: "/askdaysi/insurances/:id", element: <Page Component={InsurancesForm} hoc={withAuth} /> },

      // -----------------------
      // TRANSACTIONS
      // -----------------------
      { path: "/askdaysi/transactions", element: <Page Component={TransactionsList} hoc={withAuth} /> },
      { path: "/askdaysi/transactions/new", element: <Page Component={TransactionsForm} hoc={withAuth} /> },
      { path: "/askdaysi/transactions/:id", element: <Page Component={TransactionsForm} hoc={withAuth} /> },

       // UserModule 
      // -----------------------
      { path: "/askdaysi/UserModule", element: <Page Component={UserList} hoc={withAuth} /> },
      { path: "/askdaysi/UserModule/new", element: <Page Component={UserForm} hoc={withAuth} /> },
      { path: "/askdaysi/UserModule/:id", element: <Page Component={UserForm} hoc={withAuth} /> },

        // SusbcriptionModule
      // -----------------------
      { path: "/askdaysi/SubscriptionModule", element: <Page Component={SubscriptionList} hoc={withAuth} /> },
      { path: "/askdaysi/SubscriptionModule/new", element: <Page Component={SubscriptionForm} hoc={withAuth} /> },
      { path: "/askdaysi/SubscriptionModule/:id", element: <Page Component={SubscriptionForm} hoc={withAuth} /> },

      // -----------------------
      // SPECIALIZATIONS
      // -----------------------
      { path: "/askdaysi/specializations", element: <Page Component={SpecializationsList} hoc={withAuth} /> },
      { path: "/askdaysi/specializations/new", element: <Page Component={SpecializationsForm} hoc={withAuth} /> },
      { path: "/askdaysi/specializations/:id", element: <Page Component={SpecializationsForm} hoc={withAuth} /> },

      // -----------------------
      // CLINICS
      // -----------------------
      { path: "/askdaysi/clinics", element: <Page Component={ClinicsList} hoc={withAuth} /> },
      { path: "/askdaysi/clinics/new", element: <Page Component={ClinicsForm} hoc={withAuth} /> },
      { path: "/askdaysi/clinics/:id", element: <Page Component={ClinicsForm} hoc={withAuth} /> },

      // -----------------------
      // QUEUES
      // -----------------------
      { path: "/askdaysi/queue", element: <Page Component={ADQueueList} hoc={withAuth} /> },
      { path: "/askdaysi/queue/new", element: <Page Component={ADQueueForm} hoc={withAuth} /> },
      { path: "/askdaysi/queue/:id", element: <Page Component={ADQueueForm} hoc={withAuth} /> },

      // -----------------------
      // TIMESLOTS
      // -----------------------
      { path: "/askdaysi/timeslots", element: <Page Component={ADTimeslotList} hoc={withAuth} /> },
    ],
  },
];

export { ROUTES_ASKDAYSI };
