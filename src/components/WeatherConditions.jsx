import { useEffect, useState } from "react";
import styles from "./WeatherConditions.module.css";

export default function WeatherConditions({
  rain,
  snow,
  visibility,
  cloudness,
}) {
  const [isRain, setIsRain] = useState(false);
  const [isSnow, setIsSnow] = useState(false);
  const [isVisibility, setIsVisibility] = useState(false);
  const [isCloudness, setIsCloudness] = useState(false);

  // Atualiza o estado com base no valor fornecido
  const updateConditionState = (value, setState) => {
    if (value !== undefined) {  // Verifica se o valor não é undefined
      setState(true);
    }
  };

  useEffect(() => {
    updateConditionState(rain, setIsRain);
    updateConditionState(snow, setIsSnow);
    updateConditionState(visibility, setIsVisibility);
    updateConditionState(cloudness, setIsCloudness);
  }, [rain, snow, visibility, cloudness]);

  return (
    <section className={styles.weatherConditions__container}>
      <h3 className={styles.weatherConditions__title}>Weather Conditions</h3>
      {/* Condições só são exibidas se as variáveis correspondentes forem true */}
      {isRain && rain?.["3h"] !== undefined && <p>{`Rain vol for last 3h: ${rain["3h"]} mm`}</p>}
      {isSnow && snow !== undefined && <p>{`Snow vol for last 3h: ${snow} mm`}</p>}
      {isVisibility && visibility !== undefined && <p>{`Visibility: ${visibility} metres`}</p>}
      {isCloudness && cloudness !== undefined && <p>{`Cloudness: ${cloudness}%`}</p>}
    </section>
  );
}
