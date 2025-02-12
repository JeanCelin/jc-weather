import { useEffect, useState } from "react";
import styles from "./Forecast.module.css";
import DailyForecast from "./DailyForecast";

export default function Forecast({
  data,
  days = 1,
  updateWeatherDetails,
}) {
  const weatherData = data.list; // Extracts the weather data list from the API response (Extrai a lista de dados do clima da resposta da API)
  const [groupedWeatherData, setGroupedWeatherData] = useState([]); // State to store grouped weather data (Estado para armazenar os dados do clima agrupados)

  useEffect(() => {
    const groupedWeatherByDay = {}; // Create an object to group weather data by day (Cria um objeto para agrupar os dados do clima por dia)

    weatherData.forEach((element) => {
      const elementTimestamp = element.dt; // Extract timestamp (Extrai o timestamp)
      const elementDate = new Date(elementTimestamp * 1000); // Convert timestamp to Date (Converte timestamp para Date)
      const elementKey = elementDate.toISOString().split("T")[0]; // Uses YYYY-MM-DD as key (Usa YYYY-MM-DD como chave)

      if (!groupedWeatherByDay[elementKey]) {
        groupedWeatherByDay[elementKey] = []; // Initialize the array for the day (Inicializa o array para o dia)
      }
      groupedWeatherByDay[elementKey].push(element); // Push the element to the corresponding day (Adiciona o elemento ao dia correspondente)
    });

    // Converts the object into an array and sorts by date (Converte o objeto em um array e ordena pela data)
    const groupedWeatherArray = Object.entries(groupedWeatherByDay)
    .map(([date, elements]) => ({
      day: new Date(date + "T00:00:00Z").getUTCDate(), // Use UTC to avoid timezone issues (Usa UTC para evitar problemas de fuso horário)
      elements,
    }))
    .sort((a, b) => a.elements[0].dt - b.elements[0].dt) // Sort the weather data by date (Ordena os dados do clima pela data)
    .slice(0, days); // Limit the number of days to display (Limita o número de dias para exibição)

    setGroupedWeatherData(groupedWeatherArray); // Update the state with the grouped data (Atualiza o estado com os dados agrupados)
  }, [data, days]);

  return (
    <div className={styles.forecast__container}>
      <DailyForecast
        groupedWeatherData={groupedWeatherData} // Passes the grouped weather data to DailyForecast (Passa os dados do clima agrupados para o DailyForecast)
        days={days}
        updateWeatherDetails={updateWeatherDetails}
      />
    </div>
  );
}
