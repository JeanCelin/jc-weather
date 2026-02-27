import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "./Search.module.css";
import useDebounce from "./hooks/useDebounce";
import { CloudSun, LucideSearch, MapPin, X } from "lucide-react";

export default function Search({
  handleCityInfo,
  handleGetUserCoordinates,
  isPending,
}) {
  //armazena conteúdo digitado no input
  const [inputContent, setInputContent] = useState("");
  const [cityInfo, setCityInfo] = useState([]);
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const debouncedValue = useDebounce(inputContent);

  //constra a manipulação do input(searchbar)
  const handleChange = (e) => {
    setInputContent(e.target.value);
  };

  const handleClearSearch = () => {
    setInputContent("");
    setCityInfo([]);
  };
  const handleSelectCity = async () => {
    await handleCityInfo(cityInfo);
    setCityName(cityInfo[0].name);
    setCountryName(cityInfo[0].country);
    handleClearSearch();
  };

  useEffect(() => {
    if (!debouncedValue) return;

    async function load() {
      const res = await axios.get(`/api/city?query=${debouncedValue}`);

      setCityInfo(res.data);
    }

    load();
  }, [debouncedValue]);

  const handleUserCoordinates = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
   
      handleGetUserCoordinates(latitude, longitude);
    });
  };

  return (
    <section className={styles.search__container}>
      <div className={styles.search__logoContainer}>
        <div className={styles.search__logo}>
          <CloudSun size={24} color="var(--color3)" />
        </div>
        <p className={styles.search__title}>JC Weather</p>
      </div>
      <div className={styles.search__ctas}>
        <div className={styles.search__content}>
          <div className={styles.search__inputWrapper}>
            <LucideSearch
              size={16}
              color="var(--color5)"
              className={styles.search__icon}
            />

            <label htmlFor="city-search" className={styles.visuallyHidden}>
              {isPending ? "Buscando Previsão..." : "Digite a Cidade..."}
            </label>

            <input
              id="city-search"
              type="text"
              disabled={isPending}
              placeholder={
                isPending ? "Buscando Previsão..." : "Digite a Cidade..."
              }
              value={inputContent}
              onChange={handleChange}
              className={styles.search__bar}
              autoComplete="off"
            />
          </div>
          <button
            type="button"
            className={styles.search__clear}
            onClick={handleClearSearch}
            aria-label="Clear search">
            <X size={16} aria-hidden="true" />
          </button>
          <ul className={styles.search__list}>
            {cityInfo.length > 0 &&
              cityInfo.map((data, index) => {
                return (
                  <li key={index} className={styles.search__listItem}>
                    <button
                      type="button"
                      onClick={() => handleSelectCity(data)}
                      className={styles.search__listButton}>
                      {data.name} {data.state ? `(${data.state})` : ""} -{" "}
                      {data.country}
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
        <button
          type="button"
          className={
            isPending
              ? styles.search__locationButtonDisabled
              : styles.search__locationButton
          }
          disabled={isPending}
          onClick={handleUserCoordinates}
          aria-label="Buscar clima do meu local atual">
          <MapPin
            size={16}
            color={isPending ? "var(--color0)" : "var(--color1)"}
            aria-hidden="true"
          />
          <span
            className={
              isPending
                ? styles.search__locationTextDisabled
                : styles.search__locationText
            }>
            Meu Local
          </span>
        </button>
      </div>
    </section>
  );
}
