import styles from "@/styles/Home.module.css";
import API from "@/components/API/API";

export default function Home() {
  return (
    <>
      <main className={styles.home__content}>
        <API />
      </main>
    </>
  );
}
