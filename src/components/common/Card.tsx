import React from "react";
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Text,
  Link,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { formatDateString } from "../../utils/jsHelper/helper";
import { MdCurrencyRupee } from "react-icons/md";
interface BenefitCardProps {
  item: {
    item_id: number;
    title: string;
    provider_name: string;

    item: {
      price?: { value?: number; currency?: string };
      tags: Array<{ list?: string[] }>;
      time?: { range?: { end?: string } };
    };
    descriptor?: {
      short_desc: string;
    };
  };
}

const BenefitCard: React.FC<BenefitCardProps> = ({ item }) => {
  const extractValuesByDescriptors = (data, descriptorCodes) => {
    const values = [];

    data.forEach((item) => {
      if (item.list && Array.isArray(item.list)) {
        item.list.forEach((subItem) => {
          if (descriptorCodes.includes(subItem.descriptor.code)) {
            values.push(subItem.value);
          }
        });
      }
    });

    return values;
  };

  const id = item?.item_id;
  const dateStr = item?.item?.time?.range?.end;
  const formattedDate = dateStr ? formatDateString(dateStr) : "";
  const eligibility = extractValuesByDescriptors(item?.item?.tags, [
    "caste-eligibility",
    "Gender-eligibility",
    "state-eligibility",
  ]);

  return (
    <Card
      maxW="2xl"
      m={4}
      shadow="lg"
      sx={{ border: "1px solid #ebe4e4c9", borderRadius: "10px" }}
    >
      <CardBody>
        <Box className="badge-box" width={"auto"}>
          {formattedDate}
        </Box>
        <Heading size="md" mt={2}>
          {item?.title}
        </Heading>
        <Heading size="sm" color="#484848" fontWeight={400} mt={2}>
          {item?.provider_name}
        </Heading>
        {item?.item?.price?.value && (
          <HStack
            align="center"
            flexDirection={"row"}
            alignItems={"center"}
            mt={2}
          >
            {" "}
            <Icon as={MdCurrencyRupee} boxSize={4} color="#484848" />{" "}
            <Text color="#484848" marginLeft="1">
              {" "}
              {item?.item?.price?.value}{" "}
            </Text>{" "}
            <Text color="#484848" marginLeft="1">
              {" "}
              {/* {item?.item?.price?.currency || "INR"}{" "} */}
            </Text>{" "}
          </HStack>
        )}
        <Flex alignItems="center" mt={2}>
          {eligibility?.length > 0 ? (
            eligibility.map((category) => (
              <Box
                key={category}
                mr={2}
                color={"#0037B9"}
                border={"1px"}
                borderRadius={"6px"}
                p={"2px 10px"}
                fontSize={"11px"}
                fontWeight={500}
              >
                {category.toUpperCase()}
              </Box>
            ))
          ) : (
            <Box mr={2}>No eligibility criteria specified</Box>
          )}
        </Flex>
        <Text mt={4}>{item?.descriptor?.short_desc}</Text>
      </CardBody>
      <Flex
        align="center"
        justify="center"
        width="100%"
        pt={2}
        mb={4}
        fontWeight={400}
      >
        <Link
          className="text-blue"
          as={RouterLink}
          to={`/benefitsdetails/${id}`}
          color={"#0037b9"}
        >
          View Details <ArrowForwardIcon />
        </Link>
      </Flex>
    </Card>
  );
};

export default BenefitCard;
