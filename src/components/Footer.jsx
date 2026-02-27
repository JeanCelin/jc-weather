import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__wrapper}>

        <div className={styles.footer__links}>
          <a href="https://www.instagram.com/jeancelin_/" target="_blank">Instagram</a>
          <a href="https://jeancelin.vercel.app/" target="_blank">Portfólio</a>
          <a href="https://www.linkedin.com/in/jean-celin/" target="_blank">LinkedIn</a>
          <a href="https://github.com/JeanCelin" target="_blank">GitHub</a>
        </div>

        <p className={styles.footer__externalLinks}>
          Dados fornecidos pelas APIs:
          <a href="https://openweathermap.org/forecast5" target="_blank">
            {" "}Previsão de 5 Dias
          </a>
          {" "} &amp; 
          <a href="https://openweathermap.org/api/geocoding-api" target="_blank">
            {" "}API de Geocodificação
          </a>
          {" "}da OpenWeather.
        </p>

        <p className={styles.footer__note}>
          O código é livre para uso e modificação. Os direitos das APIs devem ser verificados diretamente com seus proprietários.
        </p>

        <p className={styles.footer__author}>
          Desenvolvido por Jean Celin, 2025
        </p>

      </div>
    </footer>
  );
}