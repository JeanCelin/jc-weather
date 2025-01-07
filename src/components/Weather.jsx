import Image from "next/image";
import Temp from "./Temp";
import Wind from "./Wind";
import styles from "./Weather.module.css";

export default function Weather({ data, error, loading }) {
  //Testa a requisição e retorna se der erro
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  console.log(data);

  //Dados dos dias
  const dataDays = data.list;

  //Pega o dias de hoje
  const today = new Date().getDate();

  console.log(data.list);

  //Pega os dados de cada dia e mostra de acordo

  const getDay = dataDays.map((element) => {
    const iconCode = element.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const timestamp = element.dt;
    const date = new Date(timestamp * 1000);
    const day = date.getDate().toString().padStart(2, "0");

    // verifica se o dia é igual a 6 e mostra, se não, não mostra
    if (day == 8) {
      return (
        <>
          <section className={styles.weather__content}>
            <section className={styles.info__container}>
              <div className={styles.icon__container}>
                <Image
                  src={iconUrl}
                  width={64}
                  height={64}
                  alt={element.weather[0].main}
                />
                <p className={styles.icon__description}>
                  {element.weather[0].description}
                </p>
              </div>
            </section>
            <section className={styles.weather__info}>
              <Temp data={data} />
              <Wind data={data} />
            </section>
          </section>
        </>
      );
    }
  });

  return (
    <div className={styles.weather__container}>
      <h1 className={styles.weather__place}>{data.city.name}</h1>
      <div className={styles.weather__status}>
        <p className={styles.weather__day}>{today}</p>
        {getDay}
      </div>
    </div>
  );
}
