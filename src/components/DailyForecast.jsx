/**
 * -------------------------------------------------------------
 * DailyForecast Component
 * -------------------------------------------------------------
 * Responsável por renderizar a previsão diária do clima.
 * Exibe:
 *  - Data (mês + dia)
 *  - Descrição do clima
 *  - Probabilidade de chuva
 *  - Temperatura e sensação térmica
 *  - Toggle para exibir previsão horária
 *
 * @param {Array} groupedWeatherData
 * Estrutura esperada:
 * [
 *   {
 *     day: number | string,
 *     elements: [
 *       {
 *         dt_txt: string,
 *         weather: [{ id: number, description: string }],
 *         main: { temp: number, feels_like: number },
 *         pop: number
 *       }
 *     ]
 *   }
 * ]
 *
 * @param {Function} updateWeatherDetails
 * Função utilizada pelo componente filho (HourlyForecast)
 * para atualizar os detalhes do clima.
 */

import { useState } from "react";
import { getWeatherIconById } from "@/utils/weatherIcons";

import HourlyForecast from "./HourlyForecast";
import styles from "./DailyForecast.module.css";

import {
  ChevronDown,
  Droplet,
  Flame,
  Thermometer,
  Calendar,
} from "lucide-react";

export default function DailyForecast({
  groupedWeatherData = [],
  updateWeatherDetails,
  timezoneOffset,
}) {
  /**
   * openDays
   * Armazena quais dias estão expandidos.
   * Estrutura:
   * {
   *   [day]: boolean
   * }
   */
  const [openDays, setOpenDays] = useState({});

  /**
   * handleDropArrow
   * Alterna o estado expandido/recolhido de um dia específico.
   *
   * @param {string|number} day
   */
  const handleDropArrow = (day) => {
    setOpenDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  /**
   * getMonthAbbreviation
   * Converte uma string de data para abreviação do mês (pt-BR).
   *
   * @param {string} dateString
   * @returns {string} Ex: "JAN", "FEV", etc.
   */
  function getMonthAbbreviation(dateString) {
    const date = new Date(dateString.replace(" ", "T"));

    return new Intl.DateTimeFormat("pt-BR", {
      month: "short",
    })
      .format(date)
      .replace(/\./g, "")
      .toUpperCase();
  }

  return (
    <div className={styles.main__container}>
      {/* Título da seção */}
      <div className={styles.dailyForecast__title}>
        <Calendar size={16} color="var(--color3)" />
        <h2>PREVISÃO DIÁRIA</h2>
      </div>
      {groupedWeatherData.length === 0 && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingBox}>
            <div className={styles.spinner}></div>
            <p>Buscando previsão...</p>
          </div>
        </div>
      )}

      {groupedWeatherData.map((element) => {
        /**
         *
         * Extração segura dos dados do dia
         */
        const dataDaily = element?.elements[0];
        const weather = dataDaily?.weather[0];
        const temp = dataDaily?.main;
        const day = element.day;

        /**
         * Ícone dinâmico baseado no código do clima
         */
        const Icon = weather ? getWeatherIconById(weather.id) : null;

        /**
         * Abreviação do mês
         */
        const month = getMonthAbbreviation(element.elements[0].dt_txt);

        return (
          <section key={element.day} className={styles.dailyForecast__main}>
            <section className={styles.dailyForecast__container}>
              {/* Data (mês + dia) */}
              <section className={styles.dailyForecast__date}>
                <span className={styles.dailyForecast__month}>{month}</span>
                <span className={styles.dailyForecast__day}>{day}</span>
              </section>

              <section className={styles.dailyForecast__content}>
                {/* Seção de clima e chuva */}
                <section className={styles.dailyForecast__rain}>
                  <Icon size={32} color="var(--color3)" />

                  <div className={styles.dailyForecast__rainText}>
                    <p>{weather.description}</p>

                    {/* Probabilidade de precipitação */}
                    <div className={styles.dailyForecast__drop}>
                      <Droplet size={16} />
                      <p>{parseInt(dataDaily.pop * 100)}%</p>
                    </div>
                  </div>
                </section>

                {/* Seção de temperatura */}
                <section className={styles.dailyForecast__temp}>
                  {/* Temperatura atual */}
                  <div className={styles.dailyForecast__tempContent}>
                    <p>Temperatura</p>
                    <div className={styles.dailyForecast__iconAdjust}>
                      <Thermometer size={16} color="red" />
                      <p>{temp.temp}°C</p>
                    </div>
                  </div>

                  {/* Sensação térmica */}
                  <div className={styles.dailyForecast__tempContent}>
                    <p>Sensação</p>
                    <div className={styles.dailyForecast__iconAdjust}>
                      <Flame size={16} color="orange" />
                      <p>{temp.feels_like}°C</p>
                    </div>
                  </div>

                  {/* Botão de expansão */}
                  <div className={styles.dailyForecast__expand}>
                    <button
                      type="button"
                      className={styles.dailyForecast__expandBtn}
                      onClick={() => handleDropArrow(day)}
                      /**
                       * Acessibilidade:
                       * - aria-expanded: indica se está aberto
                       * - aria-controls: conecta botão à área expandida
                       * - aria-label: descreve a ação
                       */
                      aria-expanded={openDays[day] ?? false}
                      aria-controls={`forecast-${day}`}
                      aria-label={
                        openDays[day]
                          ? `Recolher previsão do dia ${day}`
                          : `Expandir previsão do dia ${day}`
                      }>
                      <ChevronDown
                        size={24}
                        color="var(--color3)"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </section>
              </section>
            </section>

            {/* Renderização condicional da previsão horária */}
            {openDays[day] && (
              <div
                id={`forecast-${day}`}
                className={styles.hourlyForecast__container}>
                <HourlyForecast
                  groupedWeatherData={groupedWeatherData}
                  updateWeatherDetails={updateWeatherDetails}
                  day={day}
                  timezone={timezoneOffset}
                />
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
