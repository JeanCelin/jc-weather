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

  useEffect(() => {
    const groupedWeatherByDay = {};
  
    weatherData.forEach((element) => {
      const elementTimestamp = element.dt;
      const elementDate = new Date(elementTimestamp * 1000);
      const elementKey = elementDate.toISOString().split("T")[0]; // Usa YYYY-MM-DD como chave
  
      if (!groupedWeatherByDay[elementKey]) {
        groupedWeatherByDay[elementKey] = [];
      }
      groupedWeatherByDay[elementKey].push(element);
    });
  
    // Converte o objeto em array e ordena corretamente pela data
    const groupedWeatherArray = Object.entries(groupedWeatherByDay)
      .map(([date, elements]) => ({
        day: new Date(date).getDate(), // Extrai apenas o número do dia
        elements,
      }))
      .sort((a, b) => new Date(a.elements[0].dt * 1000) - new Date(b.elements[0].dt * 1000)) // Ordena por timestamp
      .slice(0, days);
  
    setGroupedWeatherData(groupedWeatherArray);
  }, [data, days]);
  

  return (
    <div className={styles.forecast__container}>
    <DailyForecast
      groupedWeatherData={groupedWeatherData}
      days={days}
      updateWeatherDetails={updateWeatherDetails}
      />
      </div>
  );
}

