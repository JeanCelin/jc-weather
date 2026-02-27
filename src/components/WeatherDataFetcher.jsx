import { useEffect, useState, useTransition } from "react";
import { useGetWeather } from "./hooks/useGetWeather";
import Forecast from "./Forecast";
import styles from "./WeatherDataFetcher.module.css";
import { Sun } from "lucide-react";

import Search from "./Search";
import Footer from "./Footer";
import Dashboard from "./Dashboard";

/**
 * -------------------------------------------------------------
 * WeatherDataFetcher Component
 * -------------------------------------------------------------
 * Responsável por:
 * - Buscar dados meteorológicos via API
 * - Controlar estado global da aplicação
 * - Atualizar localização selecionada
 * - Gerenciar transições de UI com useTransition
 * - Orquestrar Dashboard + Forecast
 *
 * Fluxo:
 * 1. Carrega clima padrão (Brasília)
 * 2. Permite busca por cidade
 * 3. Permite busca por geolocalização
 * 4. Atualiza os componentes filhos com novos dados
 */

export default function WeatherDataFetcher() {
  /**
   * -------------------------------------------------------------
   * Estados principais da aplicação
   * -------------------------------------------------------------
   */

  // Dados completos retornados pela API
  const [data, setData] = useState(null);

  // Mensagem de erro (caso a requisição falhe)
  const [errorMessage, setErrorMessage] = useState(null);

  // Informações da cidade exibida
  const [location, setLocation] = useState({});

  /**
   * Hook customizado responsável por buscar dados da API
   */
  const { getWeather } = useGetWeather();

  /**
   * useTransition
   * Permite atualizar dados sem travar a interface
   */
  const [isPending, startTransition] = useTransition();

  /**
   * -------------------------------------------------------------
   * Carrega clima padrão (Brasília) ao montar componente
   * -------------------------------------------------------------
   */
  useEffect(() => {
    async function fetchDefaultWeather() {
      try {
        const response = await getWeather(-15.793889, -47.882778);

        setData(response);

        setLocation({
          name: "Brasília",
          state: "DF",
          country: "BR",
        });
      } catch (error) {
        setErrorMessage("Failed to fetch default weather.");
      }
    }

    fetchDefaultWeather();
  }, []);

  /**
   * -------------------------------------------------------------
   * Atualiza dados quando o usuário seleciona uma cidade
   * -------------------------------------------------------------
   */
  const handleCityInfo = async (city) => {
    const { name, state, country, lat, lon } = city?.[0];

    setLocation({ name, state, country });

    if (!lat || !lon) return;

    const response = await getWeather(lat, lon);
    startTransition(async () => {
      setData(response);
    });
  };

  /**
   * -------------------------------------------------------------
   * Atualiza dados usando geolocalização do usuário
   * -------------------------------------------------------------
   */
  const handleGetUserCoordinates = async (latitude, longitude) => {
    if (!latitude || !longitude) return;

    startTransition(async () => {
      try {
        const response = await getWeather(latitude, longitude);

        setData(response);

        setLocation({
          name: response.city.name,
          state: response.city.state,
          country: response.city.country,
        });
      } catch (error) {
        setErrorMessage("Failed to fetch weather for your location.");
      }
    });
  };

  /**
   * -------------------------------------------------------------
   * Renderização principal
   * -------------------------------------------------------------
   */
  return (
    <div className={styles.main}>
      <Search
        handleCityInfo={handleCityInfo}
        handleGetUserCoordinates={handleGetUserCoordinates}
        isPending={isPending}
      />

      <section className={styles.main__wraper}>
        <section className={styles.weatherDataFetcher__head}>
          <div className={styles.weatherDataFetcher__icon}>
            <Sun size={18} color="var(--color3)" />
          </div>

          <div>
            <h1 className={styles.weatherDataFetcher__title}>
              {location.name ? location.name : "City name"}
              {location.state && ` (${location.state})`} -{" "}
              {location.country ? location.country : "Country"}
            </h1>

            <p>Previsão dos próximos dias</p>
          </div>
        </section>

        <section className={styles.main__content}>
          <div className={styles.main__dashboard}>
            <Dashboard data={data} location={location} />
          </div>

          <div className={styles.main__forecast}>
            {isPending ? (
              <div className={styles.loadingOverlay}>
                <div className={styles.loadingBox}>
                  <div className={styles.spinner}></div>
                  <p>Buscando previsão...</p>
                </div>
              </div>
            ) : (
              data && <Forecast data={data} location={location} />
            )}
          </div>
        </section>
      </section>

      <Footer />
    </div>
  );
}
