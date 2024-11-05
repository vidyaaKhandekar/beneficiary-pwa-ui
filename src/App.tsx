import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "./config/Routes"; // Import the ROUTES object
import Login from "./screens/auth/Splash";
import SignIn from "./screens/auth/SignIn";
import Signup from "./screens/auth/SignUp";
import UserProfile from "./screens/Profile";
import BenefitsDetails from "./screens/benefit/Details";
import ExploreBenefits from "./screens/benefit/Benefits";
import Preview from "./screens/application/Preview";
import ApplicationStatus from "./screens/application/ApplicationStatus";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path={ROUTES.HOME} element={<Login />} />
          <Route path={ROUTES.SIGNUP} element={<Signup />} />
          <Route path={ROUTES.SIGNIN} element={<SignIn />} />
          <Route path={ROUTES.USER_PROFILE} element={<UserProfile />} />
          <Route path={ROUTES.EXPLORE_BENEFITS} element={<ExploreBenefits />} />
          <Route path={ROUTES.BENEFITS_DETAILS} element={<BenefitsDetails />} />
          <Route path={ROUTES.PREVIEW_APPLICATION} element={<Preview />} />
          <Route
            path={ROUTES.APPLICATION_STATUS}
            element={<ApplicationStatus />}
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
