import Image from "next/image";
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
  console.log(date.toLocaleString("en-US"));
  console.log(data.weather[0].id)
  return (
    <div>
      <h1>{data.name}</h1>
      <section>
        <p>{date.toString()}</p>
        <Image src={iconUrl} width={64} height={64} alt={data.weather[0].main}/>
        <p> {data.weather[0].description}</p>
      </section>
      <p>Temperatura: {data.main.temp}°C</p>
    </div>
  );
}
