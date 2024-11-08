import React, { useState } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    console.log(newQuery);
  };

  const handleSearchClick = () => {
    onSearch(query);
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

      <InputRightElement h={55} margin={4} mr={6} mt={2}>
        <IconButton
          icon={<SearchIcon />}
          aria-label="Search"
          onClick={handleSearchClick}
          bg="transparent"
          _hover={{ bg: "transparent" }}
          _focus={{ outline: "none" }}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBar;
