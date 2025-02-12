import Image from "next/image";
import styles from "./HourlyForecast.module.css";
import { useEffect, useState } from "react";

export default function HourlyForecast({
  groupedWeatherData,
  day,
  updateWeatherDetails,
}) {
  const [hourlyForecast, setHourlyForecast] = useState(); // State to store hourly forecast data (Estado para armazenar os dados da previsão horária)

  // Function to format timestamp into hours and minutes in UTC format (Função para formatar o timestamp em horas e minutos no formato UTC)
  const formattedTime = (timeStamp) => {
    const date = new Date(timeStamp * 1000); // Converts timestamp to Date object (Converte timestamp para um objeto Date)
    const hours = date.getUTCHours(); // Uses getUTCHours to avoid local timezone (Usa getUTCHours para evitar o fuso horário local)
    const minutes = date.getUTCMinutes(); // Uses getUTCMinutes to get minutes in UTC (Usa getUTCMinutes para pegar os minutos em UTC)
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`; // Formats hours and minutes (Formata horas e minutos)
  };

  // Function to handle weather details display when clicked (Função para lidar com a exibição dos detalhes do clima ao clicar)
  const handleWeatherInfo = (temp, wind, rain, snow, visibility, cloudness) => {
    updateWeatherDetails(temp, wind, rain, snow, visibility, cloudness); // Passes data to parent function (Passa os dados para a função pai)
  };

  useEffect(() => {
    // Iterates over grouped weather data and looks for the selected day's data (Itera sobre os dados agrupados e procura os dados do dia selecionado)
    groupedWeatherData.forEach((element) => {
      if (element.day == day) { // Checks if the current element is for the selected day (Verifica se o elemento atual é do dia selecionado)
        const data = element.elements;

        setHourlyForecast(
          data.map((e, index) => {
            return (
              <div
                key={index}
                className={styles.hourlyForecast__content}
                onClick={() =>
                  handleWeatherInfo(
                    e.main,
                    e.wind,
                    e.rain,
                    e.snow,
                    e.visibility,
                    e.clouds.all
                  )
                }>
                <p>{formattedTime(e.dt)}</p>
                <Image
                  src={`https://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`}
                  width={48}
                  height={48}
                  alt={e.weather[0].description}
                />
                <p>{e.weather[0].description}</p>

                <div className={styles.hourlyForecast__preciptation}>
                  <Image
                    src={"/water_drop.png"}
                    width={16}
                    height={16}
                    alt="water drop"
                  />
                  <p>{parseInt(e.pop * 100)}%</p> {/* Displays precipitation probability (Exibe a probabilidade de precipitação) */}
                </div>
              </div>
            );
          })
        );
      }
    });
  }, [groupedWeatherData, day]); // Re-runs when weather data or day changes (Reexecuta quando os dados climáticos ou o dia mudam)

  return (
    <div className={styles.hourlyForecast__container}>{hourlyForecast}</div> // Displays the hourly forecast (Exibe a previsão horária)
  );
}
