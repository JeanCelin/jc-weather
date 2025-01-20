import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Forecast.module.css";

export default function Forecast({ data, days = 3, updateWeatherDetails }) {
  const weatherData = data.list;
  const [dailyForecasts, setDailyForecasts] = useState();
  const [groupedWeatherData, setGroupedWeatherData] = useState([]);

  const handleWeatherInfo = (temp, wind, rain, snow, visibility, cloudness) => {
    updateWeatherDetails(temp, wind, rain, snow, visibility, cloudness);
  };

  // Agrupa os dados de clima por dia
  useEffect(() => {
    const groupedWeatherByDay = {};

    weatherData.forEach((element) => {
      const elementTimestamp = element.dt;
      const elementDate = new Date(elementTimestamp * 1000);
      const elementDay = parseInt(elementDate.getDate().toString().padStart(2, "0"));
      if (!groupedWeatherByDay[elementDay]) {
        groupedWeatherByDay[elementDay] = [];
      }
      groupedWeatherByDay[elementDay].push(element);
    });

    // Converte o objeto em array de objetos com day e elements
    const groupedWeatherArray = Object.entries(groupedWeatherByDay).map(
      ([day, elements]) => ({
        day,
        elements,
      })
    );

    // Atualiza o estado com o array agrupado
    setGroupedWeatherData(groupedWeatherArray);
  }, [data]);

  // Separa os elementos por dias selecionados
  useEffect(() => {
    const selectedDaysForecast = groupedWeatherData.slice(0, days);

    // Transforma os itens em formato HTML para exibir no site
    setDailyForecasts(
      selectedDaysForecast.map((element, index) => {
        const day = element.day;
        const elements = element.elements;

        let hourlyForecasts = elements.map((element, index) => {
          const elementTimestamp = element.dt;
          const elementDate = new Date(elementTimestamp * 1000);
          const iconCode = element.weather[0].icon;
          const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
          const elementHour = elementDate
            .getHours()
            .toString()
            .padStart(2, "0");
          const elementMinutes = elementDate
            .getMinutes()
            .toString()
            .padStart(2, "0");
          const elementFormattedTime = `${elementHour}:${elementMinutes}`;
          const precipitation = (Number(element.pop) * 100).toFixed(2);

          return (
            <div
              className={styles.forecast__content}
              key={index}
              onClick={() =>
                handleWeatherInfo(
                  element.main,
                  element.wind,
                  element.rain?.["3h"] || 0,
                  element.snow,
                  element.visibility,
                  element.clouds.all
                )
              }>
              <p>{elementFormattedTime}</p>
              <Image
                src={iconUrl}
                width={64}
                height={64}
                alt={element.weather[0].main}
              />
              <p className={styles.forecast__iconDescription}>
                {element.weather[0].description}
              </p>
              <div className={styles.forecast__precipitation}>
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
        });

        return (
          <section className={styles.forecast__container} key={index}>
            <section className={styles.forecast__day}>{day}</section>
            <section className={styles.forecast__elements}>{hourlyForecasts}</section>
          </section>
        );
      })
    );
  }, [groupedWeatherData, days]);

  return <>{dailyForecasts}</>;
}
