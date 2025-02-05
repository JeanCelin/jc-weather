import Search from "./Search";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header__container}>
      <p className={styles.header__title}>JC WEATHER</p>
    </header>
  );
}
