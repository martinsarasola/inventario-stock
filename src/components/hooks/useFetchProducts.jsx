import { useEffect } from "react";
import { getProducts } from "../../services/productService";

function useFetchProducts(
  selectedCategorie,
  setRows,
  setCategories,
  setLoading,
  setError,
  createdProduct,
  updatedProduct,
  deletedProduct
) {
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { fetchedData, url } = await getProducts(selectedCategorie);
        setRows(fetchedData);

        const fetchedCategories = new Set(
          fetchedData.map((item) => item.categoria)
        );

        const uniqueCategories = [...fetchedCategories];
        if (url === "https://stock-api-beta.vercel.app/api/productos/") {
          setCategories(uniqueCategories);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategorie, createdProduct, updatedProduct, deletedProduct]);
}

export default useFetchProducts;
