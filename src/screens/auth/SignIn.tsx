import React from "react";
import {
  Box,
  FormControl,
  Text,
  VStack,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import CommonButton from "../../components/common/button/Button";
import FlotingInput from "../../components/common/inputs/FlotingInput";
import Layout from "../../components/common/layout/Layout";
import FloatingPasswordInput from "../../components/common/inputs/FloatingPasswordInput";
import ConsentDialog from "../../components/common/ConsentDialog";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const redirectUserProfile = () => {
    console.log("accepted");
    navigate("/userprofile");
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior
    onOpen(); // Open the modal
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <Layout
      isMenu={false}
      _heading={{
        heading: "Sign In with E-Wallet",
        handleBack,
      }}
      isBottombar={false}
    >
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
        <form onSubmit={handleSubmit}>
          <VStack align="stretch">
            <FormControl>
              <FlotingInput label="First Name" />
              <FloatingPasswordInput label="Password" />
            </FormControl>
            <CommonButton onClick={handleSubmit} label="Sign In" />
          </VStack>
        </form>
        <ConsentDialog
          isOpen={isOpen}
          onClose={onClose}
          onAccept={redirectUserProfile}
        />
        <Center>
          <Text mt={6}>
            Don't Have An Account?{" "}
            <Link to="/signup" className="text-color text-decoration-underline">
              Sign Up
            </Link>
          </Text>
        </Center>
      </Box>
    </Layout>
  );
};

export default SignIn;
