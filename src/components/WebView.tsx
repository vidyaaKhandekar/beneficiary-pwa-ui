import { Box } from "@chakra-ui/react";
// import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Loader from "./common/Loader";
import Layout from "./common/layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { transformData } from "../utils/jsHelper/helper";
import {
  confirmApplication,
  createApplication,
} from "../services/benefit/benefits";
import SubmitDialog from "./SubmitDialog";
// import { getUser } from "../services/auth/auth";
interface FormData {
  user_id?: string;
  name?: string;
  current_class?: string;
  previous_year_marks?: string;
  phone_number?: string;
  username?: string;
  email?: string;
}
interface BenefitItem {
  descriptor?: {
    name?: string;
    long_desc?: string;
  };
  price?: {
    value?: number;
    currency?: string;
  };
  document?: string[];
  tags?: Array<{
    descriptor?: { code?: string; short_desc: string };
    list?: Array<{ value?: string }>;
  }>;
}
interface WebViewFormSubmitWithRedirectProps {
  url?: string;
  formData?: FormData;
  context?: FinancialSupportRequest;
  item?: BenefitItem;
  submitConfirm?: (content: string) => void;
}

// interface PrefillData {
//   firstName: string;
//   middleName: string;
//   lastName: string;
//   gender: string;
//   class: string; // You can specify an enum or union type if you have predefined classes
//   annualIncome: string; // You can specify types for certificates, if needed
//   caste: string; // Same as annualIncome
//   disabled: string; // Assuming it is "yes" or "no"
//   state: string; // Assuming this refers to domicile certificate data
//   student: string; // You can define a union type if the values are specific
//   identityProof: string | null; // Can be nullable if not provided
//   benefit_id: string;
// }
interface FinancialSupportRequest {
  domain: string;
  action: string;
  version: string;
  bpp_id: string;
  bpp_uri: string;
  country: string;
  city: string;
  bap_id: string;
  bap_uri: string;
  transaction_id: string;
  message_id: string;
  ttl: string;
  timestamp: string;
}
// interface AuthUser {
//   user_id?: string;
//   name?: string;
//   class?: string;
//   previousYearMarks?: string;
//   phone_number?: string;
//   username: string;
//   email: string;
// }

const WebViewFormSubmitWithRedirect: React.FC<
  WebViewFormSubmitWithRedirectProps
> = ({ url, formData, submitConfirm }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // const [confirmationConsent, setConfirmationConsent] =
  //   useState<unknown>(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "FORM_SUBMIT") {
        const receivedData = event.data.data;
        if (receivedData) {
          submitConfirm(receivedData);
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    if (url) {
      // Event listener for iframe load
      const iframeLoadHandler = async () => {
        await sendDataToIframe();
      };

      const iframeElement = iframeRef.current;
      iframeElement?.addEventListener("load", iframeLoadHandler);
      return () => {
        iframeElement?.removeEventListener("load", iframeLoadHandler);
      };
    }
  }, [url, formData]);

  const sendDataToIframe = async () => {
    const prefillData = transformData(formData);
    console.log("prefillData", prefillData);
    iframeRef.current.contentWindow.postMessage(prefillData, "*");
  };

  return (
    <Layout
      _heading={{
        heading: "Complete Application",
      }}
      getBodyHeight={(height) =>
        (iframeRef.current!.style.height = `${height}px`)
      }
    >
      <Box className="card-scroll invisible_scroll">
        <iframe
          ref={iframeRef}
          // src={url}
          src={
            "http://localhost:5174/uba-ui/benefit/PB-BTR-2024-11-27-000626/apply"
          }
          style={{ width: "100%" }}
          title="Form UI"
        ></iframe>
      </Box>

      {/* <SubmitDialog
        dialogVisible={
          confirmationConsent as { name?: string; orderId?: string }
        }
        closeSubmit={setConfirmationConsent}
      /> */}
    </Layout>
  );
};

export default WebViewFormSubmitWithRedirect;
