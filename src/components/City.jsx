import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./City.module.css";

export default function Sun({ data }) {

  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);

  //Transforma o timestamp em formato de hora:minuito
  const getTime = (value, name) => {
    const date = new Date(value * 1000);
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    return `${name}: ${hour}:${minute} (Horário de Brasília)`;
  };
  
  useEffect(() => {
    try {
      if (data.sunrise !== undefined && data.sunset !== undefined) {
        setSunrise(getTime(data.sunrise, "Sunrise"));
        setSunset(getTime(data.sunset, "Sunset"));
      } else {
        setSunrise("00:00");
        setSunset("00:00");
        console.error("Dados não encontrados");
      }
    } catch (error) {
      console.error("Erro ao calcular os horários do sol:", error);
    }
  }, [data]);

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
          <p>{sunrise}</p>
        </div>
        <div className={styles.city__group}>
          <Image src={"/sunset.png"} width={16} height={16} alt="sunset icon" />
          <p>{sunset}</p>
        </div>
      </div>
    </section>
  );
}
