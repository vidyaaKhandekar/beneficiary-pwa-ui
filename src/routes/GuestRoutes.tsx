import { lazy } from "react";
import SignIn from "../screens/auth/SignIn";

const Splash = lazy(() => import("../screens/auth/Splash"));
const Signup = lazy(() => import("../screens/auth/SignUpWithPassword"));

const routes = [
  {
    path: "/signup",
    component: Signup,
  },
  {
    path: "/signin",
    component: SignIn,
  },
  {
    path: "*",
    component: Splash,
  },
];
export default routes;
