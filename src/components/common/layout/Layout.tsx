import React from "react";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import Navbar from "./Navbar";
import HeadingText from "./HeadingText";
import BottomBar from "./Bottombar";
import SearchBar from "./SearchBar";

interface LayoutProps {
  isScrollable?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  isMenu?: boolean;
  isNavbar?: boolean;
  afterHeader?: React.ReactNode;
  _heading?: {
    heading?: string;
    isFilter?: boolean;
    handleOpen?: () => void;
    onSearch?: (query: string) => void;
  };
  isBottombar?: boolean;
  isSearchbar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  isScrollable = true,
  loading,
  children,
  isMenu = true,
  isNavbar = true,
  afterHeader,
  _heading = {},
  isBottombar = true,
  isSearchbar = false,
}) => {
  const { onSearch } = _heading;

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="lg" />
      </Box>
    );
  }

  return (
    <Box>
      <Flex
        height="100vh"
        alignItems="flex-start" // Align items to the start for proper layout
        justifyContent="center"
        position="relative"
      >
        <Box
          width="550px"
          height="100vh"
          background="#fff"
          className="layout"
          position="relative"
          overflow="hidden"
        >
          {isNavbar && (
            <>
              <Navbar isMenu={isMenu} />
              <HeadingText {..._heading} />
              {isSearchbar && onSearch && <SearchBar onSearch={onSearch} />}
              {afterHeader}
            </>
          )}

          {children}
          {isBottombar && <BottomBar />}
        </Box>
      </Flex>
    </Box>
  );
};

export default Layout;
