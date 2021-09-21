import styles from "../styles/AppBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { faMoon as faMoonSolid } from "@fortawesome/free-solid-svg-icons";

export default function AppBar({ darkModeOn, toggleDarkMode }) {
  return (
    <div className={`${styles.root} ${darkModeOn ? styles.root_dark : ""}`}>
      <h1>Where in the world?</h1>
      <button onClick={toggleDarkMode}>
        {darkModeOn ? (
          <FontAwesomeIcon icon={faMoonSolid} className={styles.icon} />
        ) : (
          <FontAwesomeIcon icon={faMoon} className={styles.icon} />
        )}{" "}
        Dark Mode
      </button>
    </div>
  );
}
