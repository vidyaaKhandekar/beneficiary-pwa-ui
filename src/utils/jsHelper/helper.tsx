export function formatDateString(dateString) {
  // Parse the date string
  const date = new Date(dateString);

  // Define options for formatting the date
  const options = { day: "numeric", month: "long", year: "numeric" };

  // Format the date and return it
  return date.toLocaleDateString("en-GB", options);
}
export const extractMandatoryDocuments = (list) => {
  if (!Array.isArray(list)) {
    console.error("Expected an array but received:", list);
    return [];
  }

  return list
    .filter((item) => item.descriptor.code === "mandatory-doc")
    .map((item) => item.value);
};

export const extractEligibilityValues = (data) => {
  return data.map((item) => item.value);
};

export function generateUUID(): string {
  // Check if `crypto` is available in the browser or Node.js
  const cryptoObj: Crypto =
    typeof window !== "undefined" && window.crypto
      ? window.crypto
      : require("crypto");

  const array = new Uint8Array(16);
  cryptoObj.getRandomValues(array);

  // Setting the version and variant bits according to RFC 4122
  array[6] = (array[6] & 0x0f) | 0x40; // Version 4
  array[8] = (array[8] & 0x3f) | 0x80; // Variant 10xxxxxx

  // Convert array to UUID format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
  return [...array]
    .map(
      (b, i) =>
        (i === 4 || i === 6 || i === 8 || i === 10 ? "-" : "") +
        b.toString(16).padStart(2, "0")
    )
    .join("");
}
