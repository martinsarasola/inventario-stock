export const createProduct = async (productData) => {
  try {
    const response = await fetch(
      "https://stock-api-beta.vercel.app/api/productos/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "123456",
        },
        body: JSON.stringify(productData),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud: ", error.message);
    throw error;
  }
};

export const getProducts = async (selectedCategorie) => {
  try {
    let url = "https://stock-api-beta.vercel.app/api/productos/";
    if (selectedCategorie && selectedCategorie !== "Todos") {
      url = `https://stock-api-beta.vercel.app/api/productos/categoria/${selectedCategorie}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al obtener datos");
    }
    const fetchedData = await response.json();
    return { fetchedData, url };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await fetch(
      `https://stock-api-beta.vercel.app/api/productos/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) throw new Error("No se pudo eliminar el objeto");
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const updateProduct = async (id, updatedProductData) => {
  try {
    const response = await fetch(
      `https://stock-api-beta.vercel.app/api/productos/actualizar-producto/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProductData),
      }
    );

    const updatedProductResponse = await response.json();
    return updatedProductResponse;
  } catch (error) {
    console.error("Error: ", error.message);
    throw error;
  }
};
