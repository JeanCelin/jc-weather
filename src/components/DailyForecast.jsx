import { useEffect, useState } from "react";
import { getWeatherIconById } from "@/utils/weatherIcons";


import HourlyForecast from "./HourlyForecast";
import styles from "./DailyForecast.module.css";
import TempWarning from "./TempWarning";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronUp,
  Droplet,
  Flame,
  Cloud,
  Thermometer,
} from "lucide-react";

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
    <div className={styles.main_container}>
      {groupedWeatherData.map((element, index) => {
        const dataDaily = element.elements[0]; // Extract daily weather data (Extrai os dados do tempo diário)

        const weather = dataDaily.weather[0]; // Extract weather information (Extrai as informações do tempo)
        const temp = dataDaily.main; // Extract temperature data (Extrai os dados de temperatura)
        const day = element.day; // Extract the day of the forecast (Extrai o dia da previsão)

        const Icon = getWeatherIconById(weather.id);

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
                <ChevronUp size={24} />
              ) : (
                <ChevronDown size={24} />
              )}
            </div>
            <div className={styles.dailyForecast__content}>
              <section className={styles.dailyForecast__descriptionContainer}>
                <Icon size={32} />
                {/* <Image
                  src={iconSrc}
                  width={64}
                  height={64}
                  alt={weather.description}
                /> */}
                <p>{weather.description}</p>{" "}
                {/* Display weather description (Exibe a descrição do clima) */}
                <div className={styles.dailyForecast__icon}>
                  <Droplet size={24} />
                  <p>{parseInt(dataDaily.pop * 100)}%</p>{" "}
                  {/* Display precipitation probability (Exibe a probabilidade de precipitação) */}
                </div>
              </section>

              <section className={styles.dailyForecast__tempContainer}>
                <div className={styles.dailyForecast__temp}>
                  <div className={styles.dailyForecast__icon}>
                    <Thermometer size={24} />
                    <p>Temp: {temp.temp}°C</p>{" "}
                  </div>
                  <div className={styles.dailyForecast__icon}>
                    {/* Display temperature (Exibe a temperatura) */}
                    <Flame size={24} />
                    <p>Feels like: {temp.feels_like}°C</p>{" "}
                  </div>
                  {/* Display "feels like" temperature (Exibe a temperatura percebida) */}
                </div>
                <div className={styles.dailyForecast__tempVariationContainer}>
                  <TempWarning top={"50%"} right={"-150px"} />{" "}
                  {/* Display temperature warning (Exibe o aviso de temperatura) */}
                  <div>
                    <div className={styles.dailyForecast__tempVariation}>
                      <ArrowUp size={24} color="#da3535" />
                      <p>{temp.temp_max}°C</p>{" "}
                      {/* Display maximum temperature (Exibe a temperatura máxima) */}
                    </div>
                    <div className={styles.dailyForecast__tempVariation}>
                      <ArrowDown size={24} color="#184c6a" />
                      <p>{temp.temp_min}°C</p>{" "}
                      {/* Display minimum temperature (Exibe a temperatura mínima) */}
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
