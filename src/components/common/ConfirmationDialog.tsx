import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Divider,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Heading,
} from "@chakra-ui/react";
import CommonButton from "./button/Button";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="border-bottom">
          <Box className="heading">Application Submitted</Box>
          <Box color="gray.600" fontWeight="300" fontSize={"18px"}>
            Confirmation
          </Box>
        </ModalHeader>
        <Divider />

        <ModalCloseButton />
        <ModalBody className="border-bottom">
          <Heading size="md" color="#484848" fontWeight={500} mt={6}>
            Your application to the{" "}
            <span className="text-blue">Pre-Matric Scholarship-SC </span>{" "}
            Benefit has been submitted!
          </Heading>
          <Box mt={4} mb={4}>
            Application ID : 1303
          </Box>
        </ModalBody>
        <ModalFooter>
          <CommonButton onClick={onClose} label="Okay" />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationDialog;
