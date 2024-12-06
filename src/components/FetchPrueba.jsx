import { useState, useEffect } from "react";

function FetchPrueba(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://stock-api-beta.vercel.app/api/productos/"
        );
        if (!response.ok) {
          throw new Error("Error al obtener datos");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {data.map((product) => (
        <p key={product._id}>{product.nombre}</p>
      ))}
    </div>
  );
}

export default FetchPrueba;
