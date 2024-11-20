import axios from "axios";

export const uploadUserDocuments = async (documents) => {
  const url = "https://dev-uba-bap.tekdinext.com/api/users/wallet/user_docs";
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.post(url, documents, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Return response data
    return response.data;
  } catch (error) {
    console.error(
      "Error uploading documents:",
      error.response || error.message
    );
    throw error; // Rethrow error to handle it in the calling code
  }
};
