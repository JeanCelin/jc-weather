import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "./Search.module.css";
import useDebounce from "./hooks/useDebounce";
import { LucideSearch, MapPin } from "lucide-react";

export default function Search({ handleCityInfo, handleGetUserCoordinates }) {
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
      console.log("User coordinates:", latitude, longitude);
      handleGetUserCoordinates(latitude, longitude);
    });
  };

  return (
    <section className={styles.search__container}>
      <div>
        <p className={styles.search__title}>JC Weather</p>
        {cityName && (
          <p>
            {cityName}, {countryName}
          </p>
        )}
        {console.log(cityInfo)}
      </div>
      <div className={styles.search__ctas}>
        <div className={styles.search__content}>
          <div className={styles.search__inputWrapper}>
            <LucideSearch size={16} color="var(--color5)" className={styles.search__icon} />
            <input
              type="text"
              placeholder="Enter city..."
              value={inputContent}
              onChange={handleChange} // Calls handleChange when input changes (Chama handleChange quando o input muda)
              className={styles.search__bar}
              autoComplete="off"
            />
          </div>
          <div className={styles.search__clear} onClick={handleClearSearch}>
            <Image src={"/clear.png"} width={16} height={16} alt="clear icon" />
          </div>
          <ul className={styles.search__list}>
            {cityInfo.length > 0 &&
              cityInfo.map((data, index) => {
                return (
                  <li
                    key={index}
                    className={styles.search__listItem}
                    onClick={handleSelectCity}>
                    <p>
                      {data.name} {data.state}, {data.country}
                    </p>
                  </li>
                );
              })}
          </ul>
        </div>

        <button
          className={styles.search__locationButton}
          onClick={handleUserCoordinates}>
          <MapPin size={16} />
          Use my location
        </button>
      </div>
    </section>
  );
}
