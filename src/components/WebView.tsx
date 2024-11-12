import { Box, Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef } from "react";

interface WebViewFormSubmitWithRedirectProps {
  url: string;
  formData: Record<string, any>;
  setPageContent?: (content: string) => void;
}

const WebViewFormSubmitWithRedirect: React.FC<
  WebViewFormSubmitWithRedirectProps
> = ({ url, formData, setPageContent }) => {
  const formRef = useRef<HTMLFormElement>(null); // Form reference
  const toast = useToast();

  const submitFormDetail = async (
    action: string,
    urlencoded: URLSearchParams
  ) => {
    try {
      const axiosResponse = await axios.post(action, urlencoded, {
        headers: {
          "Content-Type": `application/x-www-form-urlencoded`,
        },
      });
      console.log("Submission ID:", axiosResponse.data);
      if (axiosResponse.data) {
        setPageContent(axiosResponse.data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const searchForm = async (url: string) => {
    try {
      const response = await fetch(url, { method: "GET" });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const htmlContent = await response.text();
      const container = document.getElementById("formContainer");
      if (container) {
        container.innerHTML = htmlContent;

        const form = container.querySelector("form");
        if (form) {
          formRef.current = form; // Store form reference

          // Autofill form inputs
          const inputElements = form.querySelectorAll("input");
          inputElements.forEach((input) => {
            const inputName = input.getAttribute("name");
            if (formData[inputName] !== undefined) {
              if (input.type === "checkbox" || input.type === "radio") {
                input.checked = formData[inputName] === input.value;
              } else {
                input.value = formData[inputName];
              }
            }
          });

          const selectElements = form.querySelectorAll("select");
          selectElements.forEach((select) => {
            const selectName = select.getAttribute("name");
            if (formData[selectName] !== undefined) {
              select.value = formData[selectName];
            }
          });

          // Hide the submit button inside the form loaded from the URL
          const submitButton = form.querySelector(
            'input[type="submit"], button[type="submit"]'
          );
          if (submitButton) {
            submitButton.style.display = "none"; // Hide only the submit button from the external form
          }
        }
      }
    } catch (error) {
      console.error("Error loading form:", error);
      toast({
        title: "Error loading form",
        description: error.message,
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleExternalFormSubmit = async () => {
    if (formRef.current) {
      const formDataObj = new FormData(formRef.current);
      const urlencoded = new URLSearchParams();
      let formDataObject: Record<string, any> = {};
      let isFormValid = true;

      // Check if any input is empty
      formDataObj.forEach((value, key) => {
        if (!value) {
          isFormValid = false; // Mark the form as invalid if any field is empty
        }
        formDataObject[key] = value;
        urlencoded.append(key, value.toString());
      });

      if (!isFormValid) {
        toast({
          title: "Please fill all the fields",
          status: "error",
          duration: 2000,
        });
        return;
      }

      console.log("Form Data:", formDataObject);

      await submitFormDetail(formRef.current.action, urlencoded);

      toast({
        title: "Form Submitted Successfully",
        status: "success",
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    searchForm(url);
  }, [url]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={4}>
      <div id="formContainer"></div>

      {/* External Button to Submit the Form */}
      <Button onClick={handleExternalFormSubmit} colorScheme="teal" mt={4}>
        Submit Form
      </Button>
    </Box>
  );
};

export default WebViewFormSubmitWithRedirect;
