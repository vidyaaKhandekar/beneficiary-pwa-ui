import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Text,
  Center
} from "@chakra-ui/react";
import "./App.css";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const ExploreBenefits: React.FC = () => {


  return (
    <Box className="main-bg">
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box
        width="550px"
        height="100vh"
        borderRadius="lg"
        shadow="lg"
        borderWidth="1px"
        background="#fff"
      >
       <Card maxW='2xl' m={4}  shadow="lg" >
  <CardBody>
  
      <Heading size='md'>Pre-Matric Scholarship-SC</Heading>
      <Heading size="sm" color="#484848" fontWeight={400}  mt={2}>Ministry of Social Justice</Heading>
      <Text fontSize="md" mt={2}>₹  3500 INR 7700</Text>
      <Flex alignItems="center" mt={2} mb={2}>
      <Box className="category-box" mr={2}>
    sc
  </Box>
  <Box className="category-box"  mr={2}>
madhya pradesh
  </Box>
  <Box className="category-box"  mr={2}>
  All genders
  </Box>
  </Flex>
      <Text>
      The Pre-matric Scholarship-SC is provided by the Ministry of Social Justice and the Tribal Welfare Department of Madhya Pradesh. It supports Class 9 and 10 students from low-income families with an annual income below ₹2,50,000. Both genders are eligible.
      </Text>
     
  </CardBody>
  <Flex align="center" justify="center" width="100%" pt={2} mb={2} fontWeight={400}>
    <Link className="text-blue">
        View Details <ArrowForwardIcon />
      </Link>
      </Flex>
</Card>

<Button
                className="custom-btn"
                type="submit"
                mt={4}
              >
                Load More
              </Button>
</Box>
      </Flex>
      </Box>
   
  );
};

export default ExploreBenefits;
