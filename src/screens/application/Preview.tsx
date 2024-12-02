import React, { useEffect, useState } from "react";
import {
  Box,
  HStack,
  ListItem,
  Text,
  UnorderedList,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getApplicationDetails,
  getDocumentsList,
} from "../../services/auth/auth";
import Layout from "../../components/common/layout/Layout";
import {
  getPreviewDetails,
  getSubmmitedDoc,
} from "../../utils/jsHelper/helper";

interface UserData {
  id: number;
  label: string;
  value: string;
  length?: number;
}

const labelStyles = {
  fontSize: "16px",
  fontWeight: "600",
  mb: 1,
  color: "#06164B",
  lineHeight: "16px",
};

const valueStyles = {
  fontSize: "16px",
  fontWeight: "400",
  color: "#1F1B13",
  lineHeight: "14px",
};
const Preview: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<UserData[]>();
  const [benefitName, setBenefitName] = useState<string | undefined>("");
  const [status, setStatus] = useState("");
  const [document, setDocument] = useState<string[]>([]);
  const toast = useToast();
  const handleBack = () => {
    navigate("/applicationstatus");
  };

  const init = async () => {
    try {
      if (!id) {
        toast({
          title: "Error",
          description: "Invalid application ID",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        navigate("/applicationstatus");
        return;
      }
      const documents = await getDocumentsList();
      const result = await getApplicationDetails(id);
      console.log("in preview", result?.data);
      setStatus(result?.data?.status);
      const doc = getSubmmitedDoc(
        result?.data?.application_data,
        documents.data
      );
      setBenefitName(result?.data?.external_application_id);
      const data = getPreviewDetails(result?.data?.application_data, doc);
      setUserData(data);
      console.log(data, "data");
      setDocument(doc);
    } catch (error) {
      console.error("Error fetching application details:", error);
      console.log("error", error);

      toast({
        title: "Error",
        description: "Failed to fetch application details",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      navigate("/applicationstatus");
    }
  };

  useEffect(() => {
    init();
  }, [id]);

  console.log("docuyments", document);

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
        height="52px"
      >
        <Text fontWeight={400} fontSize={14}>
          Status
        </Text>
        <Text color="#EDA145" fontWeight={700} fontSize={14}>
          {status}
        </Text>
      </HStack>

      <Box
        flex={1}
        alignItems="center"
        justifyContent="center"
        ml={"10%"}
        mt={"5%"}
      >
        {userData?.map((item, index) => {
          if (index % 2 === 0 && index < userData.length) {
            const firstItem = item;
            const secondItem = userData[index + 1];

            return (
              <HStack
                key={item.id}
                mb={6}
                alignItems="center"
                justifyContent="center"
              >
                <Box flex={1} alignItems="center">
                  <Text {...labelStyles}>{firstItem.label}</Text>
                  <Text {...valueStyles}>{firstItem.value}</Text>
                </Box>

                {secondItem && (
                  <Box flex={1} alignItems="center">
                    <Text {...labelStyles}>{secondItem.label}</Text>
                    <Text {...valueStyles}>{secondItem.value}</Text>
                  </Box>
                )}
              </HStack>
            );
          }

          return null;
        })}
        <Text {...labelStyles}>Uploaded Documents</Text>
        <UnorderedList mt={3}>
          {document?.slice(0, -2).map((document) => (
            <ListItem key={document}>{document}</ListItem>
          ))}
        </UnorderedList>
      </Box>
    </Layout>
  );
};

export default Preview;
