import Head from "next/head";

import styles from "@/styles/Home.module.css";
import WeatherDataFetcher from "@/components/WeatherDataFetcher";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div >
      <Head>
        <title>JC Weather - Accurate Weather Forecast</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Get real-time and accurate weather forecasts with JC Weather. Check temperature, wind speed, humidity, and more for any location."
        />
        <meta
          name="keywords"
          content="weather, forecast, real-time weather, temperature, wind speed, humidity, JC Weather"
        />
        <meta name="author" content="Jean Celin" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Open Graph (Facebook, LinkedIn, etc.) */}
        <meta
          property="og:title"
          content="JC Weather - Accurate Weather Forecast"
        />
        <meta
          property="og:description"
          content="Stay updated with the most precise weather forecasts in real-time."
        />
        <meta property="og:image" content="/jc-weather.png" />
        <meta property="og:url" content="https://jc-weather.vercel.app/" />{" "}
        {/*alterar para o link certo*/}
        <meta property="og:type" content="website" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="JC Weather" />
        <meta
          name="twitter:description"
          content="Check real-time weather updates with JC Weather."
        />
        <meta name="twitter:image" content="/weather-banner.png" />
      </Head>
      <main className={styles.home}>
        <WeatherDataFetcher />
      </main>
    </div>
  );
}
