import { useState } from "react";
import axios from "axios";

/**
 * Hook responsável por buscar sugestões de cidades
 * utilizando a API de Geocoding da OpenWeather.
 *
 * Retorna:
 * - suggestions: lista de cidades encontradas
 * - fetchCities: função para buscar cidades
 * - isLoading: estado de carregamento
 * - errorMessage: mensagem de erro (caso exista)
 */
export default function useCitySearch() {
  // Lista de sugestões retornadas pela API
  const [suggestions, setSuggestions] = useState([]);

  // Armazena mensagem de erro, caso a requisição falhe
  const [errorMessage, setErrorMessage] = useState(null);

  // Controla o estado de carregamento da requisição
  const [isLoading, setIsLoading] = useState(false);

  // Chave pública da API (definida nas variáveis de ambiente)
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  /**
   * Realiza a busca de cidades na API da OpenWeather
   * @param {string} query - Texto digitado pelo usuário
   */
  const fetchCities = async (query) => {
    if (!query) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
      );

      // Se houver resultados, armazena no estado
      // Caso contrário, mantém como array vazio
      setSuggestions(response.data?.length ? response.data : []);
    } catch (error) {
      setErrorMessage("Erro ao buscar sugestões.");
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    suggestions,
    fetchCities,
    isLoading,
    errorMessage,
  };
}