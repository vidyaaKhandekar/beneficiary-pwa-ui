import React, { useContext, useEffect, useState } from "react";
import validator from "@rjsf/validator-ajv6";
import { Box } from "@chakra-ui/react";
import { Theme as ChakraTheme } from "@rjsf/chakra-ui";
import { withTheme } from "@rjsf/core";
import Layout from "../components/common/layout/Layout";
import {
  convertToEditPayload,
  transformUserDataToFormData,
} from "../utils/jsHelper/helper";
import { AuthContext } from "../utils/context/checkToken";
import { updateUserDetails } from "../services/user/User";
import CommonButton from "../components/common/button/Button";
import { useNavigate } from "react-router-dom";

const schema = {
  type: "object",
  properties: {
    personalInfo: {
      type: "object",
      title: "",
      properties: {
        firstName: {
          type: "string",
          title: "First Name",
          minLength: 2,
        },
        fatherName: {
          type: "string",
          title: "Father's Name",
          minLength: 2,
        },
        motherName: {
          type: "string",
          title: "Mother's Name",
          minLength: 2,
        },
        lastName: {
          type: "string",
          title: "Last Name",
          minLength: 2,
        },
        dob: {
          type: "string",
          title: "Date of Birth",
          format: "date",
        },
        gender: {
          type: "string",
          title: "Gender",
          enum: ["Male", "female"],
          enumNames: ["Male", "Female"],
        },
        caste: {
          type: "string",
          title: "Caste",
          enum: ["sc", "st", "obc", "general"],
          enumNames: ["SC", "ST", "OBC", "General"],
        },
        disabilityStatus: {
          type: "string",
          title: "Disability Status",
          enum: ["yes", "no"],
          enumNames: ["Yes", "No"],
        },
        annualIncome: {
          type: "string",
          title: "Annual Income",
          enum: ["0-50000", "50001-100000", "100001-250000", "250001+"],
          enumNames: [
            "0-50,000",
            "50,001-1,00,000",
            "1,00,001-2,50,000",
            "2,50,001 and above",
          ],
        },
      },
      required: ["firstName", "lastName", "gender", "caste"],
    },
    academicInfo: {
      type: "object",
      title: "",
      properties: {
        class: {
          type: "number",
          title: "Class",
          enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          enumNames: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
          ],
        },
        studentType: {
          type: "string",
          title: "Student Type",
          enum: ["Day", "hosteller"],
          enumNames: ["Day Scholar", "Hosteller"],
        },
        currentSchoolName: {
          type: "string",
          title: "Current School Name",
          minLength: 2,
        },
        currentSchoolAddress: {
          type: "string",
          title: "Current School Address",
          minLength: 2,
        },
        currentSchoolDistrict: {
          type: "string",
          title: "Current School District",
          minLength: 2,
        },
        previousYearMarks: {
          type: "string",
          title: "Previous Year Marks",
          pattern: "^[0-9]+(\\.[0-9]{1,2})?%$",
        },
        samagraId: {
          type: "string",
          title: "Samagra ID",
          minLength: 5,
        },
      },
      required: ["class", "studentType", "currentSchoolName"],
    },
    bankDetails: {
      type: "object",
      title: "",
      properties: {
        bankAccountHolderName: {
          type: "string",
          title: "Bank Account Holder Name",
          minLength: 2,
        },
        bankName: {
          type: "string",
          title: "Bank Name",
          minLength: 2,
        },
        bankAccountNumber: {
          type: "string",
          title: "Bank Account Number",
          pattern: "^[0-9]{9,18}$",
        },
        bankIfscCode: {
          type: "string",
          title: "Bank IFSC Code",
          pattern: "^[A-Z]{4}[0-9]{7}$",
        },
      },
      required: [
        "bankAccountHolderName",
        "bankName",
        "bankAccountNumber",
        "bankIfscCode",
      ],
    },
  },
};

// UI Schema for customizing form layout and widgets
const uiSchema = {
  personalInfo: {
    dob: {
      "ui:widget": "date",
      "ui:options": {
        label: true,
      },
    },
  },
  bankDetails: {
    bankAccountNumber: {
      "ui:help": "Enter valid 9-18 digit account number",
    },
    bankIfscCode: {
      "ui:help": "Enter valid IFSC code (e.g. SBIN0000123)",
    },
  },
};

const StudentForm = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext); // Accessing userData from context
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    console.log("Prefill data");

    if (userData) {
      const prefilledData = transformUserDataToFormData(userData);
      setFormData(prefilledData);
    }
  }, [userData]);

  const Form = withTheme(ChakraTheme);

  const onSubmit = async ({ formData }) => {
    const payload = convertToEditPayload(formData);
    try {
      const response = await updateUserDetails(userData.user_id, payload);
      console.log("API Response:", response);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Layout
      _heading={{
        heading: "Edit Profile",
        handleBack,
      }}
    >
      <Box className="card-scroll invisible_scroll" p={5}>
        {formData && (
          <Form
            schema={schema}
            uiSchema={uiSchema}
            formData={formData} // Prefilled values
            validator={validator}
            onSubmit={onSubmit}
            className="space-y-4"
          >
            <div className="flex justify-end">
              <CommonButton label="Edit Profile" onClick={() => onSubmit} />
            </div>
          </Form>
        )}
      </Box>
    </Layout>
  );
};

export default StudentForm;
