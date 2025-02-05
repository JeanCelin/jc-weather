import axios from "axios";
import { useEffect, useState } from "react";
import Weather from "@/components/Weather";
import Search from "../Search";
import Header from "../Header";
export default function API() {
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [coordinates, setCoordinates] = useState(null);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  // Define Brasília como padrão
  const defaultLocation = { lat: -15.7797, lon: -47.9297 };

  const handleCoordinates = (data) => {
    if (!data.lat || !data.lon) return;

    setCoordinates({
      lat: data.lat,
      lon: data.lon,
    });
  };

  useEffect(() => {
    // Primeiro tenta pegar a localização do usuário
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        () => {
          // Se o usuário negar, usa Brasília como fallback
          setCoordinates(defaultLocation);
        }
      );
    } else {
      // Se o navegador não suportar geolocalização, usa Brasília
      setCoordinates(defaultLocation);
    }
  }, []);

  useEffect(() => {
    if (!coordinates) return;

    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
        );
        setData(response.data);
      } catch (err) {
        setErrorMessage("Erro ao buscar dados da previsão do tempo.");
        console.error("Erro na API:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [coordinates]); // Atualiza sempre que `coordinates` mudar

  return (
    <div>
      <div>
        <Search onCoordinatesFound={handleCoordinates} />
      </div>
      <div>
        <Weather
          data={data}
          errorMessage={errorMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
