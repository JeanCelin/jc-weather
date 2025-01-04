import Image from "next/image";
import styles from "./Weather.module.css";

export default function Weather({ data, error, loading }) {
  //Testa a requisição e retorna se der erro
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
  console.log(data);

  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  console.log(iconCode);
  return (
    <div>
      <h1>{data.name}</h1>
      <Image src={iconUrl} width={64} height={64} />
      <p>Temperatura: {data.main.temp}°C</p>
      <p>Descrição: {data.weather[0].description}</p>
    </div>
  );
}
