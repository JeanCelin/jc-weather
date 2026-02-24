import axios from "axios";
import { useEffect, useState, useTransition } from "react";
import { useGetWeather } from "./hooks/useGetWeather";

import Weather from "@/components/Weather";
import Search from "./Search";

export default function WeatherDataFetcher() {
  const [data, setData] = useState(null); // Stores weather data (Armazena os dados meteorológicos)
  const [errorMessage, setErrorMessage] = useState(null); // Stores error message (Armazena a mensagem de erro)
  const [isLoading, setIsLoading] = useState(true); // Stores loading state (Armazena o estado de carregamento)

  const [waiting, setWaiting] = useState(true); // Stores the waiting state for geolocation (Armazena o estado de espera para a geolocalização)
  const [location, setLocation] = useState({}); // Stores location data (Armazena os dados de localização)
  const { getWeather } = useGetWeather(); // Custom hook to fetch weather data (Hook personalizado para buscar dados meteorológicos)

  const [isPending, startTransition] = useTransition(); // Transition state for UI updates (Estado de transição para atualizações de UI)
  // Default location (Localização padrão: Brasília)

  // Updates coordinates when the user selects a location (Atualiza as coordenadas quando o usuário seleciona um local)

  useEffect(() => {
    async function fetchDefaultWeather() {
      try {
        const response = await getWeather(-15.793889, -47.882778);
        setData(response);
        setLocation({
          name: "Brasília",
          state: "DF",
          country: "BR",
        });
      } catch (error) {
        setErrorMessage("Failed to fetch default weather.");
      }
    }

    fetchDefaultWeather();
  }, []);

  const handleCityInfo = async (city) => {
    console.log(city);

    const { name, state, country, lat, lon } = city[0];

    setLocation({ name: name, state: state, country: country });

    if (!lat || !lon) return;

    startTransition(async () => {
      const response = await getWeather(lat, lon);
      setData(response);
      console.log(response);
    });
  };
  const handleGetUserCoordinates = async (latitude, longitude) => {
    try {
      const response = await getWeather(latitude, longitude);
      console.log(response);
      setData(response);
      setLocation({
        name: response.city.name,
        state: response.city.state,
        country: response.city.country,
      });
    } catch (error) {
      setErrorMessage("Failed to fetch weather for your location.");
    }
  };

  return (
    <div>
      <Search
        handleCityInfo={handleCityInfo}
        handleGetUserCoordinates={handleGetUserCoordinates}
      />
      {/* Search for a location (Busca por uma localização) */}
      {isPending ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        data && (
          <>
            <p
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
              {location.name} {location.state ? `(${location.state})` : ""}
              {`, ${location.country}`}
            </p>
            <Weather
              data={data}
              errorMessage={errorMessage}
              isLoading={isLoading}
              waiting={waiting}
            />
          </>
        )
      )}
      {!data && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            marginTop: "100px",
          }}>
          <p style={{ textAlign: "center" }}>Search for a location</p>
        </div>
      )}
      {/* Displays weather data (Exibe os dados meteorológicos) */}
    </div>
  );
}
