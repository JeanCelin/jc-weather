import Image from "next/image";
import styles from "./Temp.module.css";

export default function Temp({ data }) {
  console.log(data);
  return (
    <section className={styles.temp__container}>
      <h2 className={styles.temp__title}>Temperature</h2>
      <div className={styles.temp__info}>
        <p>Temp: {data.temp}°C</p>
        <p>Feels Like: {data.feels_like}°C</p>
      </div>
      <div className={styles.temp__variable}>
        <Image src={"/arrow_max.png"} width={24} height={24} alt="arrow up icon"></Image>
        <p>Temp max: {data.temp_max}°C</p>
      </div>
      <div className={styles.temp__variable}>
        <Image src={"/arrow_min.png"} width={24} height={24} alt="arrow down icon"></Image>
        <p>Temp min: {data.temp_min}°C</p>
      </div>
    </section>

  );
}
