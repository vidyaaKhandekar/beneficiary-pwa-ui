import React, { useState, ChangeEvent } from "react";
import { FormControl, Select, FormLabel } from "@chakra-ui/react";

interface Option {
  value: string;
  label: string;
}

interface FloatingSelectProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  name: string;
  options: Option[];
}

const FloatingSelect: React.FC<FloatingSelectProps> = ({
  value,
  onChange,
  label,
  name,
  options,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  console.log("  options,", options);

  return (
    <FormControl
      position="relative"
      mt={2}
      height="80px"
      variant="outlined"
      width="100%"
      border={"#767680"}
    >
      <FormLabel
        htmlFor={name}
        position="absolute"
        top={isFocused || value ? "-10px" : "40%"}
        left="17px"
        bg="white"
        px={1}
        transform={isFocused || value ? "scale(0.85)" : "translateY(-50%)"}
        transition="all 0.2s ease-out"
        color={isFocused ? "gray.500" : "gray.500"}
        fontSize={isFocused || value ? "17px" : "16px"}
        zIndex={100}
        pointerEvents="none"
      >
        {label}
      </FormLabel>
      <Select
        id={name}
        name={name}
        value={value}
        onChange={(e) => {
          setIsFocused(true);
          onChange(e);
        }}
        onBlur={() => setIsFocused(value !== "")}
        onFocus={() => setIsFocused(true)}
        placeholder="All"
        border="2px"
        style={{ borderColor: "var(--input-color)" }}
        _focus={{
          borderColor: "gray.500",
        }}
        height="60px"
        mt={4}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default FloatingSelect;
