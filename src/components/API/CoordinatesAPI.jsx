import axios from "axios";
import { useEffect, useState } from "react";
import Search from "../Search";

export default function CoordinatesAPI() {
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  console.log(data);
}
