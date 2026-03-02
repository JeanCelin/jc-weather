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
  async function getWeather(lat = 51.5073509, lon = -0.1277583) {
    try {
      // function sleep(ms) {
      //   return new Promise((resolve) => setTimeout(resolve, ms));
      // }
      // await sleep(3000); // 10 segundos de atraso
      const response = await axios.get(
        `/api/weather?lat=${lat}&lon=${lon}&lang=pt`,
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  return { getWeather };
}
