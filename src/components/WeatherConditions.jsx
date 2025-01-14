import { useEffect, useState } from "react";
import styles from "./WeatherConditions.module.css";

export default function WeatherConditions({ rain, snow, visibility, cloudness }) {
  const [isRain, setIsRain] = useState(false);
  const [isSnow, setIsSnow] = useState(false);
  const [isVisibility, setIsVisibility] = useState(false);
  const [isCloudness, setIsCloudness] = useState(false);

  // Atualiza o estado com base no valor fornecido
  const updateConditionState = (name, value, setState) => {
    if (value) {
      setState(true);
    } else {
      console.log(`${name} not found. Hiding...`);
    }
  };

  useEffect(() => {
    updateConditionState("rain", rain, setIsRain);
    updateConditionState("snow", snow, setIsSnow);
    updateConditionState("visibility", visibility, setIsVisibility);
    updateConditionState("cloudness", cloudness, setIsCloudness);
  }, [rain, snow, visibility, cloudness]);

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
