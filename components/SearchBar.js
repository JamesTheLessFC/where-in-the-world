import styles from "../styles/SearchBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar({ searchTerm, setSearchTerm, darkModeOn }) {
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFocus = () => {
    if (searchTerm === "Search for a country...") {
      setSearchTerm("");
    }
  };

  const handleBlur = () => {
    if (searchTerm === "") {
      setSearchTerm("Search for a country...");
    }
  };

  return (
    <div className={`${styles.root} ${darkModeOn ? styles.root_dark : ""}`}>
      <FontAwesomeIcon icon={faSearch} className={styles.icon} />
      <input
        type="text"
        className={`${styles.input} ${
          searchTerm === "Search for a country..." ? styles.input_empty : ""
        }`}
        onChange={handleChange}
        value={searchTerm}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
}
