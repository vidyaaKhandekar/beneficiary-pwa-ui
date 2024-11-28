import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import CommonButton from "./button/Button";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Term {
  title?: string;
  description?: string;
  list?: {
    value: string;
  }[];
}
interface CommonDialogueProps {
  isOpen?: boolean;
  onClose?: () => void;
  termsAndConditions?: Term[];
  handleDialog?: () => void;
}
const CommonDialogue: React.FC<CommonDialogueProps> = ({
  isOpen,
  onClose,
  termsAndConditions,
  handleDialog,
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const handleAccordionChange = (expandedIndex) => {
    setIsAccordionOpen(expandedIndex.length > 0);
  };
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius="md">
        <ModalHeader className="border-bottom">
          {termsAndConditions && (
            <>
              <Box className="heading">Terms and Conditions</Box>
              <Box color="gray.600" fontWeight="300" fontSize="18px">
                Confirmation
              </Box>
            </>
          )}
        </ModalHeader>
        {!termsAndConditions && <ModalCloseButton />}

        <ModalBody
          className="border-bottom"
          maxHeight="400px" // Fixed height for Modal Body
          overflowY="auto" // Enables scrolling for Modal Body
        >
          {termsAndConditions ? (
            <>
              <Text mt={4} mb={10} fontWeight="500" fontSize="20px">
                {t("CONFIRMATION_DIALOGUE_CONSENT_TEXT")}
              </Text>
              <Text mt={4} mb={4} fontWeight="normal" fontSize="17px">
                {t("DIALOGUE_CLICK_TO_READ_AND_PROCEED")}
              </Text>
              <Accordion allowMultiple onChange={handleAccordionChange}>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        {t("DIALOGUE_T&C")}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    pb={4}
                    maxHeight="200px" // Fixed height for Accordion Panel
                    overflowY="auto" // Enables scrolling for Accordion Panel
                  >
                    <div>
                      {termsAndConditions?.map((item, index) => (
                        <div key={index}>
                          <Text color={"#4D4639"} size="16px">
                            {index + 1}. {item.description}
                          </Text>
                        </div>
                      ))}
                    </div>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </>
          ) : (
            ""
          )}
        </ModalBody>
        <ModalFooter>
          {termsAndConditions ? (
            <>
              <CommonButton
                variant="outline"
                onClick={onClose}
                label={t("CONFIRMATION_DIALOGUE_DENY")}
                isDisabled={!isAccordionOpen}
              />
              <Box ml={2}>
                <CommonButton
                  label={t("CONFIRMATION_DIALOGUE_ACCEPT")}
                  isDisabled={!isAccordionOpen}
                  onClick={handleDialog}
                />
              </Box>
            </>
          ) : (
            ""
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CommonDialogue;
