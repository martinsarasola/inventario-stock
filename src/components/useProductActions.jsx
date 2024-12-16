import { deleteProduct } from "../services/productService";

function useProductActions(
  setDeletedProduct,
  setRows,
  setLoading,
  rows,
  rowsPerPage,
  page,
  setPage
) {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de eliminar el producto?"
    );
    if (!confirmDelete) return;
    try {
      const rowsNum = Math.floor(rows.length / rowsPerPage);
      const rowsPlus = rowsNum * rowsPerPage;
      if (rowsPlus + 1) setPage((prevPage) => prevPage - 1);
      setRows((prevRows) => prevRows.filter((row) => row._id !== id));
      setLoading(true);
      await deleteProduct(id);
      setDeletedProduct(id);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return { handleDelete };
}

export default useProductActions;
