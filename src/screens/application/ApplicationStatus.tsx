import React, { useEffect, useState } from "react";
import { Box, Stack } from "@chakra-ui/react";
import "../../assets/styles/App.css";
import Layout from "../../components/common/layout/Layout";
import ApplicationList from "../../components/ApplicationList";
import { applicationList } from "../../assets/mockdata/applicationList";
import { getTokenData } from "../../services/auth/asyncStorage";
import { getApplicationList, getUser } from "../../services/auth/auth";

const ApplicationStatus: React.FC = () => {
  const [aapplicationList, setApplicationList] = useState();

  const init = async (SearchText) => {
    try {
      const result = await getUser();
      console.log("application list ", result);

      const user_id = result?.data?.user_id;
      console.log("user_id list ", user_id);
      const data = await getApplicationList(SearchText, user_id);
      console.log("application list ", data.data.applications);
      setApplicationList(data.data.applications);
    } catch (error) {
      console.error("Error fetching application list:", error);
    }
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <Layout
      _heading={{
        heading: "My Applications",
        subHeading: "Track your application progress",
        isFilter: true,
        onSearch: init,
      }}
      isSearchbar={true}
    >
      <Box>
        <Stack spacing={4}>
          {applicationList?.length ? (
            <ApplicationList applicationList={aapplicationList} />
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
