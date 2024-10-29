import React, { useState } from "react";
import { Box, FormControl, Input } from "@chakra-ui/react";

export default function FloatingInput({ value, onChange, label, inputProps }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => setIsFocused(e.target.value !== "");

  const labelStyle = {
    position: "absolute",
    top: isFocused ? "-10px" : "40%",
    left: "12px",
    bg: "white",
    px: 1,
    transform: isFocused ? "scale(0.85)" : "translateY(-50%)",
    transition: "all 0.2s ease-out",
    color: isFocused ? "blue.500" : "gray.500",
    fontSize: isFocused ? "0.85rem" : "1rem",
    zIndex: 100,
    pointerEvents: "none",
  };

  const inputStyle = {
    placeholder: isFocused ? "" : label,
    size: "md",
    height: "60px",
    pl: "12px",
    borderColor: "gray.300",
    borderWidth: "2px",
    _focus: {
      borderColor: "blue.500",
    },
    ...inputProps,
  };

  return (
    <FormControl height="80px" position="relative" mt={2}>
      <Box as="label" htmlFor="name" {...labelStyle}>
        {label}
      </Box>
      <Input
        {...inputStyle}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        onChange={onChange}
      />
    </FormControl>
  );
}
