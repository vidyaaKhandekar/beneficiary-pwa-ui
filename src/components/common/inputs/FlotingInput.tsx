import React, { useState } from "react";
import { Box, FormControl, Input } from "@chakra-ui/react";

export default function FloatingInput({ value, onChange, label }) {
  const [isFocused, setIsFocused] = useState(false);

  // Common label styles
  const labelStyles = {
    position: "absolute",
    left: "12px",
    background: "white",
    px: 1,
    zIndex: 100,
    transition: "all 0.2s ease-out",
    pointerEvents: "none",
  };

  // Dynamic label styles based on focus
  const focusedLabelStyles = isFocused
    ? {
        top: "-10px",
        color: "blue.500",
        fontSize: "0.85rem",
        transform: "scale(0.85)",
      }
    : {
        top: "40%",
        color: "gray.500",
        fontSize: "1rem",
        transform: "translateY(-50%)",
      };

  // Input styles with dynamic border color on focus
  const inputStyles = {
    placeholder: isFocused ? "" : label,
    size: "md",
    height: "60px",
    pl: "12px",
    borderColor: "gray.300",
    borderWidth: "2px",
    _focus: {
      borderColor: "blue.500",
    },
    sx: {
      "&::before": {
        content: '""',
        position: "absolute",
        top: isFocused ? "-10px" : "50%",
        left: "10px",
        width: "30px",
        height: "2px",
        background: "white",
        zIndex: 2,
      },
    },
  };

  return (
    <FormControl height="80px" position="relative" mt={2}>
      <Box as="label" htmlFor="name" {...labelStyles} {...focusedLabelStyles}>
        {label}
      </Box>
      <Input
        {...inputStyles}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => setIsFocused(e.target.value !== "")}
        value={value}
        onChange={onChange}
      />
    </FormControl>
  );
}
