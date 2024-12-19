import { Box, IconButton, Typography } from "@mui/material";
import FormProduct from "../../common/FormProduct";
import CloseIcon from "@mui/icons-material/Close";
import useToasts from "../../ui/toasts/useToasts";

function UpdateProduct({
  setModalOpen,
  updateProduct,
  handleCloseModal,
  setLoading,
  setUpdatedProduct,
  updateLocalState,
  setUpdateLocalState,
  selectedProduct,
}) {
  const { errorToast, successToast } = useToasts();
  const handleUpdateSubmit = async (id, updateLocalState) => {
    setModalOpen(false);
    try {
      const updatedProductData = {
        nombre: updateLocalState.name.trim(),
        precio: updateLocalState.price,
        cantidad: updateLocalState.quantity,
        categoria:
          updateLocalState.category.trim().charAt(0).toLowerCase() +
          updateLocalState.category.slice(1).toLowerCase(),
        descripcion: updateLocalState.description.trim(),
        fechaIngreso: updateLocalState.entryDate,
      };

      const updatedProductResponse = await updateProduct(
        id,
        updatedProductData
      );
      handleCloseModal();
      setLoading(true);
      setUpdatedProduct(updatedProductResponse);
      successToast("Producto actualizado.");
    } catch (error) {
      console.error("Error: ", error.message);
      errorToast("Hubo un error al actualizar el producto: " + error);
      throw error;
    }
  };
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        maxHeight: { xs: "84vh", lg: "85vh" },
        overflowY: { xs: "auto", md: "hidden" },
        width: { xs: "70vw", sm: "78vw" },
        maxWidth: { xs: "500px" },
      }}
    >
      <IconButton
        onClick={handleCloseModal}
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          color: "secondary.main",
        }}
      >
        <CloseIcon />
      </IconButton>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{
          textAlign: "center",
          mb: { sx: 3, lg: 1 },
          color: "primary.main",
        }}
      >
        Actualice el producto:
      </Typography>
      <FormProduct
        handleSubmit={handleUpdateSubmit}
        mode="editing"
        localState={updateLocalState}
        setLocalState={setUpdateLocalState}
        id={selectedProduct._id}
      />
    </Box>
  );
}

export default UpdateProduct;
