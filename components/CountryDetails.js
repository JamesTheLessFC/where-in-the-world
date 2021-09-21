import styles from "../styles/CountryDetails.module.scss";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function CountryDetails({
  data,
  selectedCountry,
  darkModeOn,
  setSelectedCountry,
}) {
  const deselectCountry = () => {
    setSelectedCountry("");
  };

  const countryData = data[selectedCountry];

  return (
    <div className={`${styles.root} ${darkModeOn ? styles.root_dark : ""}`}>
      <button onClick={deselectCountry}>
        <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
        Back
      </button>
      <div className={styles.content}>
        <div className={styles.flag_container}>
          <Image
            src={countryData.flag}
            alt={`${countryData.name} flag`}
            layout="fill"
            objectFit="contain"
            objectPosition="left top"
          />
        </div>
        <div className={styles.text_container}>
          <h2>{countryData.name}</h2>
          <div className={styles.details_container}>
            <div className={styles.details_group1_container}>
              <p>
                <span>Native Name:</span> {countryData.nativeName}
              </p>
              <p>
                <span>Population:</span>{" "}
                {countryData.population.toLocaleString()}
              </p>
              <p>
                <span>Region:</span> {countryData.region}
              </p>
              <p>
                <span>Sub Region:</span> {countryData.subregion}
              </p>
              <p>
                <span>Capital:</span> {countryData.capital}
              </p>
            </div>
            <div className={styles.details_group2_container}>
              <p>
                <span>Top Level Domain:</span> {countryData.topLevelDomain}
              </p>
              <p>
                <span>Currencies:</span>{" "}
                {countryData.currencies.map(
                  (currency, index) =>
                    currency.name +
                    (index + 1 === countryData.currencies.length ? "" : ", ")
                )}
              </p>
              <p>
                <span>Languages:</span>{" "}
                {countryData.languages.map(
                  (language, index) =>
                    language.name +
                    (index + 1 === countryData.languages.length ? "" : ", ")
                )}
              </p>
            </div>
          </div>
          <h3>
            <span>Border Countries:</span>
            {countryData.borders.length === 0 ? " None" : ""}
          </h3>
          <div className={styles.borders_container}>
            {countryData.borders.map((border) => (
              <button key={border} onClick={() => setSelectedCountry(border)}>
                {data[border].name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
