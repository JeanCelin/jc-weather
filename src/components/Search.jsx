import { useState, useEffect } from "react";
import Image from "next/image";
import useLocationApi from "./API/useLocationApi"; // Importando o hook
import styles from "./Search.module.css";

export default function Search({ onCoordinatesFound }) {
  const [location, setLocation] = useState("");
  const [uniqueSuggestions, setUniqueSuggestions] = useState([]);
  const { suggestions, fetchCities } = useLocationApi();

  // Atualiza o estado e chama a API ao digitar
  const handleChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    fetchCities(value); // Chama a API
  };

  const handleClear = ()=>{
    setUniqueSuggestions([])
    setLocation("")

  }
  // Seleciona uma cidade da lista de sugestões
  const handleSelect = (city) => {
    setLocation(city.name);

    onCoordinatesFound({
      name: city.name,
      state: city.state,
      country: city.country,
      lat: city.lat,
      lon: city.lon,
    });

    setUniqueSuggestions([]); // Limpa as sugestões após a seleção
  };

  // Atualiza uniqueSuggestions sem duplicatas
  useEffect(() => {
    const seen = new Set();
    const filteredSuggestions = suggestions.filter((city) => {
      const cityKey = `${city.name}-${city.state}-${city.country}`;
      if (!seen.has(cityKey)) {
        seen.add(cityKey);
        return true;
      }
      return false;
    });

    setUniqueSuggestions(filteredSuggestions);
  }, [suggestions]);

  return (
    <section className={styles.search__container}>
      <h1 className={styles.search__title}>JS Weather</h1>
      <div className={styles.search__content}>
        <input
          type="text"
          placeholder="Digite a cidade..."
          value={location}
          onChange={handleChange}
          className={styles.search__bar}
        />

        {uniqueSuggestions.length > 0 && (
          <ul className={styles.search__list}>
            {uniqueSuggestions.map((city, index) => (
              <li
                key={index}
                onClick={() => handleSelect(city)}
                className={styles.search__listItem}>
                {`${city.name} ${city.state ? `(${city.state})` : ""}, ${city.country}`}
              </li>
            ))}
          </ul>
        )}
      <div className={styles.search__clear} onClick={()=>handleClear()}>
        <Image src={'/clear.png'} width={16} height={16} alt="clear icon"/>
      </div>
      </div>
    </section>
  );
}
