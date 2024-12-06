import { useState } from "react";
import { Box, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
function DataConfig(props) {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
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
            value={age}
            label="Categoría"
            onChange={handleChange}
          >
            <MenuItem value={"prueba1"}>Prueba1</MenuItem>
            <MenuItem value={"prueba2"}>Prueba2</MenuItem>
            <MenuItem value={"prueba3"}>Prueba3</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

export default DataConfig;
