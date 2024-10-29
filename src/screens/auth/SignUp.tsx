import React from "react";
import { Box, FormControl, Text, VStack, Center } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import CommonButton from "../../components/common/button/Button";
import Layout from "../../components/common/layout/Layout";
import FlotingInput from "../../components/common/inputs/FlotingInput";
import FloatingPasswordInput from "../../components/common/inputs/FloatingPasswordInput";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/signin");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Layout
      isMenu={false}
      _heading={{
        heading: "Sign Up with E-Wallet",
        handleBack,
      }}
      isBottombar={false}
    >
      <Box p={5}>
        <form>
          <VStack align="stretch">
            <FormControl>
              <FlotingInput label="First Name" />
              <FlotingInput label="Last Name" />
              <FlotingInput label="Mobile Number" />
              <FloatingPasswordInput label="Create Password" />
              <FloatingPasswordInput label="Confirm Password" />
            </FormControl>
            <CommonButton label="Sign Up" onClick={handleRedirect} />
          </VStack>
        </form>
        <Center>
          <Text mt={6}>
            Already Have An Account?{" "}
            <Link to="/signin" className="text-color text-decoration-underline">
              Sign in
            </Link>
          </Text>
        </Center>
      </Box>
    </Layout>
  );
};

export default Signup;
