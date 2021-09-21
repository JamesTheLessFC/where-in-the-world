import styles from "../styles/Country.module.scss";
import Image from "next/image";

export default function Country({
  countryData,
  darkModeOn,
  setSelectedCountry,
}) {
  const selectCountry = () => {
    setSelectedCountry(countryData.alpha3Code);
  };

  return (
    <div
      className={`${styles.root} ${darkModeOn ? styles.root_dark : ""}`}
      onClick={selectCountry}
    >
      <div className={styles.flagContainer}>
        <Image
          className={styles.flag}
          src={countryData.flag}
          alt={`${countryData.name} flag`}
          layout="fill"
          objectFit="cover"
          objectPosition="left"
        />
      </div>
      <div className={styles.textContainer}>
        <h2>{countryData.name}</h2>
        <p>
          <span>Population:</span> {countryData.population.toLocaleString()}
        </p>
        <p>
          <span>Region:</span> {countryData.region}
        </p>
        <p>
          <span>Capital:</span> {countryData.capital}
        </p>
      </div>
    </div>
  );
}
