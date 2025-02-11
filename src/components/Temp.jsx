import Image from "next/image";
import styles from "./Temp.module.css";

import TempWarning from "./TempWarning";

export default function Temp({ tempWeatherData }) {
  return (
    <section className={styles.temp__container}>
      <div className={styles.temp__titleContainer}>
        <h3 className={styles.temp__title}>Temperature</h3>
        <TempWarning top="20px" left="-90px" />
      </div>
      <div className={styles.temp__info}>
        <p>Temp: {parseInt(tempWeatherData.temp)}°C</p>
        <p>Feels Like: {parseInt(tempWeatherData.feels_like)}°C</p>
      </div>
      <div className={styles.temp__variable}>
        <Image
          src={"/arrow_max.png"}
          width={24}
          height={24}
          alt="arrow up icon"></Image>
        <p>Temp max: {parseInt(tempWeatherData.temp_max)}°C</p>
      </div>
      <div className={styles.temp__variable}>
        <Image
          src={"/arrow_min.png"}
          width={24}
          height={24}
          alt="arrow down icon"></Image>
        <p>Temp min: {parseInt(tempWeatherData.temp_min)}°C</p>
      </div>
    </section>
  );
}
