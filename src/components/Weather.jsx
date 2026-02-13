import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Weather.module.css";
import TemperatureInfo from "./TemperatureInfo";
import Wind from "./Wind";
import City from "./City";
import WeatherConditions from "./WeatherConditions";
import Forecast from "./Forecast";


export default function Weather({ data, errorMessage, isLoading, waiting }) {
// Tests the request and returns if there is an error (Testa a requisição e retorna se der erro)
  if (waiting)
    return <p className={styles.weather__userWarnings}>Waiting user location...</p>;
  if (isLoading)
    return <p className={styles.weather__userWarnings}>Carregando...</p>;
  if (errorMessage)
    return <p className={styles.weather__userWarnings}>Erro: {errorMessage}</p>;

  const [forecastDaysCount, setForecastDaysCount] = useState(5);   // Store the number of forecast days. Change here to change the amount of forecast days that are displayed when starting the site. (Armazene o número de dias previstos. Altere aqui para alterar a quantidade de dias previstos que são exibidos ao iniciar o site)

  const [city, setCity] = useState(data.city); // Stores city data (Armazena os dados da cidade)
  const [temp, setTemp] = useState(data.list[0].main); // Stores temperature data (Armazena os dados da temperatura)
  const [wind, setWind] = useState(data.list[0].wind); // Stores wind data (Armazena os dados do vento)
  const [rain, setRain] = useState(data.list[0].rain); // Stores rain data (Armazena os dados de chuva)
  const [snow, setSnow] = useState(data.snow); // Stores snow data (Armazena os dados de neve)
  const [cloudness, setCloudness] = useState(data.list[0].clouds.all); // Stores cloud coverage data (Armazena os dados de cobertura de nuvens)
  const [visibility, setVisibility] = useState(data.list[0].visibility); // Stores visibility data (Armazena os dados de visibilidade)




  // Updates weather details (Atualiza os detalhes do tempo)
  const updateWeatherDetails = (
    temp,
    wind,
    rain,
    snow,
    visibility,
    cloudness
  ) => {
    setTemp(temp);
    setWind(wind);
    setRain(rain);
    setSnow(snow);
    setCloudness(cloudness);
    setVisibility(visibility);
  };

  useEffect(() => {
    setCity(data.city); // Sets the city data when data changes (Define os dados da cidade quando os dados mudam)
  }, [data]);

  // Checks the number of days displayed: if it is less than 5, it increases to 5, and if it is greater than 1, it decreases to 1 (Verifica a quantidade de dias exibidos: se for menor que 5, incrementa até 5, e se for maior que 1, decrementa até 1)


  let daysCount = forecastDaysCount;
  const addForecastDays = () => {
    if (forecastDaysCount < 6) {
      daysCount++;
      setForecastDaysCount(daysCount);
    }
  };
  const removeForecastDays = () => {
    if (forecastDaysCount > 1) {
      daysCount--;
      setForecastDaysCount(daysCount);
    }
  };

  // Current weather information (Informações do tempo)
  return (
    <div className={styles.weather__container}>
  
      <div className={styles.weather__forecast}>
        <section className={styles.weather__status}>
          <Forecast
            data={data}
            days={forecastDaysCount}
            updateWeatherDetails={updateWeatherDetails}
          />

          <div className={styles.weather__interaction}>
            <Image
              className={styles.weather__icon}
              src={"/remove.png"}
              width={24}
              height={24}
              alt="remove icon"
              onClick={() => {
                removeForecastDays();
              }}
            />
            <Image
              className={styles.weather__icon}
              src="/add.png"
              width={24}
              height={24}
              alt="add icon"
              onClick={() => {
                addForecastDays();
              }}
            />
          </div>
        </section>

        <section className={styles.weather__infoContainer}>
          <h2 className={styles.weather__infoTitle}>Others Informations:</h2>
          <div className={styles.weather__info}>
            <TemperatureInfo tempWeatherData={temp} />
            <Wind windWeatherData={wind} />
            <City cityWeatherData={city} />
            <WeatherConditions
              rain={rain}
              snow={snow}
              visibility={visibility}
              cloudness={cloudness}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
