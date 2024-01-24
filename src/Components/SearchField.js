import React from "react";
import { TextField, Box } from "@mui/material";

const SearchField = ({ search, setSearch }) => {
  return (
    <Box display="flex" justifyContent="center">
      <TextField
        id="outlined-search"
        label="Search field"
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
      />
    </Box>
  );
};

export default SearchField;