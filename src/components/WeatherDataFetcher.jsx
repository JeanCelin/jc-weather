import axios from "axios";
import { useEffect, useState } from "react";


import Weather from "@/components/Weather";
import Search from "./Search"; 

export default function WeatherDataFetcher() {
  const [data, setData] = useState(null); // Stores weather data (Armazena os dados meteorológicos)
  const [errorMessage, setErrorMessage] = useState(null); // Stores error message (Armazena a mensagem de erro)
  const [isLoading, setIsLoading] = useState(true); // Stores loading state (Armazena o estado de carregamento)
  const [coordinates, setCoordinates] = useState(null); // Stores coordinates (Armazena as coordenadas)
  const [waiting, setWaiting] = useState(true); // Stores the waiting state for geolocation (Armazena o estado de espera para a geolocalização)
  const [location, setLocation] = useState({
    city: "Brasília",
    state: "DF",
    country: "BR",
  }); // Stores location data (Armazena os dados de localização)

  const apiKey = process.env.NEXT_PUBLIC_API_KEY; // API key (Chave da API)
  const defaultLocation = { lat: -15.7797, lon: -47.9297 }; // Default location (Localização padrão: Brasília)

  // Updates coordinates when the user selects a location (Atualiza as coordenadas quando o usuário seleciona um local)
  const handleCoordinates = (data) => {
    if (!data.lat || !data.lon) return;
    setCoordinates({
      lat: data.lat,
      lon: data.lon,
    });
  };

  // Gets user's location or uses Brasília as fallback (Obtém a localização do usuário ou usa Brasília como fallback)
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        () => setCoordinates(defaultLocation) // If denied, use Brasília (Se negado, usa Brasília)
      );
    } else {
      setCoordinates(defaultLocation); // Use default location (Usa localização padrão)
    }
  }, []);

  // Gets the city name based on coordinates (Obtém o nome da cidade com base nas coordenadas)
  useEffect(() => {
    if (!coordinates) return;

    const fetchCityName = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${coordinates.lat}&lon=${coordinates.lon}&limit=1&appid=${apiKey}`
        );

        if (response.data.length > 0) {
          const { name, state, country } = response.data[0];
          setLocation({ city: name, state: state, country });
        }
      } catch (err) {
        console.error("Error trying to find the city name:", err.message);
      }
    };

    fetchCityName();
  }, [coordinates]);

  // Fetch weather data whenever `coordinates` change (Obtém os dados meteorológicos sempre que `coordinates` mudar)
  useEffect(() => {
    if (!coordinates) return;

    const fetchData = async () => {
      setWaiting(false); // Stop waiting (Para de esperar)
      setIsLoading(true); // Start loading (Inicia o carregamento)
      setErrorMessage(null); // Clear previous error message (Limpa a mensagem de erro anterior)

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
        );
        setData(response.data); // Store the weather data (Armazena os dados meteorológicos)
      } catch (err) {
        setErrorMessage("Erro ao buscar dados da previsão do tempo."); // Set error message (Define a mensagem de erro)
        console.error("Erro na API:", err.message);
      } finally {
        setIsLoading(false); // Stop loading (Para o carregamento)
      }
    };

    fetchData();
  }, [coordinates]);

  return (
    <div>
      <Search onCoordinatesFound={handleCoordinates} /> {/* Search for a location (Busca por uma localização) */}
      <h1
        style={{
          fontSize: "1.1em",
          margin: " 15px auto 0",
          padding: "5px",
          textAlign: "center",
          backgroundColor: "var(--color2)",
          color: "var(--color1)",
          maxWidth: "660px",
          boxShadow: "#0000006b 1px 1px 2px 0px",
        }}>
        {location.city} {location.state ? `(${location.state})` : ""},{" "}
        {location.country}
      </h1>

      <Weather
        data={data}
        errorMessage={errorMessage}
        isLoading={isLoading}
        waiting={waiting}
      /> {/* Displays weather data (Exibe os dados meteorológicos) */}
    </div>
  );
}
