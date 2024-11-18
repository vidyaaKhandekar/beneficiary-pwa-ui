import React from "react";
import { Box, Text, Progress } from "@chakra-ui/react";

// Define props interface
interface ProgressWithLabelProps {
  value: number;
}

const ProgressWithLabel: React.FC<ProgressWithLabelProps> = ({ value }) => {
  return (
    <Box
      borderRadius="5px"
      boxShadow="0px 2px 2px 0px #00000040"
      bg="white"
      w="100%"
      borderWidth={1}
      pl={3}
      pt={2}
      h={86}
    >
      <Text>Profile Completion</Text>
      <Progress
        value={value}
        size="sm"
        borderRadius={5}
        colorScheme="teal"
        mt={5}
        m={3}
      />
    </Box>
  );
};

export default ProgressWithLabel;
