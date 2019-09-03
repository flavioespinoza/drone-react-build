import Calendar from "views/Calendar/Calendar.jsx";
import Dashboard from "views/Dashboard/Dashboard.jsx";
import ErrorPage from "views/Pages/ErrorPage.jsx";
import ExtendedTables from "views/Tables/ExtendedTables.jsx";
import LoginPage from "views/Pages/LoginPage.jsx";
import OpenID_Redirect from "views/Pages/OpenID_Redirect.jsx";
import RegisterPage from "views/Pages/RegisterPage.jsx";
import UserProfile from "views/Pages/UserProfile.jsx";
import GlobalIdentityGraph from "views/Pages/GlobalIdentityGraph.jsx";
import RequestVerifications from "views/Forms/RequestVerifications.jsx";

import Placeholder from "components/Placeholder/Placeholder.jsx";


// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DateRange from "@material-ui/icons/DateRange";
import GridOn from "@material-ui/icons/GridOn";
import Image from "@material-ui/icons/Image";
import Place from "@material-ui/icons/Place";
import Timeline from "@material-ui/icons/Timeline";
import WidgetsIcon from "@material-ui/icons/Widgets";
import Check from "@material-ui/icons/Check";
import Gavel from "@material-ui/icons/Gavel";
import Language from "@material-ui/icons/Language";
import PermIdentity from "@material-ui/icons/PermIdentity";

// authnet-app icons
import Add from "@material-ui/icons/Add";
import Claims from "@material-ui/icons/Gavel";
import Consents from "@material-ui/icons/HowToReg";
import GlobalIdentity from "@material-ui/icons/Language";

// authnet-app icons-2
import Identity from "@material-ui/icons/PermIdentity";
import Person from "@material-ui/icons/Person";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Family from "@material-ui/icons/People";

import Step_ClaimAbout from "views/Forms/WizardSteps/Step_ClaimAbout";
import Step_ClaimSelf from "views/Forms/WizardSteps/Step_ClaimSelf";
import Step_ClaimOtherPerson from "views/Forms/WizardSteps/Step_ClaimOtherPerson";

const dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/my-consents",
    name: "My Consents",
    rtlName: "",
    icon: Consents,
    component: ExtendedTables,
    layout: "/admin"
  },

  {
    collapse: true,
    name: "Claims",
    rtlName: "صفحات",
    icon: Claims,
    state: "pageCollapse",
    views: [
      {
        path: "/my-claims",
        name: "My Claims",
        rtlName: "",
        icon: Claims,
        component: Step_ClaimSelf,
        layout: "/admin"
      },
      {
        path: "/new-claim",
        name: "New Claim",
        rtlName: "",
        icon: Add,
        component: Placeholder,
        layout: "/admin"
      },
      {
        path: "/self-claim",
        name: "Self Claim",
        rtlName: "",
        icon: Claims,
        component: Step_ClaimSelf,
        layout: "/admin"
      },
      {
        path: "/other-person-claim",
        name: "Other Person Claim",
        rtlName: "",
        icon: Claims,
        component: Step_ClaimOtherPerson,
        layout: "/admin"
      },
      {
        path: "/request-verifications",
        name: "Request Verifications",
        rtlName: "",
        icon: Add,
        component: RequestVerifications,
        layout: "/admin"
      }
    ]
  },

  {
    path: "/my-global-identity-graph",
    name: "My Global Identity Graph",
    rtlName: "",
    icon: Language,
    component: GlobalIdentityGraph,
    layout: "/admin"
  },
  {
    path: "/calendar",
    name: "Calendar",
    rtlName: "",
    icon: DateRange,
    component: Calendar,
    layout: "/admin"
  },

  {
    collapse: true,
    name: "Pages",
    rtlName: "",
    icon: Image,
    state: "pageCollapse",
    views: [
      {
        path: "/login-page",
        name: "Login",
        rtlName: "",
        mini: "L",
        rtlMini: "",
        component: LoginPage,
        layout: "/auth"
      },
      {
        path: "/openIdClient/redirect",
        name: "OpenID Redirect",
        rtlName: "",
        mini: "L",
        rtlMini: "",
        component: OpenID_Redirect,
        layout: "/auth"
      },
      {
        path: "/register-page",
        name: "Register",
        rtlName: "",
        mini: "R",
        rtlMini: "صع",
        component: RegisterPage,
        layout: "/auth"
      },
      {
        path: "/user-page",
        name: "User Profile",
        rtlName: "",
        mini: "UP",
        rtlMini: "شع",
        component: UserProfile,
        layout: "/admin"
      },
      {
        path: "/error-page",
        name: "Error Page",
        rtlName: "",
        mini: "E",
        rtlMini: "",
        component: ErrorPage,
        layout: "/auth"
      }
    ]
  }
];

export default dashRoutes;
