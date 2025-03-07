import { useState, useEffect } from "react";
import Image from "next/image";
import useLocationApi from "./hooks/useCitySearch";
import useDebounce from "./hooks/useDebounce"; // Importing debounce hook (Importando o hook de debounce)

import styles from "./Search.module.css";

export default function Search({ onCoordinatesFound }) {
  // State to store the location input value (Estado para armazenar o valor do input de localização)
  const [location, setLocation] = useState(""); 
  
  // State to store unique city suggestions (Estado para armazenar sugestões únicas de cidade)
  const [uniqueSuggestions, setUniqueSuggestions] = useState([]);
  
  // Using the custom hook to fetch cities (Usando o hook personalizado para buscar cidades)
  const { suggestions, fetchCities } = useLocationApi(); 

  // Debounced location state (Estado da localização com debounce aplicado)
  const debouncedLocation = useDebounce(location, 500); 
  
  // Calls API only after debounce delay (Chama a API somente após o tempo do debounce)
  useEffect(() => {
    if (debouncedLocation) {
      fetchCities(debouncedLocation);
    }
  }, [debouncedLocation]);

  // Updates location state when user types (Atualiza o estado de localização quando o usuário digita)
  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  // Clears the search input and suggestions (Limpa o campo de pesquisa e as sugestões)
  const handleClear = () => {
    setUniqueSuggestions([]);
    setLocation("");
  };

  // Selects a city from the suggestions list (Seleciona uma cidade da lista de sugestões)
  const handleSelect = (city) => {
    setLocation(city.name);
    
    onCoordinatesFound({
      name: city.name,
      state: city.state,
      country: city.country,
      lat: city.lat,
      lon: city.lon,
    });

    setUniqueSuggestions([]);
  };

  // Filters unique suggestions to avoid duplicates (Filtra sugestões únicas para evitar duplicatas)
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
      <h1 className={styles.search__title}>JC Weather</h1>
      <div className={styles.search__content}>
        <input
          type="text"
          placeholder="Enter city..."
          value={location}
          onChange={handleChange} // Calls handleChange when input changes (Chama handleChange quando o input muda)
          className={styles.search__bar}
          autoComplete="none"
        />

        {uniqueSuggestions.length > 0 && (
          <ul className={styles.search__list}>
            {uniqueSuggestions.map((city, index) => (
              <li
                key={index}
                onClick={() => handleSelect(city)} // Calls handleSelect when a city is clicked (Chama handleSelect quando uma cidade é clicada)
                className={styles.search__listItem}
              >
                {`${city.name} ${city.state ? `(${city.state})` : ""}, ${city.country}`}
              </li>
            ))}
          </ul>
        )}
        <div className={styles.search__clear} onClick={handleClear}>
          <Image src={"/clear.png"} width={16} height={16} alt="clear icon" />
        </div>
      </div>
    </section>
  );
}
