import Image from "next/image";
import Temp from "./Temp";
import Wind from "./Wind";
import styles from "./Weather.module.css";

export default function Weather({ data, error, loading }) {
  //Testa a requisição e retorna se der erro
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
  console.log(data);

  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const timestamp = data.dt;
  const date = new Date(timestamp * 1000);
  const day = date.getDate().toString().padStart(2, "0");

  console.log(date.toLocaleString("en-US"));
  console.log(date.getDay());
  console.log(data.weather[0].id);

  return (
    <div className={styles.weather__container}>
      <h1 className={styles.weather__place}>{data.name}</h1>
      <section className={styles.weather__content}>
        <section className={styles.info__container}>
          <p className={styles.info__day}>{day}</p>
          <div className={styles.icon__container}>
            <Image
              src={iconUrl}
              width={64}
              height={64}
              alt={data.weather[0].main}
            />
            <p className={styles.icon__description}>
              {" "}
              {data.weather[0].description}
            </p>
          </div>
        </section>
        <Temp data={data} />
        <Wind data={data}/>
      </section>


    </div>
  );
}
