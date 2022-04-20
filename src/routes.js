/** 
  All of the routes for the Soft UI Dashboard PRO React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

import "main.css";

// Soft UI Dashboard PRO React layouts
// import Default from "layouts/dashboards/default";
import SmartHome from "layouts/dashboards/smart-home";
// import Automotive from "layouts/dashboards/automotive";
// import VRDefault from "layouts/dashboards/virtual-reality/vr-default";
// import VRInfo from "layouts/dashboards/virtual-reality/vr-info";
// import CRM from "layouts/dashboards/crm";
// import ProfileOverview from "layouts/pages/profile/profile-overview";
// import Teams from "layouts/pages/profile/teams";
// import AllProjects from "layouts/pages/profile/all-projects";
// import Reports from "layouts/pages/users/reports";
// import NewUser from "layouts/pages/users/new-user";
// import Settings from "layouts/pages/account/settings";
// import Billing from "layouts/pages/account/billing";
// import Invoice from "layouts/pages/account/invoice";
// import Security from "layouts/pages/account/security";
// import General from "layouts/pages/projects/general";
// import Timeline from "layouts/pages/projects/timeline";
// import NewProject from "layouts/pages/projects/new-project";
// import Widgets from "layouts/pages/widgets";
// import Charts from "layouts/pages/charts";
// import SweetAlerts from "layouts/pages/sweet-alerts";
// import Notifications from "layouts/pages/notifications";
// import PricingPage from "layouts/pages/pricing-page"et
// import RTL from "layouts/pages/rtl";
// import Kanban from "layouts/applications/kanban";
// import Wizard from "layouts/applications/wizard";
// import DataTables from "layouts/applications/data-tables";
// import Calendar from "layouts/applications/calendar";
// import Analytics from "layouts/applications/analytics";
// import Overview from "layouts/ecommerce/overview";
// import NewProduct from "layouts/ecommerce/products/new-product";
// import EditProduct from "layouts/ecommerce/products/edit-product";
// import ProductPage from "layouts/ecommerce/products/product-page";
// import ProductsList from "layouts/ecommerce/products/products-list";
// import OrderList from "layouts/ecommerce/orders/order-list";
// import OrderDetails from "layouts/ecommerce/orders/order-details";
// import Referral from "layouts/ecommerce/referral";
// import SignInBasic from "layouts/authentication/sign-in/basic";
// import SignInCover from "layouts/authentication/sign-in/cover";
// import SignInIllustration from "layouts/authentication/sign-in/illustration";
// import SignUpBasic from "layouts/authentication/sign-up/basic";
// import SignUpCover from "layouts/authentication/sign-up/cover";
// import SignUpIllustration from "layouts/authentication/sign-up/illustration";
// import ResetBasic from "layouts/authentication/reset-password/basic";
// import ResetCover from "layouts/authentication/reset-password/cover";
// import ResetIllustration from "layouts/authentication/reset-password/illustration";
// import LockBasic from "layouts/authentication/lock/basic";
// import LockCover from "layouts/authentication/lock/cover";
// import LockIllustration from "layouts/authentication/lock/illustration";
// import VerificationBasic from "layouts/authentication/2-step-verification/basic";
// import VerificationCover from "layouts/authentication/2-step-verification/cover";
// import VerificationIllustration from "layouts/authentication/2-step-verification/illustration";
// import Error404 from "layouts/authentication/error/404";
// import Error500 from "layouts/authentication/error/500";

// Soft UI Dashboard PRO React icons
import CheckUps from "myApp/CheckUps";
// import SweetAlerts from "layouts/pages/sweet-alerts";
import WalkingCustomer from "myApp/WalkingCustomer";
import Medicines from "myApp/Medicines";
import Patients from "myApp/Patients";
import ProductsList from "layouts/ecommerce/products/products-list";
import NewPatient from "myApp/NewPatient";
import NewMedicine from "myApp/NewMedicine";
import Profile from "myApp/Profile";
import Users from "myApp/Users";
import NewUser from "myApp/NewUser";
import SignIn from "myApp/SignIn";
// import Office from "examples/Icons/Office";
// import SettingsIcon from "examples/Icons/Settings";
// import Basket from "examples/Icons/Basket";
// import Document from "examples/Icons/Document";
// import SpaceShip from "examples/Icons/SpaceShip";
// import CustomerSupport from "examples/Icons/CustomerSupport";
// import CreditCard from "examples/Icons/CreditCard";

const routes = [
  {
    myRoute: true,
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: "fa-solid fa-house-user",
    component: SmartHome,
  },
  {
    myRoute: true,
    type: "collapse",
    name: "Medicines",
    key: "medicines",
    route: "/medicines",
    icon: "fa-solid fa-capsules",
    // component: ,
    component: Medicines,
  },
  {
    myRoute: true,
    name: "Medicines",
    key: "new-medicine",
    route: "/medicines/new-medicine",
    icon: "fa-solid fa-capsules",
    // component: ,
    component: NewMedicine,
  },
  {
    myRoute: true,
    type: "collapse",
    name: "Check Ups",
    key: "check-ups",
    route: "/check-ups",
    icon: "fa-solid fa-user-doctor",
    component: CheckUps,
  },
  {
    myRoute: true,
    type: "collapse",
    name: "Patients",
    key: "patients",
    route: "/patients",
    icon: "fa-solid fa-hospital-user",
    component: Patients,
  },
  {
    myRoute: true,
    name: "Patients",
    key: "new-patient",
    route: "/patients/new-patient",
    icon: "fa-solid fa-hospital-user",
    component: NewPatient,
  },
  {
    myRoute: true,
    name: "Patients",
    key: "patient-profile",
    route: "/patients/profile",
    icon: "fa-solid fa-hospital-user",
    component: Profile,
  },
  {
    myRoute: true,
    type: "collapse",
    name: "Walking Customers",
    key: "walking-customers",
    route: "/walking-customers",
    icon: "fa-solid fa-person-walking",
    component: WalkingCustomer,
  },
  { type: "divider", key: "divider-1" },
  {
    myRoute: true,
    type: "collapse",
    name: "Cost Estimation",
    key: "cost-estimation",
    route: "/cost-estimation",
    icon: "fa-solid fa-money-bill-1",
    component: ProductsList,
  },
  {
    myRoute: true,
    type: "collapse",
    name: "User Management",
    key: "user-management",
    route: "/user-management",
    icon: "fa-solid fa-user-group",
    component: Users,
  },
  {
    myRoute: true,
    name: "User Management",
    key: "new-user",
    route: "/user-management/new-user",
    icon: "fa-solid fa-user-group",
    component: NewUser,
  },
  {
    myRoute: true,
    name: "Sign In",
    key: "sign-in",
    route: "/sign-in",
    icon: "fa-solid fa-user-group",
    component: SignIn,
  },
];

export default routes;
