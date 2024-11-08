import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/auth/Splash";
import SignIn from "./screens/auth/SignIn";
import Signup from "./screens/auth/SignUp";
import UserProfile from "./screens/Profile";
import BenefitsDetails from "./screens/benefit/Details";
import ExploreBenefits from "./screens/benefit/Benefits";
import Preview from "./screens/application/Preview";
import MyApplications from "./screens/application/ApplicationStatus";
import { AuthProvider } from "./utils/context/checkToken";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
