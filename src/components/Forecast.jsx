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
  const weatherData = data.list;
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


  return (
    <div>
      <section className={styles.forecast__container}>
        <section>
          <DailyForecast
            groupedWeatherData={groupedWeatherData}
  
          />
        </section>
      </section>
    </div>
  );
}
