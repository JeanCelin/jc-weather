import { useState } from "react";
import axios from "axios";

export default function useLocationApi() {
  const [suggestions, setSuggestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  // Função para buscar cidades na API
  const fetchCities = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
      );

      setSuggestions(response.data.length > 0 ? response.data : []);
    } catch (err) {
      setErrorMessage("Erro ao buscar sugestões.");
      console.error("Erro na API:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { suggestions, fetchCities, isLoading, errorMessage };
}
