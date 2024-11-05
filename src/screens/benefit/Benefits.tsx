import React, { useState, ChangeEvent } from "react";
import {
  Box,
  Button,
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
} from "@chakra-ui/react";
import FloatingSelect from "../../components/common/inputs/FloatingSelect";
import BenefitCard from "../../components/common/Card";
import { scholarships } from "../../assets/mockdata/benefit";
import CommonButton from "../../components/common/button/Button";
import Layout from "../../components/common/layout/Layout";

const ExploreBenefits: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  const handleOpen = () => {
    onOpen();
    console.log("Filter clicked");
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

  // Search handler
  const onSearch = (query: string) => {
    console.log("Searching with query:", query);
  };

  return (
    <Layout
      _heading={{
        heading: "Browse Benefits",
        isFilter: true,
        handleOpen,
        onSearch,
      }}
      isSearchbar={true}
    >
      <Box className="card-scroll">
        {/* Render BenefitCard components */}
        {scholarships.map((scholarship) => (
          <BenefitCard
            key={scholarship.title}
            date={scholarship.date}
            title={scholarship.title}
            ministry={scholarship.ministry}
            amount={scholarship.amount}
            categories={scholarship.categories}
            description={scholarship.description}
          />
        ))}

        <Box m={4}>
          <Button className="custom-btn" type="submit" mt={4} width="100%">
            Load More
          </Button>
        </Box>
      </Box>

      {/* Filter Modal */}
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
              {/* Add other FloatingSelect components as needed */}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <CommonButton label="Apply Filters" />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
};

export default ExploreBenefits;
