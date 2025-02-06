import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Weather.module.css";
import Temp from "./Temp";
import Wind from "./Wind";
import City from "./City";
import WeatherConditions from "./WeatherConditions";
import Forecast from "./Forecast";
import CoordinatesAPI from "./API/CoordinatesAPI";

export default function Weather({ data, errorMessage, isLoading }) {
  //Testa a requisição e retorforecastDaysCountna se der erro
  if (isLoading) return <p>Carregando...</p>;
  if (errorMessage) return <p>Erro: {errorMessage}</p>;

  const [forecastDaysCount, setForecastDaysCount] = useState(5);
  const [city, setCity] = useState(data.city);
  const [temp, setTemp] = useState(data.list[0].main);
  const [wind, setWind] = useState(data.list[0].wind);
  const [rain, setRain] = useState(data.list[0].rain);
  const [snow, setSnow] = useState(data.snow);
  const [cloudness, setCloudness] = useState(data.list[0].clouds.all);
  const [visibility, setVisibility] = useState(data.list[0].visibility);

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
    setCity(data.city);
  }, [data]);

  //Verifica se os dias exibidos são 3 se não ao clicar exibe 5 e vise-versa
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
  //Informações do tempo(cronológico) atual
  return (
    <div className={styles.weather__container}>
      <CoordinatesAPI />
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
          <h2>Others Informations:</h2>
          <div className={styles.weather__info}>
            <Temp tempWeatherData={temp} />
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
