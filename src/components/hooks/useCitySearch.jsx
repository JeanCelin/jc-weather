import { useState } from "react"; 
import axios from "axios";

export default function useCitySearch() {
  const [suggestions, setSuggestions] = useState([]); 
  const [errorMessage, setErrorMessage] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY; // API key for openweathermap. (Chave API para openweathermap)

  // Function to fetch cities from the API (Função para buscar cidades na API)
  const fetchCities = async (query) => {
    setIsLoading(true); // Set loading state to true (Define o estado de carregamento como verdadeiro).

    try {
      const response = await axios.get( // Make the API request (Fazer a solicitação à API)
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
      );

      setSuggestions(response.data.length > 0 ? response.data : []); // Set suggestions based on API response (Definir sugestões com base na resposta da API).
    } catch (err) {
      setErrorMessage("Erro ao buscar sugestões."); // Set error message in case of failure (Definir mensagem de erro em caso de falha).
  
    } finally {
      setIsLoading(false); // Reset loading state to false (Resetar o estado de carregamento para falso).
    }
  };

  return { suggestions, fetchCities, isLoading, errorMessage }; // Return the state and function (Retornar o estado e a função).
}
