import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Wind.module.css";

export default function Wind({ windWeatherData }) {

  const degrees = windWeatherData.deg; // Pega a direção na API
  const [imgSrc, setImgSrc] = useState("/compass-rose/north.png");
  const [windDirection, setWindDirection] = useState("Loading...");

  // Função para determinar a direção do vento e o icone correspondente
  const getWindDirection = (degrees) => {
    if (degrees >= 337.5 || degrees < 22.5) {
      setWindDirection("North (N)");
      setImgSrc("/compass-rose/north.png");
    } else if (degrees >= 22.5 && degrees < 67.5) {
      setWindDirection("Northeast (NE)");
      setImgSrc("/compass-rose/north_east.png");
    } else if (degrees >= 67.5 && degrees < 112.5) {
      setWindDirection("East (E)");
      setImgSrc("/compass-rose/east.png");
    } else if (degrees >= 112.5 && degrees < 157.5) {
      setWindDirection("Southeast (SE)");
      setImgSrc("/compass-rose/south_east.png");
    } else if (degrees >= 157.5 && degrees < 202.5) {
      setWindDirection("South (S)");
      setImgSrc("/compass-rose/south.png");
    } else if (degrees >= 202.5 && degrees < 247.5) {
      setWindDirection("Southwest (SW)");
      setImgSrc("/compass-rose/south_west.png");
    } else if (degrees >= 247.5 && degrees < 292.5) {
      setWindDirection("West (W)");
      setImgSrc("/compass-rose/west.png");
    } else if (degrees >= 292.5 && degrees < 337.5) {
      setWindDirection("Northwest (NW)");
      setImgSrc("/compass-rose/north_west.png");
    } else {
      setWindDirection("Something went wrong");
    }
  };

  // Determina a direção do vento com base no grau
  useEffect(() => {
    getWindDirection(degrees);
  }, [degrees]);

  return (
    <section className={styles.wind__container}>
      <h3 className={styles.wind__title}>Wind</h3>
      <div className={styles.wind__directionContainer}>
        <div className={styles.wind__direction}>
          Direction:{" "}
          <Image
            src={imgSrc}
            width={16}
            height={16}
            alt="wind direction icon"
          />
          {windDirection}
        </div>{" "}
      </div>
      <div className={styles.wind__direction}>
        <Image src={"/air.png"} width={16} height={16} alt="wind icon" />
        <p className={styles.wind__speed}>Speed: {windWeatherData.speed} m/s</p>
      </div>
      <div className={styles.wind__direction}>
        <Image
          src={"/wind_power.png"}
          width={16}
          height={16}
          alt="wind power icon"
        />
        <p className={styles.wind__gust}>Wind Gust: {windWeatherData.gust} m/s</p>
      </div>
    </section>
  );
}
