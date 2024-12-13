import React from "react";
import { Box, Text, VStack, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface Application {
  benefit_id: string;
  application_name: string;
  internal_application_id: string;
  status: "submitted" | "approved" | "rejected";
  application_data: Record<string, unknown>;
}

interface ApplicationListProps {
  applicationList?: Application[];
}

const STATUS = {
  SUBMITTED: "submitted",
  APPROVED: "approved",
  PENDING_FOR_REVIEW: "pending for review",
  AMOUNT_TRANSFER_IN_PROGRESS: "amount transfer in progress",
  SUBMITTED_FOR_DISBURSAL: "submmited for disbursal",
  AMOUNT_RECEIVED: "amount received",
} as const;

const COLORS = {
  success: "#0B7B69",
  warning: "#EDA145",
  error: "#8C1823",
  text: "#1F1B13",
} as const;

const StatusIcon: React.FC<{ status: string }> = ({ status }) => {
  const text = (
    <Text fontSize="16px" color={COLORS.text}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Text>
  );
  return <HStack alignItems="center">{text}</HStack>;
};

const ApplicationList: React.FC<ApplicationListProps> = ({
  applicationList = [],
}) => {
  const navigate = useNavigate();
  const groupedApplications = React.useMemo(
    () =>
      applicationList.reduce((acc, app) => {
        if (!acc[app.status]) {
          acc[app.status] = [];
        }
        acc[app.status].push(app);
        return acc;
      }, {} as Record<keyof typeof STATUS, Application[]>),
    [applicationList]
  );

  const statusOrder = [
    STATUS.SUBMITTED,
    STATUS.PENDING_FOR_REVIEW,
    STATUS.SUBMITTED_FOR_DISBURSAL,
    STATUS.AMOUNT_TRANSFER_IN_PROGRESS,
    STATUS.APPROVED,
    STATUS.AMOUNT_RECEIVED,
  ];
  return (
    <Box
      as="section"
      aria-label="Applications list"
      style={{
        paddingBottom: "100px",
        padding: "16px",
        width: "100%",
      }}
    >
      <VStack spacing={4} align="stretch">
        {statusOrder.map((status, index) =>
          groupedApplications[status]?.length > 0 ? (
            <Box
              borderRadius={10}
              bg="#FFFFFF"
              shadow="md"
              borderWidth="0.5px"
              borderColor="#DDDDDD"
              width="100%"
              key={`${status}${index}`}
            >
              <HStack
                alignItems="center"
                borderBottom="1px"
                borderColor="#DDDDDD"
                height="56px"
                alignContent="center"
                width="100%"
                paddingLeft="16px"
                bg={"#EDEFFF"}
              >
                <StatusIcon status={status} />
              </HStack>
              <VStack align="stretch" spacing={2}>
                {groupedApplications[status].map((app) => (
                  <Box
                    as="button"
                    onClick={() =>
                      navigate(
                        `/previewapplication/${app?.internal_application_id}`
                      )
                    } // Add your function here
                    width="100%"
                    key={app.internal_application_id}
                  >
                    <HStack
                      key={app.benefit_id}
                      width="100%"
                      height={53}
                      padding="20px 8px 16px 16px"
                      justifyContent="space-between"
                    >
                      <Text fontSize="14px" color={COLORS.text} border="none">
                        {app.application_name}
                      </Text>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </Box>
          ) : null
        )}
      </VStack>
    </Box>
  );
};

export default ApplicationList;
