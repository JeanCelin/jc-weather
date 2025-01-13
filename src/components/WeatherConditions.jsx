import { useEffect, useState } from "react";
import styles from "./WeatherConditions.module.css";

export default function WeatherConditions({
  rain,
  snow,
  visibility,
  cloudness,
}) {
  const [isRain, setisRain] = useState(false);
  const [isSnow, setIsSnow] = useState(false);
  const [isVisibility, setIsVisibility] = useState(false);
  const [isCloudness, setIsCloudness] = useState(false);

  useEffect(() => {
    try {
      if (rain) {
        setisRain(true);
      }
      if (snow) {
        setIsSnow(true);
      }
      if (visibility) {
        setIsVisibility(true);
      }
      if (cloudness) {
        setIsCloudness(true);
      }
    } catch {
      console.log("sem dados");
    }
    console.log(rain);
    console.log(snow);
  }, [rain, snow, visibility]);
  return (
    <section className={styles.weatherConditions__container}>
      <h2 className={styles.weatherConditions__title}>Weather Conditions</h2>
      {isRain && <p>{`Rain vol for last 3h: ${rain["3h"]} mm`}</p>}
      {isSnow && <p>{`Snow vol for last 3h: ${snow["3h"]} mm`}</p>}
      {isVisibility && <p>{`Visibility: ${visibility} metres`}</p>}
      {isCloudness && <p>{`Cloudness: ${cloudness}%`}</p>}
    </section>
  );
}
