import axios from "axios";
import { useEffect, useState } from "react";

export default function CoordinatesAPI() {

  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const cityName = "Castelo";
  const limit = 100;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${apiKey}`
        );
        setData(response.data);
      } catch (err) {
        setErrorMessage("Erro ao buscar dados");
        console.error(
          "Erro na API:",
          err.response ? err.response.data : err.message
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
}
