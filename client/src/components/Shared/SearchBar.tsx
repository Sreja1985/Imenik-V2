import React, { useState, ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import "../../styles/SearchBar.css";

interface SearchBarProps {
  placeholder: string;
  type: string;
  data?: any[]; // Adjust the type here according to the shape of your data
  onFilter: (searchTerm: string) => void; // New prop to pass filtered data to parent
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  type,
  onFilter,
}) => {
  const [search, setSearch] = useState<string>("");

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const enteredInput = event.target.value;
    setSearch(enteredInput);
    onFilter(enteredInput); // Call the onFilter function passed from the parent component
  };

  const clearInput = () => {
    setSearch("");
    onFilter(""); // Clear the filter when the input is cleared
  };

  return (
    <div className="row justify-content-center">
      <div className="input-container">
        {search === "" && <FaSearch className="input-icon" />}
        <input
          type={type}
          placeholder={placeholder}
          value={search}
          onChange={handleFilter}
          className="form-control shearchbar"
        />
        {search !== "" && (
          <IoMdCloseCircle className="input-icon-clear" onClick={clearInput} />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
