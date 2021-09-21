import styles from "../styles/Home.module.scss";
import HeadComponent from "../components/HeadComponent";
import AppBar from "../components/AppBar";
import SearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";
import Filter from "../components/Filter";
import Countries from "../components/Countries";
import axios from "axios";
import CountryDetails from "../components/CountryDetails";
import ErrorMessage from "../components/ErrorMessage";

export default function Home() {
  const [darkModeOn, setDarkModeOn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("Search for a country...");
  const [regions, setRegions] = useState({
    Africa: false,
    Americas: false,
    Asia: false,
    Europe: false,
    Oceania: false,
  });
  const [data, setData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [filteredResults, setFilteredResults] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let results = {};
    const search = searchTerm.trim();
    const filters = Object.entries(regions).every((entry) => {
      return !entry[1];
    })
      ? Object.keys(regions)
      : Object.keys(regions).filter((region) => {
          return regions[region];
        });
    Object.entries(data)
      .filter((entry) => {
        if (filters.length !== 5) {
          return filters.includes(entry[1].region);
        } else {
          return true;
        }
      })
      .filter((entry) => {
        if (search !== "" && search !== "Search for a country...") {
          return entry[1].name
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase());
        } else {
          return true;
        }
      })
      .forEach((entry) => {
        results[entry[1].alpha3Code] = entry[1];
      });
    setFilteredResults(results);
  }, [searchTerm, data, regions]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://restcountries.eu/rest/v2/all");
      const dataObject = {};
      response.data.forEach((country) => {
        dataObject[country.alpha3Code] = country;
      });
      setData(dataObject);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(true);
      setLoading(false);
    }
  };

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
      <HeadComponent />
      <AppBar darkModeOn={darkModeOn} toggleDarkMode={toggleDarkMode} />
      {!selectedCountry && (
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
      )}
      {error ? (
        <ErrorMessage darkModeOn={darkModeOn} />
      ) : selectedCountry ? (
        <CountryDetails
          data={data}
          setSelectedCountry={setSelectedCountry}
          selectedCountry={selectedCountry}
          darkModeOn={darkModeOn}
        />
      ) : (
        <Countries
          filteredResults={filteredResults}
          darkModeOn={darkModeOn}
          setSelectedCountry={setSelectedCountry}
          loading={loading}
        />
      )}
    </div>
  );
}
