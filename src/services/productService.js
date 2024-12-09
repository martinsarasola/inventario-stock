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
