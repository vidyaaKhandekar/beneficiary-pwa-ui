import React, { useEffect, useRef } from "react";
import OutlineButton from "./button/OutlineButton";
import { processDocuments } from "../../utils/jsHelper/helper";
import { uploadUserDocuments } from "../../services/user/User";
const VITE_EWALLET_ORIGIN = import.meta.env.VITE_EWALLET_ORIGIN;
const VITE_EWALLET_IFRAME_SRC = import.meta.env.VITE_EWALLET_IFRAME_SRC;
const UploadDocumentEwallet = ({ userId }) => {
  console.log("userId", userId);

  const iframeRef = useRef(null);

  // Function to open the iframe and load the document selector

  const sendMessageToIframe = () => {
    const jwtToken = localStorage.getItem("authToken");
    if (iframeRef.current) {
      iframeRef.current.style.display = "block"; // Show iframe when button is clicked

      iframeRef.current.contentWindow.postMessage(
        { type: "JWT_TOKEN", payload: jwtToken }, // Message data
        VITE_EWALLET_IFRAME_SRC // Replace with the iframe app's domain
      );
    }
  };

  // Listen for messages from the iframe
  useEffect(() => {
    const handleMessage = async (event) => {
      if (event.origin === VITE_EWALLET_ORIGIN) {
        if (event.data.type === "selected-docs") {
          const payload = processDocuments(event.data.data, userId);
          console.log("updated data", payload);

          if (iframeRef.current) {
            iframeRef.current.style.display = "none";
          }
          const result = await uploadUserDocuments(payload);
          console.log("result", result);
        }
      } else {
        console.warn("Untrusted message origin:", event.origin);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div>
      <OutlineButton
        label="Upload Missing Document"
        onClick={sendMessageToIframe}
      />

      <iframe
        ref={iframeRef}
        src={VITE_EWALLET_IFRAME_SRC}
        title="Iframe App"
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          border: "none",
          zIndex: 999,
          display: "none",
        }}
      />
      {/* <iframe
        ref={iframeRef}
        src={VITE_EWALLET_IFRAME_SRC}
        title="Document Selector"
        style={{
          width: "100%", // Ensure iframe takes up full width of its container
          height: "100%", // Ensure iframe takes up full height of its container
          position: "fixed", // Absolutely position the iframe within the container
          top: 0,
          left: 0,
          border: "none",
          zIndex: 999, // Ensure iframe is on top
          display: "none", // Initially hidden, will be shown on button click
        }}
      /> */}
    </div>
  );
};

export default UploadDocumentEwallet;
