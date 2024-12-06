import { useState } from "react";
import { Box, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
function DataConfig({ categories, selectedCategorie, setSelectedCategorie }) {
  const handleChange = (event) => {
    setSelectedCategorie(event.target.value);
  };

  return (
    <Box>
      <Typography>Filtar por categoria:</Typography>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCategorie}
            label="Categoría"
            onChange={handleChange}
          >
            <MenuItem value="Todos">Todos</MenuItem>
            {categories.map((categorie, index) => (
              <MenuItem key={index} value={`${categorie}`}>
                {categorie.charAt(0).toUpperCase() +
                  categorie.slice(1).toLowerCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

export default DataConfig;
