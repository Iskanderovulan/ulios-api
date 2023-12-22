import React, { useState, memo } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";

const SearchComponent = ({ getProductsAsync, setSearchParams,searchQuery}) => {
  const [searchTerm, setSearchTerm] = useState(searchQuery || "");
  const dispatch = useDispatch();

  const handleSearch = () => {
    setSearchParams({ page: 1, search: searchTerm });
    dispatch(getProductsAsync(`?search=${searchTerm}&page=1`));
  };

  return (
    <div style={{ display: "flex" }}>
      <TextField
        label="Search Products"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginRight: "10px", width: "300px" }}
      />
      <Button
        style={{ width: "100px", fontSize: "1.2rem" }}
        variant="contained"
        color="primary"
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
};

export default memo(SearchComponent);
