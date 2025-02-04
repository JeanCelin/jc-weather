import axios from "axios";
import { useState } from "react";

export default function Search() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSearch = async (e) => {
    if (e.key !== "Enter") return; // Apenas busca quando pressionar Enter

    if (!location.trim()) return; // Evita busca vazia

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${apiKey}`
      );

      if (response.data.length === 0) {
        setErrorMessage("Nenhum resultado encontrado.");
        setData(null);
        return;
      }

      // Pegando o primeiro resultado (ou poderia exibir uma lista de sugestões)
      const result = response.data[0];

      const formattedData = {
        name: result.name,
        state: result.state || "N/A",
        country: result.country,
        lat: result.lat,
        lon: result.lon,
      };

      setData(formattedData);
      console.log("Localização encontrada:", formattedData);
    } catch (err) {
      setErrorMessage("Erro ao buscar dados.");
      console.error(
        "Erro na API:",
        err.response ? err.response.data : err.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <input
        type="text"
        placeholder="Digite a cidade e pressione Enter..."
        value={location}
        onChange={handleChange}
        onKeyDown={handleSearch}
      />

      {isLoading && <p>Carregando...</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {data && (
        <div>
          <p>
            <strong>Cidade:</strong> {data.name}
          </p>
          <p>
            <strong>Estado:</strong> {data.state}
          </p>
          <p>
            <strong>País:</strong> {data.country}
          </p>
          <p>
            <strong>Latitude:</strong> {data.lat}
          </p>
          <p>
            <strong>Longitude:</strong> {data.lon}
          </p>
        </div>
      )}
    </section>
  );
}
