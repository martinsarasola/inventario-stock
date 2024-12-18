import { deleteProduct } from "../services/productService";
import useToasts from "./toasts/useToasts";

function useProductActions(
  setDeletedProduct,
  setRows,
  setLoading,
  rows,
  rowsPerPage,
  page,
  setPage
) {
  const { errorToast, successToast } = useToasts();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de eliminar el producto?"
    );
    if (!confirmDelete) return;
    try {
      const rowsNum = Math.floor(rows.length / rowsPerPage);
      const rowsPlus = rowsNum * rowsPerPage;
      if (rows.length == rowsPlus + 1) setPage((prevPage) => prevPage - 1);
      setRows((prevRows) => prevRows.filter((row) => row._id !== id));
      setLoading(true);
      await deleteProduct(id);
      setDeletedProduct(id);
      successToast("Producto eliminado.");
    } catch (error) {
      console.error("Error: ", error);
      errorToast("No se pudo eliminar el producto. Error: " + error);
    }
  };

  return { handleDelete };
}

export default useProductActions;
