import Image from "next/image";
import styles from "./TemperatureInfo.module.css";

import TempWarning from "./TempWarning";

export default function TemperatureInfo({ tempWeatherData }) {
  return (
    <section className={styles.temp__container}>
      <div className={styles.temp__titleContainer}>
        <h3 className={styles.temp__title}>Temperature</h3>
        <TempWarning top="20px" left="-90px" /> {/* calls the warning message (Chama a mensagem de aviso) */}
      </div>
      <div className={styles.temp__info}>
        <p>Temp: {parseInt(tempWeatherData.temp)}°C</p> {/* Shows the current temperature (Exibe a temperatura atual) */}
        <p>Feels Like: {parseInt(tempWeatherData.feels_like)}°C</p> {/* Shows the "feels like" temperature (Exibe a temperatura "sensação") */}
      </div>
      <div className={styles.temp__variable}>
        <Image
          src={"/arrow_max.png"}
          width={24}
          height={24}
          alt="arrow up icon"
        />
        <p>Temp max: {parseInt(tempWeatherData.temp_max)}°C</p> {/* Shows the maximum temperature (Exibe a temperatura máxima) */}
      </div>
      <div className={styles.temp__variable}>
        <Image
          src={"/arrow_min.png"}
          width={24}
          height={24}
          alt="arrow down icon"
        />
        <p>Temp min: {parseInt(tempWeatherData.temp_min)}°C</p> {/* Shows the minimum temperature (Exibe a temperatura mínima) */}
      </div>
    </section>
  );
}
