import styles from "../styles/Filter.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export default function Filter({ regions, toggleRegion, darkModeOn }) {
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleOutsideClick = () => {
      setShowDropdown(false);
    };
    setTimeout(() => {
      if (showDropdown) {
        window.addEventListener("click", handleOutsideClick);
      } else {
        window.removeEventListener("click", handleOutsideClick);
      }
    }, 0);
  }, [showDropdown]);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className={`${styles.root} ${darkModeOn ? styles.root_dark : ""}`}>
      <span>Filter by Region</span>
      <button onClick={toggleDropdown}>
        <FontAwesomeIcon
          icon={showDropdown ? faChevronUp : faChevronDown}
          className={styles.icon}
        />
      </button>
      <ul
        className={`${styles.list} ${showDropdown ? styles.list_visible : ""}`}
      >
        {Object.keys(regions).map((region) => (
          <li key={region}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleRegion(region);
              }}
            >
              <span>{region}</span>
              {regions[region] && <FontAwesomeIcon icon={faCheck} />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
