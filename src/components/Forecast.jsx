import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Forecast.module.css";
import HourlyForecast from "./HourlyForecast";
import DailyForecast from "./DailyForecast";

export default function DailyForecasts({
  data,
  days = 3,
  updateWeatherDetails,
}) {
  console.log(data);
  const weatherData = data.list;
  const [forecast, setForecast] = useState();
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
      const elementDay = parseInt(
        elementDate.getDate().toString().padStart(2, "0")
      );
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
    setForecast(
      selectedDaysForecast.map((element, index) => {
        const day = element.day;
        const elements = element.elements;

        //Previsão por horario
        let forecast = elements.map((element, index) => {
          const elementTimestamp = element.dt;
          const elementDate = new Date(elementTimestamp * 1000);
          const iconCode = element.weather[0].icon;
          const iconSrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
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
              <HourlyForecast
                selectedDaysForecast={selectedDaysForecast}
                time={elementFormattedTime}
                iconSrc={iconSrc}
                alt={element.weather[0].main}
                weatherDescription={element.weather[0].description}
                precipitation={precipitation}
              />
            </div>
          );
        });

        //Previsão
        return (
          <section className={styles.forecast__container} key={index}>
            <section className={styles.forecast__day}>{day}</section>
            <section>
              <DailyForecast groupedWeatherData={groupedWeatherData} />
            </section>
            <section className={styles.forecast__elements}>{forecast}</section>
          </section>
        );
      })
    );
  }, [groupedWeatherData, days]);

  return (
    <div>
      <section>{forecast}</section>
    </div>
  );
}
