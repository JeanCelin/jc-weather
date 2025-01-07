import { useState } from "react";
import Image from "next/image";
import Temp from "./Temp";
import Wind from "./Wind";
import styles from "./Weather.module.css";

export default function Weather({ data, error, loading }) {
  //Testa a requisição e retorna se der erro
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  console.log(data);

  //Dados dos dias
  const dataElements = data.list;
  console.log(data.list);

  //Informações do tempo(cronológico) atual
  const today = new Date();
  const day = today.getDate().toString().padStart(2, "0");
  const hour = today.getHours().toString().padStart(2, "0");

  //Pega os dados de cada dia e mostra de acordo
  const [temp, setTemp] = useState({});
  const [wind, setWind] = useState({});
  const [showTemp, setShowTemp] = useState(false);
  const handleInfo = (temp, wind) => {
    setTemp(temp);
    setWind(wind);
    setShowTemp(true);
  };

  const getDay = dataElements.map((element, index) => {
    const iconCode = element.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Informações de tempo (Cronológio) dos elementos
    const elementTimestamp = element.dt;
    const elementDate = new Date(elementTimestamp * 1000);
    const elementDay = elementDate.getDate().toString().padStart(2, "0");
    const elementHour = elementDate.getHours().toString().padStart(2, "0");
    const elementMinutes = elementDate.getMinutes().toString().padStart(2, "0");
    const elementFormattedTime = `${elementHour}:${elementMinutes}`;
    // verifica se o dia do elemento é igual ao dia atual e se a hora atual é menor do que a do elemento e mostra se verdadeiro

    if (elementDay == day && hour < elementHour) {
      return (
        <>
          <section
            className={styles.weather__content}
            key={index}
            onClick={() => handleInfo(element.main, element.wind)}>
            <section className={styles.info__container}>
              <div className={styles.icon__container}>
                <p>{elementFormattedTime}</p>
                <Image
                  src={iconUrl}
                  width={64}
                  height={64}
                  alt={element.weather[0].main}
                />
                <p className={styles.icon__description}>
                  {element.weather[0].description}
                </p>
              </div>
            </section>
          </section>
        </>
      );
    }
  });

  return (
    <div className={styles.weather__container}>
      <h1 className={styles.weather__place}>{data.city.name}</h1>
      <div className={styles.weather__status}>
        <p className={styles.weather__day}>{day}</p>
        {getDay}
      </div>
      <section className={styles.weather__info}>
        {showTemp && (
          <>
            <Temp data={temp} />
            <Wind data={wind} />
          </>
        )}
      </section>
    </div>
  );
}
