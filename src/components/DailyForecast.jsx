import { useEffect, useState } from "react";
import Image from "next/image";
import HourlyForecast from "./HourlyForecast";
import styles from "./DailyForecast.module.css";

export default function DailyForecast({
  groupedWeatherData,
  updateWeatherDetails,
}) {
  const [openDays, setOpenDays] = useState({}); // Novo estado para rastrear quais dias estão abertos

  // Função que altera o estado para o dia específico
  const handleDropArrow = (day) => {
    setOpenDays((prev) => ({
      ...prev, // Mantém o estado anterior
      [day]: !prev[day], // Inverte o valor apenas para o dia clicado
    }));
  };

  return (
    <div>
      {groupedWeatherData.map((element, index) => {
        const dataDaily = element.elements[0];
        const weather = dataDaily.weather[0];
        const temp = dataDaily.main;
        const day = element.day;

        const iconCode = weather.icon;
        const iconSrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        return (
          <div key={index} className={styles.dailyForecast__container}>
            <p
              className={`${styles.dailyForecast__day} ${
                openDays[day]
                  ? styles.dailyForecast__day_shortPosition
                  : styles.dailyForecast__day_longPosition
              }`}>
              {day}
            </p>
            <div
              className={styles.dailyForecast__hidden}
              onClick={() => handleDropArrow(day)} // Passa o dia para a função
            >
              {openDays[day] ? ( // Verifica se o dia está "aberto" no estado
                <Image
                  src={"/arrow_drop_up.png"}
                  width={24}
                  height={24}
                  alt="arrow drop up icon"
                />
              ) : (
                <Image
                  src={"/arrow_drop_down.png"}
                  width={24}
                  height={24}
                  alt="arrow drop down icon"
                />
              )}
            </div>
            <div className={styles.dailyForecast__content}>
              <section>
                <Image
                  src={iconSrc}
                  width={64}
                  height={64}
                  alt={weather.description}
                />
              </section>
              <section className={styles.dailyForecast__descriptionContainer}>
                <p>{weather.description}</p>
                <div>
                  <Image
                    src={"/water_drop.png"}
                    width={16}
                    height={16}
                    alt="water drop"
                  />
                  <p>{dataDaily.pop * 100}%</p>
                </div>
              </section>
              <section className={styles.dailyForecast__tempContainer}>
                <div className={styles.dailyForecast__temp}>
                  <p>Temp: {temp.temp}°C</p>
                  <p>Feels like: {temp.feels_like}°C</p>
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
            {openDays[day] && (
              <div
                className={`${styles.hourlyForecast__container} ${
                  openDays[day] ? "show" : ""
                }`}>
                <HourlyForecast
                  groupedWeatherData={groupedWeatherData}
                  updateWeatherDetails={updateWeatherDetails}
                  day={day}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
