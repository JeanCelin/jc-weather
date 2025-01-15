import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Weather.module.css";
import Temp from "./Temp";
import Wind from "./Wind";
import Sun from "./City";
import WeatherConditions from "./WeatherConditions";
import Forecast from "./Forecast";

export default function Weather({ data, error, loading }) {
  //Testa a requisição e retorna se der erro
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  console.log(data);

  const [city, setCity] = useState(data.city);
  const [temp, setTemp] = useState(data.list[0].main);
  const [wind, setWind] = useState(data.list[0].wind);
  const [rain, setRain] = useState(data.list[0].rain);
  const [snow, setSnow] = useState(data.snow);
  const [cloudness, setCloudness] = useState(data.list[0].clouds.all);
  const [visibility, setVisibility] = useState(data.list[0].visibility);
  const [showTemp, setShowTemp] = useState(true);

  const updateStates = (temp, wind, rain, snow, visibility, cloudness) => {
    setTemp(temp);
    setWind(wind);
    setShowTemp(true);
    setRain(rain);
    setSnow(snow);
    setCloudness(cloudness);
    setVisibility(visibility);
    setShowTemp(true);
  };

  useEffect(() => {
    setCity(data.city);
  }, [data]);

  //Informações do tempo(cronológico) atual
  return (
    <div className={styles.weather__container}>
      <h1 className={styles.weather__place}>{data.city.name}</h1>
      <div className={styles.weather__status}>
        <Forecast data={data} updateStates={updateStates} />
      </div>
      <section className={styles.weather__info}>
        {showTemp && (
          <>
            <Temp data={temp} />
            <Wind data={wind} />
            <Sun data={city} />
            <WeatherConditions
              rain={rain}
              snow={snow}
              visibility={visibility}
              cloudness={cloudness}
            />
          </>
        )}
      </section>
    </div>
  );
}
