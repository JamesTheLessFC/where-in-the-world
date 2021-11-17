import styles from "../../styles/Home.module.scss";
import HeadComponent from "../../components/HeadComponent";
import AppBar from "../../components/AppBar";
import { useState } from "react";
import axios from "axios";
import CountryDetails from "../../components/CountryDetails";
import ErrorMessage from "../../components/ErrorMessage";

export async function getStaticProps({ params }) {
  let error;
  let data;
  let borders = {};
  const { alpha } = params;
  try {
    data = await (
      await axios.get(`https://restcountries.com/v3.1/alpha/${alpha}`)
    ).data[0];
    const codes = data.borders.join();
    await (
      await axios.get(`https://restcountries.com/v3.1/alpha?codes=${codes}`)
    ).data.forEach((country) => {
      borders[country.cca3] = country.name.common;
    });
    error = false;
  } catch (err) {
    console.error(err);
    error = true;
    data = null;
  }
  return { props: { data, borders, error } };
}

export async function getStaticPaths() {
  const countries = await (
    await axios.get("https://restcountries.com/v3.1/all")
  ).data;
  return {
    paths: countries.map((country) => ({
      params: {
        alpha: country.cca3,
      },
    })),
    fallback: false,
  };
}

export default function CountryPage({ data, borders, error }) {
  const [darkModeOn, setDarkModeOn] = useState(false);

  const toggleDarkMode = () => {
    setDarkModeOn((prevState) => {
      return !prevState;
    });
  };

  return (
    <div
      className={`${styles.container} ${
        darkModeOn ? styles.container_dark : ""
      }`}
    >
      <HeadComponent title={data.name.common} />
      <AppBar darkModeOn={darkModeOn} toggleDarkMode={toggleDarkMode} />
      {error ? (
        <ErrorMessage darkModeOn={darkModeOn} />
      ) : (
        <CountryDetails data={data} borders={borders} darkModeOn={darkModeOn} />
      )}
    </div>
  );
}
