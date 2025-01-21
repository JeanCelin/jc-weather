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
        const elementsDaily = element.elements;

        //Previsão por horario

        //Previsão
        return (
          <section className={styles.forecast__container} key={index}>
            <section className={styles.forecast__day}>{day}</section>
            <section>
              <DailyForecast
                groupedWeatherData={groupedWeatherData}
                elementsDaily={elementsDaily}
              />
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
