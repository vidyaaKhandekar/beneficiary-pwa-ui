import { lazy } from "react";

const Splash = lazy(() => import("../screens/auth/Splash"));
const Signup = lazy(() => import("../screens/auth/SignUpWithPassword"));

const routes = [
  {
    path: "/signup",
    component: Signup,
  },
  {
    path: "*",
    component: Splash,
  },
];
export default routes;
