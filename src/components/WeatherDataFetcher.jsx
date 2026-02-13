import axios from "axios";
import { useEffect, useState } from "react";

import Weather from "@/components/Weather";
import Search from "./Search";

export default function WeatherDataFetcher() {
  const [data, setData] = useState(null); // Stores weather data (Armazena os dados meteorológicos)
  const [errorMessage, setErrorMessage] = useState(null); // Stores error message (Armazena a mensagem de erro)
  const [isLoading, setIsLoading] = useState(true); // Stores loading state (Armazena o estado de carregamento)

  const [waiting, setWaiting] = useState(true); // Stores the waiting state for geolocation (Armazena o estado de espera para a geolocalização)
  const [location, setLocation] = useState({}); // Stores location data (Armazena os dados de localização)

  // Default location (Localização padrão: Brasília)

  // Updates coordinates when the user selects a location (Atualiza as coordenadas quando o usuário seleciona um local)
  const handleCityInfo = async (city) => {
    console.log(city);

    const { name, state, country, lat, lon } = city[0];

    setLocation({ name: name, state: state, country: country });

    if (!lat || !lon) return;
    const response = await axios.get(`/api/weather?lat=${lat}&lon=${lon}`);

    setData(response.data);
    console.log(response.data);
  };

  function getUserLocation() {
    if (!("geolocation" in navigator)) {
      setCoordinates(defaultLocation);
      return;
    }

    setWaiting(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setWaiting(false);
      },
      () => {
        setCoordinates(defaultLocation);
        setWaiting(false);
      },
    );
  }

  return (
    <div>
      <Search handleCityInfo={handleCityInfo} />
      {/* Search for a location (Busca por uma localização) */}
      {data && (
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
          <button
            onClick={getUserLocation}
            style={{
              padding: "6px",
              backgroundColor: "var(--color2)",
              color: "white",
              border: "1px solid",
              borderRadius: "5px",
              cursor: "pointer",
            }}>
            Use my location
          </button>
        </div>
      )}
      {/* Displays weather data (Exibe os dados meteorológicos) */}
    </div>
  );
}
