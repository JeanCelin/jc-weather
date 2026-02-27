import styles from "./HourlyForecast.module.css";
import { getWeatherIconById } from "@/utils/weatherIcons";
import { Droplets } from "lucide-react";

/**
 * -------------------------------------------------------------
 * HourlyForecast Component
 * -------------------------------------------------------------
 * Responsabilidades:
 * - Receber dados já agrupados por dia
 * - Filtrar o dia selecionado
 * - Renderizar previsão horária (intervalos de 3h)
 * - Permitir atualizar detalhes climáticos ao clicar
 *
 * @param {Array} groupedWeatherData
 * Estrutura:
 * [
 *   {
 *     day: 27,
 *     elements: [ { ...forecastData } ]
 *   }
 * ]
 *
 * @param {number} day
 * Dia selecionado que deve ser exibido
 *
 * @param {Function} updateWeatherDetails
 * Função responsável por atualizar os dados detalhados no componente pai
 *
 * @param {number} timezone
 * Offset da cidade em segundos (fornecido pela API)
 */

export default function HourlyForecast({
  groupedWeatherData,
  day,
  updateWeatherDetails,
  timezone,
}) {
  /**
   * -------------------------------------------------------------
   * Converte timestamp Unix (segundos) para horário local
   * respeitando o timezone da cidade retornado pela API
   *
   * Estratégia:
   * 1. Converter timestamp UTC
   * 2. Somar offset do timezone
   * 3. Extrair horas e minutos em UTC (já ajustado)
   * -------------------------------------------------------------
   */
  const formattedTime = (timeStamp) => {
    const utcDate = new Date(timeStamp * 1000);

    const localTime = new Date(
      utcDate.getTime() + timezone * 1000
    );

    const hours = localTime.getUTCHours();
    const minutes = localTime.getUTCMinutes();

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  };

  /**
   * Encaminha dados detalhados do horário selecionado
   * para o componente pai
   */
  const handleWeatherInfo = (
    temp,
    wind,
    rain,
    snow,
    visibility,
    cloudness
  ) => {
    updateWeatherDetails(temp, wind, rain, snow, visibility, cloudness);
  };

  /**
   * -------------------------------------------------------------
   * Derivação declarativa dos dados
   * -------------------------------------------------------------
   * Em vez de:
   * - Iterar dentro de useEffect
   * - Salvar JSX em state
   *
   * Fazemos:
   * - Encontrar o dia selecionado
   * - Renderizar diretamente no JSX
   * -------------------------------------------------------------
   */
  const selectedDayData = groupedWeatherData.find(
    (element) => element.day === day
  );

  return (
    <div className={styles.hourlyForecast}>
      <p>PREVISÃO HORÁRIA</p>

      <div className={styles.hourlyForecast__container}>
        {selectedDayData?.elements.map((e) => {
          const weather = e.weather?.[0];
          if (!weather) return null;

          const Icon = getWeatherIconById(weather.id);

          return (
            <div
              key={e.dt}
              className={styles.hourlyForecast__content}
              onClick={() =>
                handleWeatherInfo(
                  e.main,
                  e.wind,
                  e.rain,
                  e.snow,
                  e.visibility,
                  e.clouds?.all
                )
              }
            >
              <p>{formattedTime(e.dt)}</p>

              <Icon size={24} color="var(--color3)" />

              <p>{weather.description}</p>

              <div className={styles.hourlyForecast__preciptation}>
                <Droplets size={16} color="var(--color3)" />
                <p>{Math.round((e.pop ?? 0) * 100)}%</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}