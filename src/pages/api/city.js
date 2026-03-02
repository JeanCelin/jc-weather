import axios from "axios";

export default async function handler(req, res) {
  try {
    const { query } = req.query;
    const key = process.env.OPENWEATHER_KEY;

    console.log("KEY EXISTS?", !!process.env.OPENWEATHER_KEY);
    if (!query || !key) throw new Error(`Erro nos parâmetros da API City`);

    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=10&appid=${key}`,
    );



    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar clima" });
  }
}
