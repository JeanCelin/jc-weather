import Image from "next/image";
import styles from "./Temp.module.css";

export default function Temp({ data }) {
  return (
    <section className={styles.temp__container}>
      <h2 className={styles.temp__title}>Temperature</h2>
      <div className={styles.temp__info}>
        <p>Temp: {data.main.temp}°C</p>
        <p>Feels Like: {data.main.feels_like}°C</p>
      </div>
      <div className={styles.temp__variable}>
        <Image src={"/arrow_max.png"} width={24} height={24}></Image>
        <p>Temp max: {data.main.temp_max}°C</p>
      </div>
      <div className={styles.temp__variable}>
        <Image src={"/arrow_min.png"} width={24} height={24}></Image>
        <p>Temp min: {data.main.temp_min}°C</p>
      </div>
    </section>
  );
}
