import axios from "axios";
import { useEffect, useState } from "react";
import Weather from "@/components/Weather";

export default function API() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    // Defina a URL da API que deseja consumir
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${apiKey}`
        );
        setData(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Bad request :(");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return <Weather data={data} error={error} loading={loading} />;
}