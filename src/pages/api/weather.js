import axios from "axios";

export default async function handler(req, res) {
  const defaultLocation = { lat: -15.7797, lon: -47.9297 };

  const { lat, lon } = req.query;
  console.log(`API weather query: ${req.query}`);

  const key = process.env.OPENWEATHER_KEY;
  console.log(`API weather KEY: ${key}`);
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`,
    );

    console.log("response data:", response.data);

    res.status(200).json(response.data);
  } catch (error) {
    console.log(`API weather Error: ${error}`);
    res.status(500).json({ message: "Erro ao buscar clima" });
  }
}
