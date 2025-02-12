import styles from "@/styles/Home.module.css";
import API from "@/components/WeatherDataFetcher";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className={styles.home__container}>
      <main className={styles.home__mainContainer}>
        <API />
      </main>
      <Footer />
    </div>
  );
}
