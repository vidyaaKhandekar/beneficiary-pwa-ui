import React, { useState } from "react";
import { Input, InputGroup, InputRightElement, Icon } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

// Define Props interface
interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <InputGroup>
      <Input
        type="text"
        placeholder="Search By Name"
        value={query}
        onChange={handleChange}
        borderRadius={28}
        h={50}
        bg="#E9E7EF"
        margin={4}
        mt={3}
      />

      {/* Right Icon (Search Icon) */}
      <InputRightElement h={55} margin={4} mr={6} mt={2}>
        <Icon as={SearchIcon} color="#45464F" boxSize={4} />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBar;
