import React from "react";
import { Box, HStack, IconButton, Text } from "@chakra-ui/react";
import { FaFileAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { HiDocumentSearch } from "react-icons/hi";
import useDeviceSize from "./useDeviceSize";

interface FooterProps {
  setRef?: (ref: HTMLDivElement | null) => void;
}
const BottomBar: React.FC<FooterProps> = ({ setRef, ...props }) => {
  const { width } = useDeviceSize();
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
      width={width}
      bg={"white"}
      position="fixed"
      bottom="0"
      ref={(e) => typeof setRef === "function" && setRef(e)}
      {...props}
      zIndex={10}
    >
      <HStack
        bg="primary.50"
        alignItems="center"
        borderTopWidth={"1px"}
        borderTopColor={"back"}
        shadow={"FooterShadow"}
        justifyContent={"space-around"}
      >
        <Box alignItems="center" onClick={() => handleNavigation("/home")}>
          <IconButton
            aria-label="Home"
            icon={<MdHome />}
            fontSize="29px"
            variant="ghost"
            color={getTabColor("/home")}
          />
          <Text fontSize="xs" color={getTabColor("/home")}>
            Home
          </Text>
        </Box>

        <Box
          alignItems="center"
          onClick={() => handleNavigation("/explorebenefits")}
        >
          <IconButton
            aria-label="Search"
            icon={<HiDocumentSearch />}
            fontSize="29px"
            variant="ghost"
            color={getTabColor("/explorebenefits")}
          />
          <Text fontSize="xs" color={getTabColor("/explorebenefits")}>
            Search
          </Text>
        </Box>

        <Box
          alignItems="center"
          onClick={() => handleNavigation("/applicationstatus")}
        >
          <IconButton
            aria-label="Applications"
            icon={<FaFileAlt />}
            fontSize="24px"
            variant="ghost"
            color={getTabColor("/applicationstatus")}
          />
          <Text fontSize="xs" color={getTabColor("/applicationstatus")}>
            My Applications
          </Text>
        </Box>
      </HStack>
    </Box>
  );
};

export default BottomBar;
