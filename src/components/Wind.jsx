import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Wind.module.css";

export default function Wind({ windWeatherData }) {
  const degrees = windWeatherData.deg; // Get the wind direction in degrees from API (Obtém a direção do vento em graus da API)
  const [imgSrc, setImgSrc] = useState("/compass-rose/north.png"); // Stores the icon source for wind direction (Armazena a fonte do ícone para a direção do vento)
  const [windDirection, setWindDirection] = useState("Loading..."); // Stores the wind direction as text (Armazena a direção do vento como texto)

  // Function to determine wind direction and set the corresponding icon (Função para determinar a direção do vento e definir o ícone correspondente)
  const getWindDirection = (degrees) => {
    if (degrees >= 337.5 || degrees < 22.5) {
      setWindDirection("North (N)"); // (Norte)
      setImgSrc("/compass-rose/north.png");
    } else if (degrees >= 22.5 && degrees < 67.5) {
      setWindDirection("Northeast (NE)"); // (Nordeste)
      setImgSrc("/compass-rose/north_east.png");
    } else if (degrees >= 67.5 && degrees < 112.5) {
      setWindDirection("East (E)"); // (Leste)
      setImgSrc("/compass-rose/east.png");
    } else if (degrees >= 112.5 && degrees < 157.5) {
      setWindDirection("Southeast (SE)"); //  (Sudeste)
      setImgSrc("/compass-rose/south_east.png");
    } else if (degrees >= 157.5 && degrees < 202.5) {
      setWindDirection("South (S)"); // (Sul)
      setImgSrc("/compass-rose/south.png");
    } else if (degrees >= 202.5 && degrees < 247.5) {
      setWindDirection("Southwest (SW)"); // (Sudoeste)
      setImgSrc("/compass-rose/south_west.png");
    } else if (degrees >= 247.5 && degrees < 292.5) {
      setWindDirection("West (W)"); // (Oeste)
      setImgSrc("/compass-rose/west.png");
    } else if (degrees >= 292.5 && degrees < 337.5) {
      setWindDirection("Northwest (NW)"); //(Noroeste)
      setImgSrc("/compass-rose/north_west.png");
    } else {
      setWindDirection("Something went wrong"); // Error handling (Tratamento de erro)
    }
  };

  // Determines wind direction based on degree (Determina a direção do vento com base no grau)
  useEffect(() => {
    getWindDirection(degrees); // Calls the function when degrees change (Chama a função quando os graus mudam)
  }, [degrees]);

  return (
    <section className={styles.wind__container}>
      <h3 className={styles.wind__title}>Wind</h3> {/* Wind section title (Título da seção de Vento) */}
      <div className={styles.wind__directionContainer}>
        <div className={styles.wind__direction}>
          <Image
            src={imgSrc}
            width={16}
            height={16}
            alt="wind direction icon" // Image for wind direction icon (Ícone da direção do vento)
          />
          {windDirection} {/* Displaying the wind direction (Exibindo a direção do vento) */}
        </div>
      </div>
      <div className={styles.wind__direction}>
        <Image src={"/air.png"} width={16} height={16} alt="wind icon" /> {/* Wind icon (Ícone do vento) */}
        <p className={styles.wind__speed}>Speed: {windWeatherData.speed} m/s</p> {/* Displaying wind speed (Exibindo a velocidade do vento) */}
      </div>
      <div className={styles.wind__direction}>
        <Image
          src={"/wind_power.png"}
          width={16}
          height={16}
          alt="wind power icon" // Image for wind gust icon (Ícone da rajada de vento)
        />
        <p className={styles.wind__gust}>
          Wind Gust: {windWeatherData.gust}m/s {/* Displaying wind gust (Exibindo a rajada de vento) */}
        </p>
      </div>
    </section>
  );
}
