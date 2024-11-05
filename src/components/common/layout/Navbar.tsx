import React from "react";
import {
  Box,
  Button,
  Text,
  Flex,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import CustomSelect from "../inputs/Select";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../config/Routes";

const options = [{ value: "en", label: "English" }];

const Navbar: React.FC<{ isMenu?: boolean }> = ({ isMenu = true }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(ROUTES.USER_PROFILE); // Redirect to Profile
  };

  const handleLogoutClick = () => {
    navigate(ROUTES.HOME); // Redirect to Home (Logout)
  };

  return (
    <Stack bg="#EDEFFF" p="6" h={66} justifyContent={"center"}>
      <Flex justifyContent="space-between" alignItems="center">
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          paddingLeft={0}
          marginLeft={0}
        >
          {isMenu && (
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<HamburgerIcon w={5} h={5} />}
                paddingLeft={0}
              ></MenuButton>
              <MenuList>
                <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
              </MenuList>
            </Menu>
          )}

          <Text>Fast Pass</Text>
        </Box>

        <CustomSelect label="EN" options={options} placeholder="EN" />
      </Flex>
    </Stack>
  );
};

export default Navbar;
