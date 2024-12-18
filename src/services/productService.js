const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const createProduct = async (productData) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: API_KEY,
      },
      body: JSON.stringify(productData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud: ", error.message);
    throw error;
  }
};

export const getProducts = async (selectedCategorie) => {
  try {
    let url = `${API_URL}/`;
    if (selectedCategorie && selectedCategorie !== "Todos") {
      url = `${API_URL}/categoria/${selectedCategorie}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al obtener datos");
    }
    const fetchedData = await response.json();
    console.log(fetchedData);
    return { fetchedData, url };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("No se pudo eliminar el objeto");
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const updateProduct = async (id, updatedProductData) => {
  try {
    const response = await fetch(`${API_URL}/actualizar-producto/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProductData),
    });

    const updatedProductResponse = await response.json();
    return updatedProductResponse;
  } catch (error) {
    console.error("Error: ", error.message);
    throw error;
  }
};
