import axios from "axios";
import { useEffect, useState } from "react";
import Weather from "@/components/Weather";

export default function API() {
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    // Defina a URL da API que deseja consumir
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=-20.60&lon=-41.20&appid=${apiKey}&units=metric`
        );
        setData(response.data);
      } catch (err) {
        setErrorMessage("Bad request :(");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return <Weather data={data} errorMessage={errorMessage} isLoading={isLoading} />;
}
