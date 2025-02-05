import axios from "axios";
import { useState } from "react";
import styles from './Search.module.css'

export default function Search({ onCoordinatesFound }) {
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  // Atualiza o estado conforme o usuário digita
  const handleChange = async (e) => {
    const value = e.target.value;
    setLocation(value);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${apiKey}`
      );

      if (response.data.length === 0) {
        setSuggestions([]);
        return;
      }

      setSuggestions(response.data);
    } catch (err) {
      console.error("Erro ao buscar sugestões:", err.message);
    }
  };

  // Seleciona uma cidade da lista de sugestões
  const handleSelect = (city) => {
    setLocation(city.name);
    setSuggestions([]);

    // Envia as coordenadas para o componente pai
    console.log({
      name: city.name,
      state: city.state || "N/A",
      country: city.country,
      lat: city.lat,
      lon: city.lon,
    });
  };

  return (
    <section className={styles.search__container}>
      <input
        type="text"
        placeholder="Digite a cidade..."
        value={location}
        onChange={handleChange}
        className={styles.search__bar}
      />

      {/* Exibir sugestões dinâmicas */}
      {suggestions.length > 0 && (
        <ul className={styles.search__list}>
          {suggestions.map((city, index) => (
            <li
              key={index}
              onClick={() => handleSelect(city)}
              className={styles.search__listItem}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
