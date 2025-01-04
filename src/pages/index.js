import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <header className={styles.home__header}>
        <Header />
      </header>
      <main
      className={styles.home__content}
      >Conteúdo</main>
    </>
  );
}
