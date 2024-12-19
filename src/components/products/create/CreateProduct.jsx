import { useSelector, useDispatch } from "react-redux";
import {
  resetForm,
  updateProductForm,
} from "../../../features/productForm/productFormSlice";
import { useState } from "react";
import { createProduct } from "../../../services/productService";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormProduct from "../../common/FormProduct";
import useToasts from "../../ui/toasts/useToasts";

function CreateProduct({ setCreatedProduct }) {
  const formState = useSelector((state) => state.productForm);
  const dispatch = useDispatch();
  const [localState, setLocalState] = useState(formState);

  const { warningToast, successToast, errorToast } = useToasts();

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
        warningToast("Todos los campos son obligatorios.");
        return;
      }
      const createdProduct = await createProduct(productData);
      dispatch(updateProductForm(localState));
      dispatch(resetForm());
      setCreatedProduct(createdProduct);
      successToast("Producto creado.");
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
      errorToast("Hubo un error al crear el producto: " + error.message);
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
