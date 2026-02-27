/**
 * -------------------------------------------------------------
 * Dashboard Component
 * -------------------------------------------------------------
 * Responsável por exibir os dados atuais do clima.
 *
 * Exibe:
 * - Localização (cidade + país)
 * - Temperatura atual
 * - Sensação térmica
 * - Temperatura mínima e máxima
 * - Informações complementares:
 *    - Umidade
 *    - Vento
 *    - Visibilidade
 *    - Nebulosidade
 *    - Pressão atmosférica
 *    - Volume de chuva (últimas 3h)
 *
 * @param {Object} data
 * Resposta da API OpenWeather (forecast)
 *
 * @param {Object} location
 * Dados da localização selecionada
 */

import {
  ArrowDown,
  ArrowUp,
  Cloud,
  Droplet,
  Droplets,
  Eye,
  Gauge,
  Wind,
} from "lucide-react";
import styles from "./Dashboard.module.css";
import { JetBrains_Mono } from "next/font/google";

/**
 * Fonte JetBrains Mono aplicada à temperatura principal
 */
const jetBrainsMono = JetBrains_Mono({
  weight: "600",
  subsets: ["latin"],
  display: "swap",
});

export default function Dashboard({ data, location }) {
  /**
   * Pega o primeiro item da lista (clima atual aproximado)
   * list[0] normalmente representa o horário mais próximo
   */
  const datasNow = data?.list?.[0];
  const main = datasNow?.main ?? {};

  /**
   * Dados de localização
   */
  const cityName = location?.name ?? "--";
  const country = location?.country ?? "--";

  /**
   * Temperaturas formatadas
   * toFixed(0) é usado para arredondar sem quebrar caso seja undefined
   */
  const temp = main.temp?.toFixed?.(0) ?? "--";
  const tempFeelsLike = main.feels_like?.toFixed?.(0) ?? "--";
  const tempMin = main.temp_min?.toFixed?.(0) ?? "--";
  const tempMax = main.temp_max?.toFixed?.(0) ?? "--";

  /**
   * Dados complementares
   */
  const humidity = main.humidity ?? "--";
  const windSpeed = datasNow?.wind?.speed ?? "--";
  const visibility = datasNow?.visibility ?? "--";
  const clouds = datasNow?.clouds?.all ?? "--";
  const pressure = main.pressure ?? "--";

  /**
   * Volume de chuva nas últimas 3 horas
   * OpenWeather retorna em milímetros (mm)
   */
  const rain = datasNow?.rain?.["3h"] ?? 0;

  return (
    <section className={styles.dashboard}>
      {/* Localização */}
      <span>{cityName && country ? `${cityName}, ${country}` : cityName}</span>

      {/* Temperatura principal */}
      <div className={styles.dashboard__temp_container}>
        <p className={`${styles.dashboard__temp} ${jetBrainsMono.className}`}>
          {temp}
        </p>
        <span className={styles.dashboard__unit}>°C</span>
      </div>

      {/* Sensação térmica */}
      <p>
        Sensação térmica de{" "}
        <span className={styles.bold}>{tempFeelsLike}°C</span>
      </p>

      {/* Variação de temperatura */}
      <div className={styles.dashboard__tempVar}>
        <div
          className={`${styles.dashboard__tempVarIcon} ${styles.dashboard__tempVarIconBorder}`}>
          <ArrowUp size={16} color="red" />
          <span>{tempMax}°C</span>
        </div>

        <div className={styles.dashboard__tempVarIcon}>
          <ArrowDown size={16} color="#00aaff" />
          <span>{tempMin}°C</span>
        </div>
      </div>

      {/* Cards de informações complementares */}
      <section className={styles.dashboard__info}>
        {/* Umidade */}
        <div className={styles.dashboard__card}>
          <Droplet size={16} color="var(--color2)" />
          <div className={styles.dashboard__cardInfo}>
            <p>Umidade</p>
            <span>{humidity}%</span>
          </div>
        </div>

        {/* Vento */}
        <div className={styles.dashboard__card}>
          <Wind size={16} color="var(--color2)" />
          <div className={styles.dashboard__cardInfo}>
            <p>Vento</p>
            <span>{windSpeed} m/s</span>
          </div>
        </div>

        {/* Visibilidade */}
        <div className={styles.dashboard__card}>
          <Eye size={16} color="var(--color2)" />
          <div className={styles.dashboard__cardInfo}>
            <p>Visibilidade</p>

            {typeof visibility === "number" && visibility > 1000 ? (
              <span>{(visibility / 1000).toFixed(1)} km</span>
            ) : (
              <span>{visibility} m</span>
            )}
          </div>
        </div>

        {/* Nebulosidade */}
        <div className={styles.dashboard__card}>
          <Cloud size={16} color="var(--color2)" />
          <div className={styles.dashboard__cardInfo}>
            <p>Nebulosidade</p>
            <span>{clouds}%</span>
          </div>
        </div>

        {/* Pressão atmosférica */}
        <div className={styles.dashboard__card}>
          <Gauge size={16} color="var(--color2)" />
          <div className={styles.dashboard__cardInfo}>
            <p>Pressão</p>
            <span>{pressure} hPa</span>
          </div>
        </div>

        {/* Chuva últimas 3h */}
        <div className={styles.dashboard__card}>
          <Droplets size={16} color="var(--color2)" />
          <div className={styles.dashboard__cardInfo}>
            <p>Chuva (3h)</p>
            <span>{rain} mm</span>
          </div>
        </div>
      </section>
    </section>
  );
}
