import React, { useRef, useEffect } from "react";
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
  console.log("url", url);
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

  const injectFormData = () => {
    const iframeWindow = iframeRef.current?.contentWindow as any; // Type assertion to allow eval
    if (iframeWindow) {
      const jsCode = `
        (function() {
          const formData = ${formDataString};
          console.log("FormData1",${formDataString})
             
          const form = document.querySelector('form');
  console.log("key in form",form)
          if (form) {
            Object.keys(formData).forEach((key) => {
              console.log("key in form",key)
              const input = form.querySelector('[name="' + key + '"]');
              if (input) {

                input.value = formData[key];
              }
            });
          }
        })();
      `;
      iframeWindow.eval(jsCode);
    }
  };

  const handleLoad = () => {
    setTimeout(() => {
      injectFormData();
    }, 1000);
  };

  const handleMessage = (event: MessageEvent) => {
    if (event.origin !== new URL(url).origin) return;
    setPageContent(event.data);
  };

  useEffect(() => {
    // Event listener for cross-origin communication
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={4}>
      <iframe
        ref={iframeRef}
        title="Web Form Submission"
        src={url}
        onLoad={handleLoad}
        style={{ width: "100%", height: "80vh", border: "1px solid #ccc" }}
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
      <Button mt={4} onClick={handleFormSubmit} colorScheme="blue">
        Submit Form
      </Button>
    </Box>
  );
};

export default WebViewFormSubmitWithRedirect;
