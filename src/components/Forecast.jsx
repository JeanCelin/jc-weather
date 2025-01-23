import { useEffect, useState } from "react";
import styles from "./Forecast.module.css";
import DailyForecast from "./DailyForecast";

export default function DailyForecasts({
  data,
  days = 1,
  updateWeatherDetails,
}) {
  const weatherData = data.list;
  const [groupedWeatherData, setGroupedWeatherData] = useState([]);


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
    const groupedWeatherArray = Object.entries(groupedWeatherByDay)
      .map(([day, elements]) => ({
        day,
        elements,
      }))
      .slice(0, days);

    // Atualiza o estado com o array agrupado
    setGroupedWeatherData(groupedWeatherArray);
  }, [data, days]);

  return <DailyForecast groupedWeatherData={groupedWeatherData} days={days} updateWeatherDetails={updateWeatherDetails}/>;
}
