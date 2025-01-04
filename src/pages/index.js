import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import API from "@/components/API/API";

export default function Home() {
  return (
    <>
      <header className={styles.home__header}>
        <Header />
      </header>
      <main className={styles.home__content}>
        <API />
      </main>
    </>
  );
}
