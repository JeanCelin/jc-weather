import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./City.module.css";

export default function City({ cityWeatherData }) {
  const [sunriseTime, setSunriseTime] = useState(null); // Stores the sunrise time (Armazena o horário do nascer do sol).
  const [sunsetTime, setSunsetTime] = useState(null); // Stores the sunset time (Armazena o horário do pôr do sol).

  // Function to format the timestamp into HH:MM UTC (Função para formatar o timestamp em HH:MM UTC)
  const formatSunTime = (value, name) => {
    const date = new Date(value * 1000); // Convert timestamp to Date (Converte o timestamp para Date)
    const hour = date.getUTCHours().toString().padStart(2, "0"); // Uses getUTCHours() for UTC hours (Usa getUTCHours() para as horas UTC)
    const minute = date.getUTCMinutes().toString().padStart(2, "0"); // Uses getUTCMinutes() for UTC minutes (Usa getUTCMinutes() para os minutos UTC)
    return `${name}: ${hour}:${minute} (Horário UTC)`; // Displays as UTC time (Exibe o horário no formato UTC)
  };

  useEffect(() => {
    try {
      if (
        cityWeatherData.sunrise !== undefined &&
        cityWeatherData.sunset !== undefined
      ) {
        setSunriseTime(formatSunTime(cityWeatherData.sunrise, "Sunrise")); // Set sunrise time (Define o horário do nascer do sol)
        setSunsetTime(formatSunTime(cityWeatherData.sunset, "Sunset")); // Set sunset time (Define o horário do pôr do sol)
      } else {
        setSunriseTime("Not found"); // Default value if data is not found (Valor padrão caso os dados não sejam encontrados)
        setSunsetTime("Not found"); // Default value if data is not found (Valor padrão caso os dados não sejam encontrados)

      }
    } catch (error) {
      console.error("There's an issue with calculating times:", error); // Log error if there's an issue with calculating times (Exibe erro caso haja problema ao calcular os horários)
    }
  }, [cityWeatherData]); // Dependency on cityWeatherData (Dependência de cityWeatherData)

  return (
    <section className={styles.city__container}>
      <h3 className={styles.city__title}>City</h3>
      <div className={styles.city__info}>
        <p>Population: {cityWeatherData.population}</p> {/* Display city population (Exibe a população da cidade) */}
        <div className={styles.city__group}>
          <Image
            src={"/sunrise.png"}
            width={16}
            height={16}
            alt="sunrise icon"
          />
          <p>{sunriseTime}</p> {/* Display sunrise time (Exibe o horário do nascer do sol) */}
        </div>
        <div className={styles.city__group}>
          <Image src={"/sunset.png"} width={16} height={16} alt="sunset icon" />
          <p>{sunsetTime}</p> {/* Display sunset time (Exibe o horário do pôr do sol) */}
        </div>
      </div>
    </section>
  );
}
