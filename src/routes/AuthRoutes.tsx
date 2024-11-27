import { lazy } from "react";
import EditProfile from "../screens/EditProfile";

const ExploreBenefits = lazy(() => import("../screens/benefit/Benefits"));
const BenefitsDetails = lazy(() => import("../screens/benefit/Details"));
const Preview = lazy(() => import("../screens/application/Preview"));
const MyApplications = lazy(
  () => import("../screens/application/ApplicationStatus")
);
const UploadDocuments = lazy(
  () => import("../components/common/layout/UploadDocuments")
);
const Home = lazy(() => import("../screens/Home"));
const UserProfile = lazy(() => import("../screens/UserProfile"));

const routes = [
  {
    path: "/uploaddocuments",
    component: UploadDocuments,
  },

  {
    path: "/userprofile",
    component: UserProfile,
  },
  {
    path: "/explorebenefits",
    component: ExploreBenefits,
  },
  {
    path: "/benefitsdetails/:id",
    component: BenefitsDetails,
  },
  {
    path: "/previewapplication/:id",
    component: Preview,
  },
  {
    path: "/applicationStatus",
    component: MyApplications,
  },
  // {
  //   path: "/editProfile",
  //   component: EditProfile,
  // },
  {
    path: "*",
    component: Home,
  },
];

export default routes;
