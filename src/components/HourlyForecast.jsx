import Image from "next/image";
import styles from "./HourlyForecast.module.css";
import { useEffect, useState } from "react";

export default function HourlyForecast({ groupedWeatherData, day }) {
  const [hourlyForecast, setHourlyForecast] = useState();

  const formattedTime = (timeStamp) => {
    const date = new Date(timeStamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    groupedWeatherData.forEach((element) => {
      if (element.day == day) {
        const data = element.elements;

        setHourlyForecast(
          data.map((e, index) => {
            return (
              <div key={index} className={styles.hourlyForecast__content}>
                <p>{formattedTime(e.dt)}</p>
                <Image
                  src={`https://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`}
                  width={48}
                  height={48}
                  alt={e.weather[0].description}
                />
                <p>{e.weather[0].description}</p>
                <p>{parseInt(e.pop * 100)}%</p>
              </div>
            );
          })
        );
      }
    });
  }, [groupedWeatherData, day]);

  return (
    <div className={styles.hourlyForecast__container}>{hourlyForecast}</div>
  );
}
