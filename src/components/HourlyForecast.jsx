import Image from "next/image";
import styles from "./HourlyForecast.module.css";

export default function FormattedIcons({
  time,
  iconSrc,
  alt,
  weatherDescription,
  precipitation,
}) {
  return (
    <div className={styles.formattedIcons__content}>
      <p>{time}</p>
      <Image src={iconSrc} width={64} height={64} alt={alt} />
      <p className={styles.formattedIcons__iconDescription}>
        {weatherDescription}
      </p>
      <div className={styles.formattedIcons__precipitation}>
        <Image
          src={"/water_drop.png"}
          width={16}
          height={16}
          alt="water drop"
        />
        <p>{precipitation}%</p>
      </div>
    </div>
  );
}
