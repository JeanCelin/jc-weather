import axios from "axios";

export default async function handler(req, res) {
  try {
    const { lat, lon, lang } = req.query;
    const key = process.env.OPENWEATHER_KEY;

    if (!lat || !lon || !lang || !key)
      throw new Error(`Erro nos parametros da API`);
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=${lang}`,
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar clima" });
  }
}
