import { useEffect, useState } from "react";
import styles from "./Forecast.module.css";
import DailyForecast from "./DailyForecast";

/**
 * -------------------------------------------------------------
 * Forecast Component
 * -------------------------------------------------------------
 * Responsável por:
 * - Receber os dados brutos da API (forecast 5 dias / 3h)
 * - Agrupar os dados por dia
 * - Ordenar cronologicamente
 * - Limitar a quantidade de dias exibidos
 * - Repassar os dados agrupados para o componente DailyForecast
 *
 * @param {Object} data
 * Resposta da API OpenWeather (forecast)
 *
 * @param {number} days
 * Quantidade de dias que devem ser exibidos (default = 5)
 *
 * @param {Function} updateWeatherDetails
 * Função usada para atualizar detalhes climáticos
 */

export default function Forecast({ data, days = 5, updateWeatherDetails }) {
  /**
   * Lista completa retornada pela API (intervalos de 3h)
   */
  const weatherData = data?.list ?? [];

  /**
   * Estado que armazenará os dados já agrupados por dia
   */
  const [groupedWeatherData, setGroupedWeatherData] = useState([]);

  const timezoneOffset = data?.city?.timezone ?? 0; // offset em segundos

  useEffect(() => {
    /**
     * Objeto auxiliar para agrupar previsões por dia
     * Estrutura:
     * {
     *   "2026-02-27": [element1, element2, ...],
     *   "2026-02-28": [element1, element2, ...]
     * }
     */
    const groupedWeatherByDay = {};

    if (!weatherData.length) return;

    weatherData.forEach((element) => {
  

      // Ajusta o timestamp para o horário local da cidade
      const localTimestamp = (element.dt + timezoneOffset) * 1000;

      // Cria a data já ajustada
      const localDate = new Date(localTimestamp);

      // Gera chave no formato YYYY-MM-DD baseado no horário local
      const elementKey = localDate.toISOString().split("T")[0];

      if (!groupedWeatherByDay[elementKey]) {
        groupedWeatherByDay[elementKey] = [];
      }

      groupedWeatherByDay[elementKey].push(element);
    });

    /**
     * Converte o objeto agrupado em array
     * Ordena por data
     * Limita a quantidade de dias exibidos
     */
    const groupedWeatherArray = Object.entries(groupedWeatherByDay)
      .map(([date, elements]) => ({
        /**
         * Extrai apenas o número do dia (UTC)
         * Uso de UTC evita problemas de fuso horário
         */
        day: new Date(date + "T00:00:00Z").getUTCDate(),
        elements,
      }))
      .sort((a, b) => a.elements[0].dt - b.elements[0].dt)
      .slice(0, days);

    setGroupedWeatherData(groupedWeatherArray);
  }, [weatherData, days, data]);

  return (
    <section className={styles.forecast}>
      <DailyForecast
        groupedWeatherData={groupedWeatherData}
        days={days}
        updateWeatherDetails={updateWeatherDetails}
        timezoneOffset={timezoneOffset}
      />
    </section>
  );
}
