import axios from "axios";

/**
 * Hook responsável por buscar dados meteorológicos
 * através da rota interna /api/weather.
 *
 * Retorna a função getWeather, que recebe latitude e longitude
 * e devolve os dados processados da API.
 */
export function useGetWeather() {
  /**
   * Busca a previsão do tempo com base nas coordenadas.
   *
   * @param {number} lat - Latitude da localização
   * @param {number} lon - Longitude da localização
   * @returns {Promise<Object>} Dados meteorológicos retornados pela API
   */
  async function getWeather(lat = -15.793889, lon = -47.882778) {
    try {
      // function sleep(ms) {
      //   return new Promise((resolve) => setTimeout(resolve, ms));
      // }
      // await sleep(3000); // 10 segundos de atraso
      const response = await axios.get(
        `/api/weather?lat=${lat}&lon=${lon}&lang=pt`,
      );
      const coordinates = [lat, lon];
      localStorage.setItem("coordinates", JSON.stringify(coordinates));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  return { getWeather };
}
