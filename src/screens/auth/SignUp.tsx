import React from "react";
import { Box, FormControl, Text, VStack, Center } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
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
              <FlotingInput label="First Name" name="firstname" />
              <FlotingInput label="Last Name" name="lasttname" />
              <FlotingInput label="Mobile Number" name="mobilenumber" />
              <FloatingPasswordInput
                label="Create Password"
                name="createpassword"
              />
              <FloatingPasswordInput
                label="Confirm Password"
                name="confirmpassword"
              />
            </FormControl>
            <CommonButton label="Sign Up" onClick={handleRedirect} />
          </VStack>
        </form>
        <Center>
          <Text mt={6}>
            Already Have An Account?{" "}
            <Link
              as={RouterLink}
              to="/signin"
              className="text-color text-decoration-underline"
            >
              Sign in
            </Link>
          </Text>
        </Center>
      </Box>
    </Layout>
  );
};

export default Signup;
