import React, { useState } from "react";
import { Box, FormControl, Input, BoxProps } from "@chakra-ui/react";

interface FloatingInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Accepts the event parameter
  label: string;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  value,
  onChange,
  label,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Label styles with BoxProps type
  const labelStyles: BoxProps = {
    position: "absolute",
    left: "12px",
    background: "white",
    px: 1,
    zIndex: 100,
    transition: "all 0.2s ease-out",
    pointerEvents: "none",
    top: isFocused ? "-10px" : "40%", // Dynamic top value based on focus
    color: isFocused ? "blue.500" : "gray.500",
    fontSize: isFocused ? "0.85rem" : "1rem",
    transform: isFocused ? "scale(0.85)" : "translateY(-50%)",
  };

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
      <Box as="label" htmlFor="name" {...labelStyles}>
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
};

export default FloatingInput;
