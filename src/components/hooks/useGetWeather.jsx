import axios from "axios";
export function useGetWeather() {
  async function getWeather(lat = 51.5073509, lon = -0.1277583) {
    try {
      const response = await axios.get(`/api/weather?lat=${lat}&lon=${lon}`);

      return response.data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }

  return { getWeather };
}
