import React, { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import BenefitCard from "../../components/common/Card";
import { scholarships } from "../../assets/mockdata/benefit";
import Layout from "../../components/common/layout/Layout";
import { useNavigation } from "react-router-dom";
import { getTokenData } from "../../services/auth/asyncStorage";
import { getUser } from "../../services/auth/auth";
import { getAll } from "../../services/benefit/benefits";

const ExploreBenefits: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({});
  const [initState, setInitState] = useState("yes");
  const [error, setError] = useState();
  const handleOpen = () => {
    console.log("Filter clicked");
  };
  const [benefits, setBenefits] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        const { sub } = await getTokenData();
        const user = await getUser(sub);
        console.log("user", user);
        // const filters = {
        //   "social-eligibility": user?.data?.caste,
        //   "ann-hh-inc": user?.data?.income,
        //   "gender-eligibility": user?.data?.gender,
        // };
        // const newFilter = {};
        // Object.keys(filters).forEach((key) => {
        //   if (filters[key] && filters[key] !== "") {
        //     if (typeof filters[key] === "string") {
        //       newFilter[key] = filters[key].toLowerCase();
        //     } else {
        //       newFilter[key] = filters[key];
        //     }
        //   }
        // });
        // setFilter(newFilter);
        setInitState("no");
      } catch (e) {
        setError(e.message);
        setInitState("no");
      }
    };
    init();
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        if (initState == "no") {
          setLoading(true);
          console.log("hello2");
          const result = await getAll({
            // filters: {
            //   ...filter,
            //   "ann-hh-inc": filter?.["ann-hh-inc"]
            //     ? `0-${filter?.["ann-hh-inc"]}`
            //     : "",
            // },
            search,
          });
          console.log(result, "result");
          setBenefits(result?.data?.ubi_network_cache || []);
          console.log("user data", result?.data?.ubi_network_cache);
          setLoading(false);
        }
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    };
    init();
  }, [filter, search, initState]);
  return (
    <Layout
      _heading={{
        heading: "Browse Benefits",
        isFilter: true,
        handleOpen: handleOpen,
      }}
    >
      <Box className="card-scroll">
        {benefits.map((scholarship) => {
          console.log(scholarship);

          return <BenefitCard item={scholarship} />;
        })}

        <Box m={4}>
          <Button className="custom-btn" type="submit" mt={4} width="100%">
            Load More
          </Button>
        </Box>
      </Box>

      {/* <Modal
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
            <CommonButton label="Apply Filters" />
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </Layout>
  );
};

export default ExploreBenefits;
