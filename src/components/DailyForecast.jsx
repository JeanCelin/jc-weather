import { useEffect, useState } from "react";
import Image from "next/image";
import HourlyForecast from "./HourlyForecast";
import styles from "./DailyForecast.module.css";
import TempWarning from "./TempWarning";

export default function DailyForecast({
  groupedWeatherData,
  updateWeatherDetails,
}) {
  const [openDays, setOpenDays] = useState({}); // New state to track which days are open (Novo estado para rastrear quais dias estão abertos)

  // Function that toggles the state for a specific day (Função que altera o estado para o dia específico)
  const handleDropArrow = (day) => {
    setOpenDays((prev) => ({
      ...prev, // Keeps the previous state (Mantém o estado anterior)
      [day]: !prev[day], // Toggles the value only for the clicked day (Inverte o valor apenas para o dia clicado)
    }));
  };

  return (
    <div>
      {groupedWeatherData.map((element, index) => {
        const dataDaily = element.elements[0]; // Extract daily weather data (Extrai os dados do tempo diário)
        const weather = dataDaily.weather[0]; // Extract weather information (Extrai as informações do tempo)
        const temp = dataDaily.main; // Extract temperature data (Extrai os dados de temperatura)
        const day = element.day; // Extract the day of the forecast (Extrai o dia da previsão)

        const iconCode = weather.icon; // Get the weather icon code (Obtém o código do ícone do clima)
        const iconSrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`; // Construct the icon source URL (Constrói a URL do ícone)

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
              onClick={() => handleDropArrow(day)} // Passes the day to the function (Passa o dia para a função)
            >
              {openDays[day] ? ( // Checks if the day is "open" in state (Verifica se o dia está "aberto" no estado)
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
                <p>{weather.description}</p> {/* Display weather description (Exibe a descrição do clima) */}
                <div>
                  <Image
                    src={"/water_drop.png"}
                    width={16}
                    height={16}
                    alt="water drop"
                  />
                  <p>{parseInt(dataDaily.pop * 100)}%</p> {/* Display precipitation probability (Exibe a probabilidade de precipitação) */}
                </div>
              </section>
              <section className={styles.dailyForecast__tempContainer}>
                <div className={styles.dailyForecast__temp}>
                  <p>Temp: {temp.temp}°C</p> {/* Display temperature (Exibe a temperatura) */}
                  <p>Feels like: {temp.feels_like}°C</p> {/* Display "feels like" temperature (Exibe a temperatura percebida) */}
                </div>
                <div className={styles.dailyForecast__tempVariationContainer}>
                  <TempWarning top={"50%"} right={"-150px"} /> {/* Display temperature warning (Exibe o aviso de temperatura) */}
                  <div>
                    <div className={styles.dailyForecast__tempVariation}>
                      <Image
                        src={"/arrow_max.png"}
                        width={16}
                        height={16}
                        alt="arrow max"
                      />
                      <p>{temp.temp_max}°C</p> {/* Display maximum temperature (Exibe a temperatura máxima) */}
                    </div>
                    <div className={styles.dailyForecast__tempVariation}>
                      <Image
                        src={"/arrow_min.png"}
                        width={16}
                        height={16}
                        alt="arrow min"
                      />
                      <p>{temp.temp_min}°C</p> {/* Display minimum temperature (Exibe a temperatura mínima) */}
                    </div>
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
