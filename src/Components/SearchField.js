import React from "react";
import { TextField, Box } from "@mui/material";

const SearchField = ({ search, setSearch }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <TextField
        id="outlined-search"
        label="Search field"
        type="search"
        value={search}
        onChange={({ target: { value } }) => setSearch(value)}
        fullWidth
      />
    </Box>
  );
};

export default SearchField;