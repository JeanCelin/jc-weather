import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./City.module.css";

export default function Sun({ data }) {
  console.log(data);

  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();

  //Formata os dados em um horario
  const getHourFormt = (hour, minute) => {
    return `${hour}:${minute}`;
  };

  //Transforma o timestamp do sunriseTime em formato de data/hora/minuito
  const sunriseTime = () => {
    const sunRiseDate = new Date(data.sunrise * 1000);
    const sunRiseHour = sunRiseDate.getHours().toString().padStart(2, "0");
    const sunRiseMinute = sunRiseDate.getMinutes().toString().padStart(2, "0");
    setSunrise(getHourFormt(sunRiseHour, sunRiseMinute));
  };
  //Transforma o timestamp do sunsetTime em formato de data/hora/minuito
  const sunsetTime = () => {
    const sunsetDate = new Date(data.sunset * 1000);
    const sunsetHour = sunsetDate.getHours().toString().padStart(2, "0");
    const sunsetMinute = sunsetDate.getMinutes().toString().padStart(2, "0");
    setSunset(getHourFormt(sunsetHour, sunsetMinute));
  };

  useEffect(
    () => {
      sunriseTime();
      sunsetTime();
    },
    { data }
  );

  return (
    <section className={styles.city__container}>
      <h2 className={styles.city__title}>City</h2>
      <div className={styles.city__info}>
        <p>Polulation: {data.population}</p>
        <div className={styles.city__group}>
          <Image
            src={"/sunrise.png"}
            width={16}
            height={16}
            alt="sunrise icon"
          />
          <p>{`Sunrise: ${sunrise} (Horário de Brasília)`}</p>
        </div>
        <div className={styles.city__group}>
          <Image src={"/sunset.png"} width={16} height={16} alt="sunset icon" />
          <p>{`Sunset: ${sunset} (Horário de Brasília)`}</p>
        </div>
      </div>
    </section>
  );
}
