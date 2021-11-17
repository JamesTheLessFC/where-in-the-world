import styles from "../styles/Country.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Country({ countryData, darkModeOn }) {
  const router = useRouter();
  const selectCountry = () => {
    router.push(`/country/${countryData.cca3}`);
  };

  return (
    <div
      className={`${styles.root} ${darkModeOn ? styles.root_dark : ""}`}
      onClick={selectCountry}
    >
      <div className={styles.flagContainer}>
        <Image
          className={styles.flag}
          src={countryData.flags.svg}
          alt={`${countryData.name.common} flag`}
          layout="fill"
          objectFit="cover"
          objectPosition="left"
        />
      </div>
      <div className={styles.textContainer}>
        <h2>{countryData.name.common}</h2>
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
