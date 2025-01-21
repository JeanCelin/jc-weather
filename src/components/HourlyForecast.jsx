import Image from "next/image";
import styles from "./HourlyForecast.module.css";
import { useState } from "react";

export default function FormattedIcons({ elementsDaily }) {
  const [hourlyForecast, setHourlyForecast] = useState();

  useState(() => {
    console.log(elementsDaily);

    setHourlyForecast(
      elementsDaily.map((element, index) => {
        console.log(element);
        const elementTimestamp = element.dt;
        const elementDate = new Date(elementTimestamp * 1000);
        const iconCode = element.weather[0].icon;
        const iconSrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        const elementHour = elementDate.getHours().toString().padStart(2, "0");
        const elementMinutes = elementDate
          .getMinutes()
          .toString()
          .padStart(2, "0");
        const elementFormattedTime = `${elementHour}:${elementMinutes}`;
        const precipitation = (Number(element.pop) * 100).toFixed(2);

        return (
          <div
            key={index}
            onClick={() =>
              handleWeatherInfo(
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
              src={iconSrc}
              width={64}
              height={64}
              alt={element.weather[0].description}
            />
            <p>{element.weather[0].description}</p>
            <div>
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
      })
    );
  }, [elementsDaily]);
  return <div className={styles.teste}>HourlyForecast:{hourlyForecast}</div>;
}
