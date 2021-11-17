import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/Countries.module.scss";
import Country from "./Country";

export default function Countries({ darkModeOn, setSelectedCountry, data }) {
  if (!data) {
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
      {data.length === 0 ? (
        <li>
          <p>No results found.</p>
        </li>
      ) : (
        data.map((country) => (
          <Country
            key={country.cca3}
            countryData={country}
            darkModeOn={darkModeOn}
            setSelectedCountry={setSelectedCountry}
          />
        ))
      )}
    </ul>
  );
}
