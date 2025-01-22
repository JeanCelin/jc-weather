import { useEffect, useState } from "react";
import Image from "next/image";
import HourlyForecast from "./HourlyForecast";
import styles from "./DailyForecast.module.css";

export default function DailyForecast({ groupedWeatherData }) {
  const [dailyForecast, setDailyForecast] = useState();

  useEffect(() => {
    setDailyForecast(
      groupedWeatherData.map((element, index) => {
        const dataDaily = element.elements[0];
        const weather = dataDaily.weather[0];
        const temp = dataDaily.main;
        const day = element.day;

        const iconCode = weather.icon;
        const iconSrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        return (
          <div key={index} className={styles.dailyForecast__container}>
            <div className={styles.dailyForecast__content}>
              <section>
                <p>{day}</p>
                <Image src={iconSrc} width={64} height={64} alt="teste" />
              </section>
              <section className={styles.dailyForecast__descriptionContainer}>
                <p>{weather.description}</p>
                <Image
                  src={"/water_drop.png"}
                  width={16}
                  height={16}
                  alt="water drop"
                />
                <p>{dataDaily.pop * 100}%</p>
              </section>
              <section className={styles.dailyForecast__tempContainer}>
                <div className={styles.dailyForecast__temp}>
                  <p>Temp: {temp.temp}°C</p>
                  <p>feels like: {temp.feels_like}°C</p>
                </div>
                <div className={styles.dailyForecast__tempVariationContainer}>
                  <div className={styles.dailyForecast__tempVariation}>
                    <Image
                      src={"/arrow_max.png"}
                      width={16}
                      height={16}
                      alt="arrow max"
                    />
                    <p>{temp.temp_max}°C</p>
                  </div>
                  <div className={styles.dailyForecast__tempVariation}>
                    <Image
                      src={"/arrow_min.png"}
                      width={16}
                      height={16}
                      alt="arrow min"
                    />
                    <p>{temp.temp_min}°C</p>
                  </div>
                </div>
              </section>
            </div>
            <HourlyForecast groupedWeatherData={groupedWeatherData} day={day} />
          </div>
        );
      })
    );
  }, [groupedWeatherData]);
  return <div className={styles.teste}>{dailyForecast}</div>;
}
