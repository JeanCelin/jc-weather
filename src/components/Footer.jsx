import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>

        <div className={styles.footer__links}>
          <a href="https://www.instagram.com/jeancelin_/" target="_blank">Instagram</a>
          <a href="https://jeancelin.vercel.app/" target="_blank">Portfolio</a>
          <a href="https://www.linkedin.com/in/jean-celin/" target="_blank">LinkedIn</a>
          <a href="https://github.com/" target="_blank">GitHub</a>
        </div>
        <p className={styles.footer__externalLinks}>
          Data provided by the APIs:
          <a href="https://openweathermap.org/forecast5" target="_blank"> 5 Days Forecast</a>
          {" "}&amp;
          <a href="https://openweathermap.org/api/geocoding-api" target="_blank"> Geocoding API</a>
          {" "}from OpenWeather.
        </p>
        <p>
          The code is free for use and modification. API rights should be checked directly with the owners.
        </p>
        <p>Developed by Jean Celin, 2025</p>
      </div>
    </footer>
  );
}
