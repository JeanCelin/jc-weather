import axios from "axios";
import { useEffect, useState } from "react";
import Weather from "@/components/Weather";
import Search from "../Search";

export default function API() {
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [coordinates, setCoordinates] = useState(null);
  const [location, setLocation] = useState({
    city: "Brasília",
    state: "DF",
    country: "BR",
  });

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const defaultLocation = { lat: -15.7797, lon: -47.9297 };

  // Atualiza coordenadas quando o usuário seleciona um local
  const handleCoordinates = (data) => {
    if (!data.lat || !data.lon) return;
    setCoordinates({
      lat: data.lat,
      lon: data.lon,
    });
    console.log(data)
  };

  // Obtém a localização do usuário ou usa Brasília como fallback
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        () => setCoordinates(defaultLocation) // Se negado, usa Brasília
      );
    } else {
      setCoordinates(defaultLocation);
    }
  }, []);

  // Obtém o nome da cidade com base nas coordenadas
  useEffect(() => {
    if (!coordinates) return;

    const fetchCityName = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${coordinates.lat}&lon=${coordinates.lon}&limit=1&appid=${apiKey}`
        );

        if (response.data.length > 0) {
          const { name, state, country } = response.data[0];
          setLocation({ city: name, state: state || "N/A", country });
        }
      } catch (err) {
        console.error("Erro ao buscar nome da cidade:", err.message);
      }
    };

    fetchCityName();
  }, [coordinates]);

  // Obtém dados meteorológicos sempre que `coordinates` mudar
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
  }, [coordinates]);

  return (
    <div>
      <Search onCoordinatesFound={handleCoordinates} />
      <h1>{`${location.city} (${location.state}), ${location.country}`}</h1>
      <Weather data={data} errorMessage={errorMessage} isLoading={isLoading} />
    </div>
  );
}
