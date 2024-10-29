import React from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Divider,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import OutlineButton from "./button/OutlineButton";
import CommonButton from "./button/Button";

interface ConsentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const ConsentDialog: React.FC<ConsentDialogProps> = ({
  isOpen,
  onClose,
  onAccept,
}) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="border-bottom">
          <Box className="heading">Terms and Conditions</Box>
          <Box color="gray.600" fontWeight="300" fontSize="18px">
            Confirmation
          </Box>
        </ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody className="border-bottom">
          <Text mt={4} mb={10} fontWeight="500" fontSize="20px">
            Share my documents with the provider for processing my application
          </Text>
          <Text mt={4} mb={4} fontWeight="normal" fontSize="17px">
            Read and accept before you proceed
          </Text>
        </ModalBody>
        <ModalFooter gap={2}>
          <OutlineButton onClick={onClose} label="Deny" />
          <CommonButton onClick={onAccept} label="Accept" />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConsentDialog;
