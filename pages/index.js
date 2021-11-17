import styles from "../styles/Home.module.scss";
import HeadComponent from "../components/HeadComponent";
import AppBar from "../components/AppBar";
import SearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";
import Filter from "../components/Filter";
import Countries from "../components/Countries";
import axios from "axios";
import ErrorMessage from "../components/ErrorMessage";

export async function getStaticProps(context) {
  let error;
  let data;
  try {
    data = await (await axios.get("https://restcountries.com/v3.1/all")).data;
    error = false;
  } catch (err) {
    console.error(err);
    error = true;
    data = null;
  }
  return { props: { data, error } };
}

export default function Home({ data, error }) {
  const [darkModeOn, setDarkModeOn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("Search for a country...");
  const [regions, setRegions] = useState({
    Africa: false,
    Americas: false,
    Asia: false,
    Europe: false,
    Oceania: false,
  });
  const [filteredResults, setFilteredResults] = useState(null);

  useEffect(() => {
    const search = searchTerm.trim();
    const filters = Object.entries(regions).every((entry) => {
      return !entry[1];
    })
      ? Object.keys(regions)
      : Object.keys(regions).filter((region) => {
          return regions[region];
        });
    const results = data
      .filter((country) => {
        if (filters.length !== 5) {
          return filters.includes(country.region);
        } else {
          return true;
        }
      })
      .filter((country) => {
        if (search !== "" && search !== "Search for a country...") {
          return (
            country.name.common
              .toLowerCase()
              .includes(searchTerm.trim().toLowerCase()) ||
            country.name.official
              .toLowerCase()
              .includes(searchTerm.trim().toLowerCase())
          );
        } else {
          return true;
        }
      });
    setFilteredResults(results);
  }, [searchTerm, data, regions]);

  const toggleDarkMode = () => {
    setDarkModeOn((prevState) => {
      return !prevState;
    });
  };

  const toggleRegion = (region) => {
    setRegions((prevState) => {
      return {
        ...prevState,
        [region]: !prevState[region],
      };
    });
  };

  return (
    <div
      className={`${styles.container} ${
        darkModeOn ? styles.container_dark : ""
      }`}
    >
      <HeadComponent title="Where In the World?" />
      <AppBar darkModeOn={darkModeOn} toggleDarkMode={toggleDarkMode} />
      <div className={styles.search_filter_container}>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          darkModeOn={darkModeOn}
        />
        <Filter
          regions={regions}
          toggleRegion={toggleRegion}
          darkModeOn={darkModeOn}
        />
      </div>
      {error ? (
        <ErrorMessage darkModeOn={darkModeOn} />
      ) : (
        <Countries data={filteredResults} darkModeOn={darkModeOn} />
      )}
    </div>
  );
}
