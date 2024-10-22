import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Text,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Divider,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import "../../assets/styles/App.css";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { Link as RouterLink } from "react-router-dom";
import { MdOutlineFilterAlt } from "react-icons/md";
import FloatingSelect from "../common/FloatingSelect";
import { scholarships } from "../../assets/mockdata/benefit";
import BenefitCard from "../common/BenefitCard";

const ExploreBenefits: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onOpen();
  };

  const [formData, setFormData] = useState({ name: "" });

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const options = [
    { value: "10th", label: "10th" },
    { value: "12th", label: "12th" },
  ];
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
            <Grid
              templateColumns="repeat(2, 1fr)"
              className="border-bottom"
              mt={4}
              mb={2}
              p={2}
            >
              <GridItem>
                <Box>
                  <Heading as="h4" size="lg" mb={2} className="heading">
                    <ArrowBackIcon /> Browse Benefits
                  </Heading>
                </Box>
              </GridItem>
              <GridItem>
                <Box float={"right"} onClick={handleSubmit}>
                  <MdOutlineFilterAlt fontSize={"25px"} />
                </Box>
              </GridItem>
            </Grid>
            {/* {created seperate component for scholarship card and map mock data  to it} */}
            {scholarships.map((scholarship, index) => (
              <BenefitCard key={index} {...scholarship} />
            ))}
            <Box m={4}>
              <Button className="custom-btn" type="submit" mt={4} width="100%">
                Load More
              </Button>
            </Box>
          </Box>
          <Modal
            isCentered
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader className="border-bottom">
                <Box className="heading">Filters</Box>
              </ModalHeader>
              <Divider />

              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FloatingSelect
                    label="Education level"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    options={options}
                  />
                  <FloatingSelect
                    label="Gender"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    options={options}
                  />
                  <FloatingSelect
                    label="Annual Income"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    options={options}
                  />
                  <FloatingSelect
                    label="Benefit Amount"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    options={options}
                  />
                  <FloatingSelect
                    label="Subject"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    options={options}
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="custom-btn"
                  type="submit"
                  mt={4}
                  m={2}
                  width="100%"
                >
                  Apply Filters
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Footer />
        </Box>
      </Flex>
    </Box>
  );
};

export default ExploreBenefits;
