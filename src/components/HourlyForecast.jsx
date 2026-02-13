import styles from "./HourlyForecast.module.css";
import { useEffect, useState } from "react";
import { getWeatherIconById } from "@/utils/weatherIcons";

export default function HourlyForecast({
  groupedWeatherData,
  day,
  updateWeatherDetails,
}) {
  const [hourlyForecast, setHourlyForecast] = useState();

  const formattedTime = (timeStamp) => {
    const date = new Date(timeStamp * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  };

  const handleWeatherInfo = (
    temp,
    wind,
    rain,
    snow,
    visibility,
    cloudness
  ) => {
    updateWeatherDetails(temp, wind, rain, snow, visibility, cloudness);
  };

  useEffect(() => {
    groupedWeatherData.forEach((element) => {
      if (element.day == day) {
        const data = element.elements;

        setHourlyForecast(
          data.map((e, index) => {
            const weather = e.weather[0];
            const Icon = getWeatherIconById(weather.id);

            return (
              <div
                key={index}
                className={styles.hourlyForecast__content}
                onClick={() =>
                  handleWeatherInfo(
                    e.main,
                    e.wind,
                    e.rain,
                    e.snow,
                    e.visibility,
                    e.clouds.all
                  )
                }
              >
                <p>{formattedTime(e.dt)}</p>

                <Icon size={42} />

                <p>{weather.description}</p>

                <div className={styles.hourlyForecast__preciptation}>
                  <img src="/water_drop.png" width={16} height={16} alt="water drop" />
                  <p>{parseInt(e.pop * 100)}%</p>
                </div>
              </div>
            );
          })
        );
      }
    });
  }, [groupedWeatherData, day]);

  return (
    <div className={styles.hourlyForecast__container}>{hourlyForecast}</div>
  );
}
