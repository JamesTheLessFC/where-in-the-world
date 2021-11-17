import styles from "../styles/CountryDetails.module.scss";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export default function CountryDetails({ data, borders, darkModeOn }) {
  const router = useRouter();
  return (
    <div className={`${styles.root} ${darkModeOn ? styles.root_dark : ""}`}>
      <button onClick={() => router.back()}>
        <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
        Back
      </button>
      <div className={styles.content}>
        <div className={styles.flag_container}>
          <Image
            src={data.flags.svg}
            alt={`${data.name} flag`}
            layout="fill"
            objectFit="contain"
            objectPosition="left top"
          />
        </div>
        <div className={styles.text_container}>
          <h2>{data.name.common}</h2>
          <div className={styles.details_container}>
            <div className={styles.details_group1_container}>
              <p>
                <span>Native Name:</span>{" "}
                {Object.values(data.name.nativeName)[0].common}
              </p>
              <p>
                <span>Population:</span> {data.population.toLocaleString()}
              </p>
              <p>
                <span>Region:</span> {data.region}
              </p>
              <p>
                <span>Sub Region:</span> {data.subregion}
              </p>
              <p>
                <span>Capital:</span> {data.capital}
              </p>
            </div>
            <div className={styles.details_group2_container}>
              <p>
                <span>Top Level Domain:</span> {data.tld}
              </p>
              <p>
                <span>Currencies:</span>{" "}
                {Object.values(data.currencies).map(
                  (currency, index) =>
                    currency.name +
                    (index + 1 === Object.values(data.currencies).length
                      ? ""
                      : ", ")
                )}
              </p>
              <p>
                <span>Languages:</span>{" "}
                {Object.values(data.languages).map(
                  (language, index) =>
                    language +
                    (index + 1 === Object.values(data.languages).length
                      ? ""
                      : ", ")
                )}
              </p>
            </div>
          </div>
          <h3>
            <span>Border Countries:</span>
            {!data.borders ? " None" : ""}
          </h3>
          <div className={styles.borders_container}>
            {data.borders &&
              data.borders.map((border) => (
                <button
                  key={border}
                  onClick={() => router.push(`/country/${border}`)}
                >
                  {borders[border]}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
