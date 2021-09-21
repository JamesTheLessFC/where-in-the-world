import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/Countries.module.scss";
import Country from "./Country";

export default function Countries({
  filteredResults,
  darkModeOn,
  setSelectedCountry,
  loading,
}) {
  if (loading) {
    return (
      <div className={styles.root_loading}>
        <FontAwesomeIcon
          icon={faSpinner}
          size="5x"
          className={`${styles.icon} fa-pulse`}
        />
      </div>
    );
  }
  return (
    <ul className={`${styles.root} ${darkModeOn ? styles.root_dark : ""}`}>
      {Object.keys(filteredResults).length === 0 ? (
        <li>
          <p>No results found.</p>
        </li>
      ) : (
        Object.entries(filteredResults).map((country) => (
          <Country
            key={country[1].alpha3Code}
            countryData={country[1]}
            darkModeOn={darkModeOn}
            setSelectedCountry={setSelectedCountry}
          />
        ))
      )}
    </ul>
  );
}
