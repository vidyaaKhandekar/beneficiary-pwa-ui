import React from "react";
import { Box, Text, Progress } from "@chakra-ui/react";

// Define props interface
interface ProgressWithLabelProps {
  totalDocuments: number; // Total number of documents
  presentDocuments: number; // Present number of documents
  label?: string; // Optional label for the progress bar
  colorScheme?: string; // Optional color scheme for the progress bar
  height?: number | string; // Optional height for the component
}

const ProgressWithLabel: React.FC<ProgressWithLabelProps> = ({
  totalDocuments,
  presentDocuments,
  label = "Profile Completion", // Default label
  colorScheme = "teal", // Default color scheme
  height = 86, // Default height
}) => {
  // Calculate the progress value
  const value =
    totalDocuments > 0 ? (presentDocuments / totalDocuments) * 100 : 0;

  return (
    <Box
      borderRadius="5px"
      boxShadow="0px 2px 2px 0px #00000040"
      bg="white"
      w="100%"
      borderWidth={1}
      pl={3}
      pt={2}
      h={height} // Dynamic height
    >
      <Text>{label}</Text>
      <Progress
        value={value}
        max={100}
        size="sm"
        borderRadius={5}
        colorScheme={colorScheme} // Dynamic color scheme
        mt={5}
        m={3}
        aria-label={`${label} progress`}
      />
    </Box>
  );
};

export default ProgressWithLabel;
