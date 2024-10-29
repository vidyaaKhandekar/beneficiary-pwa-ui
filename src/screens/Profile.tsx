import React from "react";
import { Box, VStack, Flex, List, ListItem } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

import { useNavigate } from "react-router-dom";

import CommonButton from "../components/common/button/Button";
import Layout from "../components/common/layout/Layout";

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/explorebenefits");
  };

  return (
    <Layout
      _heading={{
        beneficiary: true,
        heading: "Vidya Khandekar",
        subHeading: "Logged in with E-Wallet",
        label: "VK",
      }}
    >
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
        <VStack spacing={4} align="stretch">
          <List spacing={3} mt={8}>
            <ListItem className="border-bottom" pb={4}>
              <Flex align="center">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  backgroundColor="green.500"
                  borderRadius="full"
                  boxSize="25px"
                  color="white"
                  marginRight="10px"
                >
                  <CheckIcon boxSize="15px" />
                </Box>
                <Box>Caste Certificate</Box>
              </Flex>
            </ListItem>
            <ListItem className="border-bottom" pb={4}>
              <Flex align="center">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  backgroundColor="green.500"
                  borderRadius="full"
                  boxSize="25px"
                  color="white"
                  marginRight="10px"
                >
                  <CheckIcon boxSize="15px" />
                </Box>
                <Box>Income Certificate</Box>
              </Flex>
            </ListItem>
          </List>
          <CommonButton onClick={handleRedirect} label="Explore Benefits" />
        </VStack>
      </Box>
    </Layout>
  );
};

export default UserProfile;
