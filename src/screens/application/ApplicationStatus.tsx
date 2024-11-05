import React from "react";
import { Box, Stack } from "@chakra-ui/react";
import "../../assets/styles/App.css";
import Layout from "../../components/common/layout/Layout";
import ApplicationList from "../../components/ApplicationList";
import { applicationList } from "../../assets/mockdata/applicationList";

const ApplicationStatus: React.FC = () => {
  const onSearch = (query: string) => {
    console.log("Searching with query:", query);
  };
  return (
    <Layout
      _heading={{
        heading: "My Applications",
        subHeading: "Track your application progress",
        isFilter: true,
        onSearch,
      }}
      isSearchbar={true}
    >
      <Box>
        <Stack spacing={4}>
          {applicationList?.length ? (
            <ApplicationList applicationList={applicationList} />
          ) : (
            <Box textAlign="center" pt={"30%"}>
              No applications found
            </Box>
          )}
        </Stack>
      </Box>
    </Layout>
  );
};

export default ApplicationStatus;
