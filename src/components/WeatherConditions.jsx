import { useEffect, useState } from "react";
import styles from "./WeatherConditions.module.css";

export default function WeatherConditions({
  rain,
  snow,
  visibility,
  cloudness,
}) {
  // stores if the respective data is available (armazena caso os respectivos dados estão disponiveis)
  const [isRain, setIsRain] = useState(false); 
  const [isSnow, setIsSnow] = useState(false); 
  const [isVisibility, setIsVisibility] = useState(false); 
  const [isCloudness, setIsCloudness] = useState(false); 


  // Updates the state based on the value provided (Atualiza o estado com base no valor fornecido)
  const updateConditionState = (value, setState) => {
    if (value !== undefined) {  // Checks if the value is not undefined (Verifica se o valor não é undefined)
      setState(true); // Sets the state to true (Define o estado como verdadeiro)
    }
  };

  useEffect(() => {
    // Updates the datas state
    updateConditionState(rain, setIsRain); 
    updateConditionState(snow, setIsSnow); 
    updateConditionState(visibility, setIsVisibility); 
    updateConditionState(cloudness, setIsCloudness); 
  }, [rain, snow, visibility, cloudness]);

  return (
    <section className={styles.weatherConditions__container}>
      <h3 className={styles.weatherConditions__title}>Weather Conditions</h3>
      {isRain && rain?.["3h"] !== undefined && <p>{`Rain vol for last 3h: ${rain["3h"]} mm`}</p>} {/* Displays rain volume for the last 3 hours (Exibe o volume de chuva nas últimas 3 horas) */}
      {isSnow && snow?.["3h"] !== undefined && <p>{`Snow vol for last 3h: ${snow["3h"]} mm`}</p>} {/* Displays snow volume for the last 3 hours (Exibe o volume de neve nas últimas 3 horas) */}
      {isVisibility && visibility !== undefined && <p>{`Visibility: ${visibility} metres`}</p>} {/* Displays visibility (Exibe a visibilidade) */}
      {isCloudness && cloudness !== undefined && <p>{`Cloudness: ${cloudness}%`}</p>} {/* Displays cloudiness percentage (Exibe a porcentagem de nuvens) */}
    </section>
  );
}
