import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Text,
  VStack,
  Center,
  useToast,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import Layout from "../../components/common/layout/Layout";
import FloatingInput from "../../components/common/input/Input";
import FloatingPasswordInput from "../../components/common/input/PasswordInput";
import CommonButton from "../../components/common/button/Button";
import { useTranslation } from "react-i18next";
import Loader from "../../components/common/Loader";

interface UserDetails {
  firstName: string;
  lastName: string;
  mobile: string;
  password: string;
}

const SignUpWithPassword: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toast = useToast();

  const [userDetails, setUserDetails] = useState<UserDetails>({
    firstName: "",
    lastName: "",
    mobile: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  //   const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [UserName, SetUserName] = useState<string>("");
  const handleBack = () => {
    navigate(-1);
  };

  const [mobileError, setMobileError] = useState<string>("");

  const validateMobile = (mobile: string): string => {
    console.log("calling");

    const trimmedMobile = mobile.trim();

    if (!trimmedMobile) {
      return "Mobile number is required.";
    }

    if (trimmedMobile.length !== 10) {
      return "Mobile number must be exactly 10 digits long.";
    }

    const mobilePattern = /^[6-9]\d{9}$/;

    if (!mobilePattern.test(trimmedMobile)) {
      return "Mobile number must start with a digit between 6 and 9.";
    }

    return "";
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof UserDetails
  ) => {
    const value = e.target.value;

    setUserDetails((prev) => {
      const updatedDetails = {
        ...prev,
        [key]: value,
      };

      // Generate username based on available values
      const { firstName, lastName, mobile } = updatedDetails;

      SetUserName(
        `${firstName?.trim() || ""}_${lastName?.charAt(0) || ""}_${
          mobile?.slice(-4) || ""
        }`
      );

      if (key === "mobile") {
        const errorMessage = validateMobile(value);
        if (errorMessage !== "") {
          setMobileError(errorMessage);
        } else {
          setMobileError("");
        }
      }

      return updatedDetails;
    });
  };

  const handleSignUp = async () => {
    if (!validateMobile(userDetails.mobile)) {
      toast({
        title: t("SIGNUP_INVALID_MOBILE_NUMBER"),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (userDetails.password !== confirmPassword) {
      toast({
        title: t("SIGNUP_PASSWORDS_DO_NOT_MATCH"),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      setLoading(true);
      toast({
        title: t("SIGNUP_SUCCESS"),
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/signin");
    } catch (error) {
      toast({
        title: t("SIGNUP_FAILED"),
        description: error.message || t("SIGNUP_TRY_AGAIN_LATER"),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { firstName, lastName, mobile } = userDetails;

    if (firstName && lastName && mobile.length >= 6) {
      const username = `${firstName}_${lastName?.charAt(0)}_${mobile?.slice(
        -4
      )}`;
      setUserDetails((prev) => ({
        ...prev,
        username,
      }));
    }
  }, [userDetails.firstName, userDetails.lastName, userDetails.mobile]);

  return (
    <Layout
      isMenu={false}
      _heading={{
        heading: t("LOGIN_REGISTER_BUTTON"),
        handleBack,
      }}
      isBottombar={false}
    >
      {loading && <Loader />}
      <Box p={5}>
        <VStack align="stretch" spacing={4}>
          <FormControl>
            <FloatingInput
              name="firstName"
              label={t("SIGNUP_FIRST_NAME")}
              value={userDetails.firstName}
              onChange={(e) => handleInputChange(e, "firstName")}
              isInvalid={!userDetails.firstName.trim()}
              errorMessage={t("SIGNUP_FIRST_NAME_REQUIRED")}
            />
            <FloatingInput
              name="lastName"
              label={t("SIGNUP_LAST_NAME")}
              value={userDetails.lastName}
              onChange={(e) => handleInputChange(e, "lastName")}
              isInvalid={!userDetails.lastName.trim()}
              errorMessage={t("SIGNUP_LAST_NAME_REQUIRED")}
            />
            <FloatingInput
              name="mobile"
              label={t("SIGNUP_MOBILE_NUMBER")}
              value={userDetails.mobile}
              onChange={(e) => handleInputChange(e, "mobile")}
              isInvalid={!validateMobile(userDetails.mobile)}
              errorMessage={mobileError}
            />
            <FloatingPasswordInput
              label={t("SIGNUP_PASSWORD")}
              value={userDetails.password}
              onChange={(e) => handleInputChange(e, "password")}
              isInvalid={!userDetails.password.trim()}
              errorMessage={t("SIGNUP_PASSWORD_REQUIRED")}
            />

            <FloatingPasswordInput
              label={t("SIGNUP_CONFIRM_PASSWORD")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              isInvalid={confirmPassword.trim() === ""}
              errorMessage={t("SIGNUP_CONFIRM_PASSWORD_REQUIRED")}
            />
            {UserName.length > 0 && (
              <Text textAlign="center" fontSize="14px" mt={4}>
                {"Your username will be "}
                <Text as="span" fontWeight="bold" color="#06164B">
                  {UserName}
                </Text>
              </Text>
            )}
            <CommonButton
              mt={4}
              label={"Register"}
              onClick={handleSignUp}
              //
            />
          </FormControl>
        </VStack>
        <Center>
          <Text mt={6}>
            {t("SIGNUP_ALREADY_HAVE_AN_ACCOUNT")}
            <Box as="span" ml={2}>
              <RouterLink
                to="/signin"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                {t("LOGIN_LOGIN_BUTTON")}
              </RouterLink>
            </Box>
          </Text>
        </Center>
      </Box>
    </Layout>
  );
};

export default SignUpWithPassword;
