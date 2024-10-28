import React, { useState } from "react";
import { Box, FormControl, Input } from "@chakra-ui/react";

export default function FloatingInput({ value, onChange, label }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <FormControl height="80px" position="relative" mt={2}>
      <Box
        as="label"
        htmlFor="name"
        position="absolute"
        top={isFocused ? "-10px" : "40%"}
        left="12px"
        bg="white"
        px={1}
        transform={isFocused ? "scale(0.85)" : "translateY(-50%)"}
        transition="all 0.2s ease-out"
        color={isFocused ? "blue.500" : "gray.500"}
        fontSize={isFocused ? "0.85rem" : "1rem"}
        zIndex={100}
        pointerEvents="none"
      >
        {label}
      </Box>
      <Input
        placeholder={isFocused ? "" : label}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => setIsFocused(e.target.value !== "")}
        size="md"
        height="60px"
        pl="12px"
        borderColor="gray.300"
        borderWidth="2px"
        _focus={{
          borderColor: "blue.500",
        }}
        sx={{
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
        }}
        {...{ value, onChange }}
      />
    </FormControl>
  );
}
