import { useSelector, useDispatch } from "react-redux";
import {
  updateField,
  resetForm,
  updateProductForm,
} from "../features/productForm/productFormSlice";
import { useCallback, useState } from "react";
import { createProduct } from "../services/productService";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormProduct from "./FormProduct";

function CreateProduct({ setCreatedProduct }) {
  const formState = useSelector((state) => state.productForm);
  const dispatch = useDispatch();
  const [localState, setLocalState] = useState(formState);

  const handleSubmit = async () => {
    try {
      const productData = {
        nombre: localState.name.trim(),
        precio: localState.price,
        cantidad: localState.quantity,
        categoria:
          localState.category.trim().charAt(0).toLowerCase() +
          localState.category.slice(1).toLowerCase(),
        descripcion: localState.description.trim(),
      };

      if (
        !productData.nombre ||
        !productData.precio ||
        !productData.cantidad ||
        !productData.categoria ||
        !productData.descripcion
      ) {
        alert("Todos los campos son obligatorios.");
        return;
      }
      const createdProduct = await createProduct(productData);
      dispatch(updateProductForm(localState));
      console.log("Producto creado: ", createdProduct);
      dispatch(resetForm());
      setCreatedProduct(createdProduct);
      alert("Producto creado.");
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
      alert("Hubo un error al crear el producto: " + error.message);
    }
  };

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{ color: "primary.main", fontWeight: "bold" }}
      >
        Crear nuevo producto
      </Typography>
      <Box sx={{ mt: 2 }}>
        <FormProduct
          localState={localState}
          setLocalState={setLocalState}
          handleSubmit={handleSubmit}
          mode="create"
        />
      </Box>
    </Box>
  );
}

export default CreateProduct;
