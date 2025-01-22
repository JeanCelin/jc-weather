import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Weather.module.css";
import Temp from "./Temp";
import Wind from "./Wind";
import City from "./City";
import WeatherConditions from "./WeatherConditions";
import Forecast from "./Forecast";

export default function Weather({ data, errorMessage, isLoading }) {
  //Testa a requisição e retorforecastDaysCountna se der erro
  if (isLoading) return <p>Carregando...</p>;
  if (errorMessage) return <p>Erro: {errorMessage}</p>;

  console.log(data);
  const [forecastDaysCount, setForecastDaysCount] = useState(1);
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
  const toggleForecastDays = () => {
    if (forecastDaysCount <= 6) {
      daysCount++;
      setForecastDaysCount(daysCount);
      console.log(forecastDaysCount);
    }
  };
  //Informações do tempo(cronológico) atual
  return (
    <div className={styles.weather__container}>
      <h1 className={styles.weather__place}>{data.city.name}</h1>
      <div className={styles.weather__forecast}>
        <section className={styles.weather__status}>
          {/* Inserir o CurrentWeather Aqui! */}

          <Forecast
            data={data}
            days={forecastDaysCount}
            updateWeatherDetails={updateWeatherDetails}
          />
          <div
            className={styles.weather__plus}
            onClick={() => {
              toggleForecastDays();
            }}>
            <Image
              className={styles.weather__plusIcon}
              src="/add.png"
              width={24}
              height={24}
              alt="add icon"
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
