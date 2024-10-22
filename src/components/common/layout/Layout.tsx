import React from "react";
import { Box, Spinner } from "@chakra-ui/react";
import Navbar from "./Navbar"; // Import your Navbar component
import HeadingText from "./HeadingText"; // Import your HeadingText component

interface LayoutProps {
  isScrollable?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  isMenu?: boolean;
  afterHeader?: React.ReactNode; // Optional: Additional components to render after the header
  _heading?: object; // Optional: Props to pass to HeadingText
}

const Layout: React.FC<LayoutProps> = ({
  isScrollable = true,
  loading,
  children,
  isMenu = true,
  afterHeader,
  _heading = {},
}) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Spinner size="lg" />
      </Box>
    );
  }

  return (
    <Box>
      <Navbar isMenu={isMenu} />
      <HeadingText {..._heading} />
      {afterHeader}
      <Box overflow={isScrollable ? "auto" : "hidden"}>{children}</Box>
    </Box>
  );
};

export default Layout;
