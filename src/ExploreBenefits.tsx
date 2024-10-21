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
  Center,
  Badge
} from "@chakra-ui/react";
import "./App.css";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { Link as RouterLink } from 'react-router-dom';

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
          <Header />
          <Box className="card-scroll">
       <Card maxW='2xl' m={4}  shadow="lg"    
       sx={{border: '1px solid #ebe4e4c9',borderRadius: '10px'}}>
  <CardBody>
  <Box className="badge-box">
            31st July,2024
          </Box>
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
      <Text mt={4}>
      The Pre-matric Scholarship-SC is provided by the Ministry of Social Justice and the Tribal Welfare Department of Madhya Pradesh. It supports Class 9 and 10 students from low-income families with an annual income below ₹2,50,000. Both genders are eligible.
      </Text>
     
  </CardBody>
  <Flex align="center" justify="center" width="100%" pt={2} mb={4} fontWeight={400}>
    <Link className="text-blue" 
      as={RouterLink} 
      to="/benefitsdetails"    
      >
        View Details <ArrowForwardIcon />
      </Link>
      </Flex>
</Card>
<Box m={4}>
<Button
                className="custom-btn"
                type="submit"
                mt={4}
                width="100%"
              >
                Load More
              </Button>
</Box>
</Box>


<Footer/> 
</Box>

      </Flex>
      </Box>
   
  );
};

export default ExploreBenefits;
