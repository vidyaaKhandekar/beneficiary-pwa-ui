import { lazy } from "react";

const Splash = lazy(() => import("../screens/auth/Splash"));
const Signup = lazy(() => import("../screens/auth/SignUp"));

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
