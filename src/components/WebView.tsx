import React, { useRef } from "react";
import { Box, Button, useToast } from "@chakra-ui/react";

interface WebViewFormSubmitWithRedirectProps {
  url: string;
  formData: Record<string, string>;
  setPageContent: (content: string) => void;
}

const WebViewFormSubmitWithRedirect: React.FC<
  WebViewFormSubmitWithRedirectProps
> = ({ url, formData, setPageContent }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const toast = useToast();

  const formDataString = JSON.stringify(formData);

  const handleFormSubmit = () => {
    // Inject JavaScript to simulate form submission
    if (iframeRef.current?.contentWindow) {
      const jsCode = `
        (function() {
          const form = document.querySelector('form');
          if (form) {
            form.submit();
          }
        })();
      `;
      iframeRef.current.contentWindow.eval(jsCode);
      toast({ title: "Form Submitted", status: "success", duration: 2000 });
    }
  };

  const handleLoad = () => {
    if (iframeRef.current?.contentWindow) {
      // Inject form data into the iframe's form fields
      const jsCode = `
        (function() {
          const formData = ${formDataString};
          Object.keys(formData).forEach((key) => {
            const input = document.querySelector('[name="' + key + '"]');
            if (input) {
              input.value = formData[key];
            }
          });
        })();
      `;
      iframeRef.current.contentWindow.eval(jsCode);
    }
  };

  const handleMessage = (event: MessageEvent) => {
    if (event.origin !== new URL(url).origin) return;
    setPageContent(event.data);
  };

  React.useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={4}>
      <iframe
        ref={iframeRef}
        src={url}
        onLoad={handleLoad}
        style={{ width: "100%", height: "80vh", border: "1px solid #ccc" }}
      />
      <Button mt={4} onClick={handleFormSubmit} colorScheme="blue">
        Submit Form
      </Button>
    </Box>
  );
};

export default WebViewFormSubmitWithRedirect;
