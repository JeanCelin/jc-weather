import Image from "next/image";
import styles from "./HourlyForecast.module.css";
import { useEffect, useState } from "react";

export default function HourlyForecast({
  groupedWeatherData,
  day,
  updateWeatherDetails,
}) {
  const [hourlyForecast, setHourlyForecast] = useState();

  // Função para formatar o timestamp em horas e minutos no formato UTC
  const formattedTime = (timeStamp) => {
    const date = new Date(timeStamp * 1000); // Converte o timestamp para Date
    const hours = date.getUTCHours(); // Usa getUTCHours() para evitar o fuso horário local
    const minutes = date.getUTCMinutes(); // Usa getUTCMinutes() para garantir a exibição no UTC
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  };

  // Função para lidar com a exibição dos detalhes do clima quando um item é clicado
  const handleWeatherInfo = (temp, wind, rain, snow, visibility, cloudness) => {
    updateWeatherDetails(temp, wind, rain, snow, visibility, cloudness);
  };

  useEffect(() => {
    // Itera sobre o grupo de dados e procura os dados correspondentes ao dia selecionado
    groupedWeatherData.forEach((element) => {
      if (element.day == day) {
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
                  <p>{parseInt(e.pop * 100)}%</p>
                </div>
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
