import React from "react";
import { Box, Text, HStack, VStack } from "@chakra-ui/react";

// Define common styles for Text and Input components
const labelStyles = {
  fontSize: "12px",
  fontWeight: "500",
  mb: 1,
  color: "#06164B",
};

const valueStyles = {
  fontSize: "12px",
  fontWeight: "500",
  color: "#1F1B13",
};

interface UserData {
  aadhaar?: string;
  age?: string | null;
  caste?: string;
  created_at?: string;
  current_class?: string;
  current_school_address?: string | null;
  current_school_district?: string | null;
  current_school_name?: string | null;
  date_of_birth?: string | null;
  disability?: string | null;
  email?: string;
  father_name?: string;
  first_name?: string;
  gender?: string;
  image?: string | null;
  income?: string;
  last_name?: string;
  middle_name?: string | null;
  phone_number?: string;
  previous_year_marks?: string;
  samagra_id?: string;
  sso_id?: string;
  sso_provider?: string;
  status?: string;
  student_type?: string;
  updated_at?: string;
  user_id?: string;
  mother_name?: string;
}

interface UserDetailsProps {
  userData: UserData;
}

// Reusable Field Component
const Field: React.FC<{ label: string; value?: string | number }> = ({
  label,
  value = "__",
}) => (
  <Box flex={1}>
    <Text {...labelStyles}>{label}</Text>
    <Text {...valueStyles}>{value || "__"}</Text>
  </Box>
);

const UserDetails: React.FC<UserDetailsProps> = ({ userData }) => {
  return (
    <Box
      borderRadius="5px"
      boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
      bg="white"
      w="100%"
      borderWidth={1}
      p={6}
    >
      {/* First group of fields: one field per line */}
      <VStack spacing={6} align="stretch" mb={6}>
        <Field label="Father’s Name" value={userData?.father_name} />
        <Field label="Mother’s Name" value={userData?.mother_name} />
        <Field label="DoB (DD/MM/YYYY)" value={userData?.date_of_birth} />
      </VStack>

      {/* Second group of fields: two fields per line */}
      <VStack spacing={6} align="stretch">
        <HStack spacing={4}>
          <Field label="Gender" value={userData?.gender} />
          <Field label="Caste" value={userData?.caste} />
        </HStack>

        <HStack spacing={4}>
          <Field label="Disability" value={userData?.disability} />
          <Field label="Class" value={userData?.current_class} />
        </HStack>

        <HStack spacing={4}>
          <Field label="Annual Income" value={userData?.income} />
          <Field label="Day Scholar/Hostler" value={userData?.student_type} />
        </HStack>
      </VStack>
    </Box>
  );
};

export default UserDetails;
