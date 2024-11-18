import React, { useEffect, useState } from "react";
import {
  Box,
  HStack,
  Text,
  Input,
  useToast,
  InputGroup,
  InputRightElement,
  Icon,
  Textarea,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { getApplicationDetails } from "../../services/auth/auth";
import Layout from "../../components/common/layout/Layout";
import { FaCheck } from "react-icons/fa";
// Define types for props and data
interface ApplicationField {
  id: number;
  label: string;
  value: string;
}

interface UserData {
  [key: string]: string | number | undefined;
}

const myApplicationData: ApplicationField[] = [
  { id: 1, label: "Full Name", value: "first_name" },
  { id: 2, label: "Last Name", value: "last_name" },
  { id: 3, label: "Gender", value: "gender" },
  { id: 4, label: "Age", value: "age" },
  { id: 5, label: "Samagra Id", value: "samagra_id" },
  { id: 6, label: "Class", value: "current_class" },
  { id: 7, label: "Adhaar Card", value: "aadhaar" },
  { id: 8, label: "Marks", value: "previous_year_marks" },
  { id: 9, label: "Caste", value: "caste" },
  { id: 10, label: "School Name", value: "current_school_name" },
];

const Preview: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [benefitName, setBenefitName] = useState<string | undefined>("");
  const toast = useToast();

  const handleBack = () => {
    navigate("/applicationstatus");
  };

  const init = async () => {
    try {
      const result = await getApplicationDetails(id);
      setUserData(result?.data?.application_data);
      setBenefitName(result?.data?.external_application_id);
    } catch (error) {
      console.error("Error fetching application details:", error);
      toast({
        title: "Error",
        description: "Failed to fetch application details",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    init();
  }, [id]);

  return (
    <Layout
      _heading={{
        heading: "My Applications",
        subHeading: `Application ID ${benefitName}`,
        handleBack,
      }}
    >
      <HStack
        justifyContent="space-between"
        alignItems="center"
        bg="#DEE4F9"
        p={3}
        height="70px"
      >
        <Text fontWeight={400} fontSize={14}>
          Status
        </Text>
        <Text color="#EDA145" fontWeight={700} fontSize={14}>
          Submitted
        </Text>
      </HStack>

      {/* Application Fields */}
      <Box className="card-scroll" p={4}>
        {myApplicationData.map((field) => (
          <Box key={field.id} my={2}>
            <Text fontWeight="400" mb={1} fontSize={14}>
              {field.label}
            </Text>
            <InputGroup>
              <Textarea
                value={
                  userData?.[field.value] !== undefined &&
                  typeof userData?.[field.value] === "number"
                    ? userData?.[field.value].toString()
                    : userData?.[field.value]
                    ? (userData?.[field.value] as string)
                    : "__"
                }
                isReadOnly
                bg="gray.50"
                focusBorderColor="#1D1B201F"
                borderColor="#1D1B201F"
                variant="filled"
                h="auto"
                minH="48px"
                resize="none"
                color="#1A1B21"
                borderWidth={1}
                fontSize={12}
                overflow="hidden"
                mr={1}
              />

              {userData?.[field.value] ? (
                <InputRightElement pointerEvents="none" height="100%">
                  <Icon as={FaCheck} color="#0B7B69" />
                </InputRightElement>
              ) : null}
            </InputGroup>
          </Box>
        ))}
      </Box>
    </Layout>
  );
};

export default Preview;
