import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./SignUp";
import SignIn from "./SignIn";
import UserProfile from "./UserProfile";
import Footer from "./component/Footer";
import ExploreBenefits from "./ExploreBenefits";
import BenefitsDetails from "./BenefitsDetails";


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/explorebenefits" element={<ExploreBenefits/>} />
        <Route path="/benefitsdetails" element={<BenefitsDetails/>} />
      </Routes>
    </Router>
    </ChakraProvider>
  );
}

export default App; 
