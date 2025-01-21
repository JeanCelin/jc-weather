import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./City.module.css";

export default function Sun({ cityWeatherData }) {
 
  const [sunriseTime, setSunriseTime] = useState(null);
  const [sunsetTime, setSunsetTime] = useState(null);

  //Transforma o timestamp em formato de hora:minuito
  const formatSunTime = (value, name) => {
    const date = new Date(value * 1000);
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    return `${name}: ${hour}:${minute} (Horário de Brasília)`;
  };

  useEffect(() => {
    try {
      if (
        cityWeatherData.sunrise !== undefined &&
        cityWeatherData.sunset !== undefined
      ) {
        setSunriseTime(formatSunTime(cityWeatherData.sunrise, "Sunrise"));
        setSunsetTime(formatSunTime(cityWeatherData.sunset, "Sunset"));
      } else {
        setSunriseTime("00:00");
        setSunsetTime("00:00");
        console.error("Dados não encontrados");
      }
    } catch (error) {
      console.error("Erro ao calcular os horários do sol:", error);
    }
  }, [cityWeatherData]);

  return (
    <section className={styles.city__container}>
      <h3 className={styles.city__title}>City</h3>
      <div className={styles.city__info}>
        <p>Population: {cityWeatherData.population}</p>
        <div className={styles.city__group}>
          <Image
            src={"/sunrise.png"}
            width={16}
            height={16}
            alt="sunrise icon"
          />
          <p>{sunriseTime}</p>
        </div>
        <div className={styles.city__group}>
          <Image src={"/sunset.png"} width={16} height={16} alt="sunset icon" />
          <p>{sunsetTime}</p>
        </div>
      </div>
    </section>
  );
}
