import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
  Stack,
} from "@chakra-ui/react";
import { useKeycloak } from "@react-keycloak/web";
import React, { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/App.css";
import CommonButton from "../../components/common/button/Button";
import FloatingSelect from "../../components/common/input/FloatingSelect";
import Layout from "../../components/common/layout/Layout";
import frameImage from "../../assets/images/frame.png";
import { changeLanguage } from "i18next";

const Splash: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { keycloak } = useKeycloak();
  const [formData, setFormData] = useState({ name: "en" });
  const options = [{ label: t("LOGIN_ENGLISH"), value: "en" }];

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    changeLanguage(value);
  };

  const handleRedirect = () => {
    navigate("/SignUp");
  };

  const handleLogin = async () => {
    try {
      await keycloak.login();
    } catch (error) {
      console.error(
        "Login failed:",
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  };
  // useEffect(() => {});
  return (
    <Layout isNavbar={false} isBottombar={false}>
      <Flex height="50%" justifyContent="flex-end" className="purple-bg">
        <Image
          src={frameImage}
          alt="Login Image"
          objectFit="contain"
          transform="translateX(-50%)"
          width="60%"
          height="400px"
        />
      </Flex>
      <Stack p={4} mt={4} pt={12} className="login-form" shadow="lg">
        <form>
          <FormControl>
            <FormLabel color={"#45464F"}>
              {t("LOGIN_SELECT_PREFERRED_LANGUAGE")}
            </FormLabel>
            <FloatingSelect
              label={t("LOGIN_SELECT_LANGUAGE")}
              name="name"
              value={formData.name}
              onChange={handleChange}
              options={options}
            />
            <FormHelperText marginTop={"-15px"}>
              {t("LOGIN_CHANGE_LATER")}
            </FormHelperText>
          </FormControl>
        </form>
        <CommonButton
          onClick={handleRedirect}
          label={t("LOGIN_REGISTER_BUTTON")}
          mt={8}
        />
        <CommonButton
          onClick={handleLogin}
          label={t("LOGIN_LOGIN_BUTTON")}
          mt={8}
          variant="outline"
        />
      </Stack>
    </Layout>
  );
};

export default Splash;
