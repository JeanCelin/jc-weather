import { useEffect, useState } from "react";
import Image from "next/image";
import HourlyForecast from "./HourlyForecast";
import styles from "./DailyForecast.module.css";

export default function DailyForecast({ groupedWeatherData, elementsDaily }) {
  const [dailyForecast, setDailyForecast] = useState();

  useEffect(() => {
    console.log(groupedWeatherData);

    setDailyForecast(
      groupedWeatherData.map((element, index) => {
        const dataDaily = element.elements[0];
        const weather = dataDaily.weather[0];
        const iconCode = weather.icon;
        const temp = dataDaily.main;
        const day = element.day;
        console.log(dataDaily);

        const iconSrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        console.log(dataDaily);
        return (
          <div key={index} className={styles.dataDaily__container}>
            <p>{day}</p>
            <div>
              <Image src={iconSrc} width={64} height={64} alt="teste" />
            </div>
            <section className={styles.dataDaily__descriptionContainer}>
              <p>{weather.description}</p>
              <Image
                src={"/water_drop.png"}
                width={16}
                height={16}
                alt="water drop"
              />
              <p>{dataDaily.pop * 100}%</p>
            </section>
            <section className={styles.dataDaily__tempContainer}>
              <div className={styles.dataDaily__temp}>
                <p>Temp: {temp.temp}°C</p>
                <p>fells like: {temp.feels_like}°C</p>
              </div>
              <div className={styles.dataDaily__tempVariationContainer}>
                <div className={styles.dataDaily__tempVariation}>
                  <Image
                    src={"/arrow_max.png"}
                    width={16}
                    height={16}
                    alt="arrow max"
                  />
                  <p>{temp.temp_max}°C</p>
                </div>
                <div className={styles.dataDaily__tempVariation}>
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
        );
      })
    );
  }, [groupedWeatherData]);
  return (
    <div className={styles.teste}>
      {dailyForecast}
      {<HourlyForecast elementsDaily={elementsDaily} />}
    </div>
  );
}
