import styles from "./Wind.module.css";

export default function Wind({ data }) {
  const degrees = data.deg; // Pega a direção na API


  // Função para determinar a direção do vento
  const getWindDirection = (degrees) => {
    if (degrees >= 337.5 || degrees < 22.5) {
      return "North (N)";
    } else if (degrees >= 22.5 && degrees < 67.5) {
      return "Northeast (NE)";
    } else if (degrees >= 67.5 && degrees < 112.5) {
      return "East (E)";
    } else if (degrees >= 112.5 && degrees < 157.5) {
      return "Southeast (SE)";
    } else if (degrees >= 157.5 && degrees < 202.5) {
      return "South (S)";
    } else if (degrees >= 202.5 && degrees < 247.5) {
      return "Southwest (SW)";
    } else if (degrees >= 247.5 && degrees < 292.5) {
      return "West (W)";
    } else if (degrees >= 292.5 && degrees < 337.5) {
      return "Northwest (NW)";
    } else {
      return "Something went wrong";
    }
  };
  // Determina a direção do vento com base no grau
  const windDirection = getWindDirection(degrees);

  return (
    <section className={styles.wind__container}>
      <h2 className={styles.wind__title}>Wind</h2>
      <p className={styles.wind_direction}>Direction: {windDirection}</p>
      <p className={styles.wind__speed}>Speed: {data.speed} m/s</p>
      <p className={styles.wind__gust}>Wind Gust: {data.gust} m/s</p>
    </section>
  );
}
