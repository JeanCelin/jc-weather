import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Forecast.module.css";

export default function Forecast({ data, days = 3, updateStates }) {
  const itens = data.list;
  const [forecast, setForecast] = useState();
  const [group, setGroup] = useState([]);

  const handleInfo = (temp, wind, rain, snow, visibility, cloudness) => {
    if ((temp, wind, rain, snow, visibility, cloudness)) {
      updateStates(temp, wind, rain, snow, visibility, cloudness);
    }
    console.log(
      "Info clicked!",
      temp,
      wind,
      rain,
      snow,
      visibility,
      cloudness
      // eu estava fazendo o weatherconditions, temp, wind etc a voltar a funcionar
    );
  };

  // Separa os elementos por dias
  useEffect(() => {
    const groupedItems = {};

    itens.forEach((element) => {
      const elementTimestamp = element.dt;
      const elementDate = new Date(elementTimestamp * 1000);
      const elementDay = parseInt(
        elementDate.getDate().toString().padStart(2, "0")
      );
      if (!groupedItems[elementDay]) {
        groupedItems[elementDay] = [];
      }
      groupedItems[elementDay].push(element);
    });

    // Converte o objeto em array de objetos com day e elements
    const groupedArray = Object.entries(groupedItems).map(
      ([day, elements]) => ({
        day,
        elements,
      })
    );

    // Atualiza o estado com o array agrupado
    setGroup(groupedArray);
  }, [data]);

  // Separa os elementos por dias selecionados
  useEffect(() => {
    // Filtra apenas os dias selecionados
    const selectedGroup = group.slice(0, days);
    console.log(selectedGroup);

    // Transforma os itens em formato HTML para exibir no site
    setForecast(
      selectedGroup.map((element, index) => {
        const day = element.day;
        const elements = element.elements;

        let forecasts = elements.map((element, index) => {
          const elementTimestamp = element.dt;
          const elementDate = new Date(elementTimestamp * 1000);
          const iconCode = element.weather[0].icon;
          const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
          const elementHour = elementDate
            .getHours()
            .toString()
            .padStart(2, "0");
          const elementMinutes = elementDate
            .getMinutes()
            .toString()
            .padStart(2, "0");
          const elementFormattedTime = `${elementHour}:${elementMinutes}`;
          const precipitation = (Number(element.pop) * 100).toFixed(2);

          return (
            <div
              className={styles.forecast__content}
              key={index}
              onClick={() =>
                handleInfo(
                  element.main,
                  element.wind,
                  element.rain?.["3h"] || 0,
                  element.snow,
                  element.visibility,
                  element.clouds.all
                )
              }>
              <p>{elementFormattedTime}</p>
              <Image
                src={iconUrl}
                width={64}
                height={64}
                alt={element.weather[0].main}
              />
              <p className={styles.forecast__iconDescription}>
                {element.weather[0].description}
              </p>
              <div className={styles.forecast__precipitation}>
                <Image
                  src={"/water_drop.png"}
                  width={16}
                  height={16}
                  alt="water drop"
                />
                <p>{precipitation}%</p>
              </div>
            </div>
          );
        });
        console.log(forecasts);

        return (
          <section className={styles.forecast__container} key={index}>
            <section className={styles.forecast__day}>{day}</section>
            <section className={styles.forecast__elements}>{forecasts}</section>
          </section>
        );
      })
    );
  }, [group, days]);

  return <>{forecast}</>;
}
