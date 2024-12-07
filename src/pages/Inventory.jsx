import { Box, Typography } from "@mui/material";
import DataTable from "../components/DataTable";
import DataConfig from "../components/DataConfig";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useState } from "react";

function Inventory() {
  const [categories, setCategories] = useState([]);
  const [selectedCategorie, setSelectedCategorie] = useState("Todos");
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { sx: "flex-start", sm: "center" },
          marginLeft: 1,
          marginRight: 1,
          marginBottom: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            alignSelf: { sx: "flex-start", sm: "flex-end" },
          }}
          color="primary.main"
        >
          Productos
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: 170,
            mt: 1,
            marginRight: { xs: "0px", sm: 1 },
          }}
        >
          <DataConfig
            sx={{ width: "100px" }}
            categories={categories}
            selectedCategorie={selectedCategorie}
            setSelectedCategorie={setSelectedCategorie}
          ></DataConfig>
          <FilterAltIcon
            fontSize="large"
            sx={{ alignSelf: "flex-end" }}
            color="secondary"
          />
        </Box>
      </Box>
      <DataTable
        setCategories={setCategories}
        selectedCategorie={selectedCategorie}
      ></DataTable>
    </Box>
  );
}

export default Inventory;
