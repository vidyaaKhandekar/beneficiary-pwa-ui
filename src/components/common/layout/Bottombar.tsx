import React from "react";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { FaFileAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { HiDocumentSearch } from "react-icons/hi";
import { ROUTES } from "../../../config/Routes";

const BottomBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const getTabColor = (path: string) => {
    return location.pathname === path ? "#3C5FDD" : "#433E3F";
  };

  return (
    <Box
      bg="#EDEFFF"
      borderWidth="1px"
      position="fixed"
      bottom={0}
      width="100%"
      maxW="550px"
      height="60px"
      paddingBottom={10}
    >
      <Flex justify="space-around" pb={5}>
        <Flex
          direction="column"
          align="center"
          onClick={() => handleNavigation(ROUTES.USER_PROFILE)}
          paddingBottom={5}
        >
          <IconButton
            aria-label="Home"
            icon={<MdHome />}
            fontSize="25px"
            variant="ghost"
            color={getTabColor(ROUTES.USER_PROFILE)}
          />
          <Text fontSize="10px" color={getTabColor(ROUTES.USER_PROFILE)}>
            Home
          </Text>
        </Flex>

        <Flex
          direction="column"
          align="center"
          onClick={() => handleNavigation(ROUTES.EXPLORE_BENEFITS)}
        >
          <IconButton
            aria-label="Search"
            icon={<HiDocumentSearch />}
            fontSize="29px"
            variant="ghost"
            color={getTabColor(ROUTES.EXPLORE_BENEFITS)}
          />
          <Text fontSize="10" color={getTabColor(ROUTES.EXPLORE_BENEFITS)}>
            Search
          </Text>
        </Flex>

        <Flex
          direction="column"
          align="center"
          onClick={() => handleNavigation(ROUTES.APPLICATION_STATUS)}
        >
          <IconButton
            aria-label="Applications"
            icon={<FaFileAlt />}
            fontSize="24px"
            variant="ghost"
            color={getTabColor(ROUTES.APPLICATION_STATUS)}
          />
          <Text fontSize="10" color={getTabColor(ROUTES.APPLICATION_STATUS)}>
            My Applications
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default BottomBar;
