import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/ErrorMessage.module.scss";

export default function ErrorMessage({ darkModeOn }) {
  return (
    <div className={`${styles.root} ${darkModeOn ? styles.root_dark : ""}`}>
      <FontAwesomeIcon
        icon={faExclamationCircle}
        size="5x"
        className={styles.icon}
      />
      <h1>Oops...</h1>
      <p>Something went wrong.</p>
    </div>
  );
}
