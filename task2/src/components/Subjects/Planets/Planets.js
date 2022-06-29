import { useState, useEffect } from "react";
import styles from "./Planets.module.css";
import AppService from "../../../services/sw-service";
import AppFunctions from "../../../util/common";
import DisplayError from "../../Error/Error";

const Planets = () => {
  const [planetData, changePlanetData] = useState({
    id: 0,
    info: null,
    error: null,
    planetImageUrl: null,
  });

  useEffect(() => {
    renderFirstPlanet();
  }, []);

  const nextPlanet = () => {
    AppService.fetchPlanets(planetData.id + 1)
      .then((planet) => {
        changePlanetData({
          id: planetData.id + 1,
          info: planet.data,
          error: null,
          planetImageUrl: `${AppFunctions.planetsBaseImageUrl}/${
            planetData.id + 1
          }.jpg`,
        });
      })
      .catch(() => {
        changePlanetData({
          id: 0,
          info: null,
          error: true,
          planetImageUrl: null,
        });
      });
  };

  const renderFirstPlanet = () => {
    AppService.fetchPlanets(1)
      .then((planet) => {
        changePlanetData({
          id: 1,
          info: planet.data,
          error: null,
          planetImageUrl:
            "https://starwars-visualguide.com/assets/img/planets/1.jpg",
        });
      })
      .catch(() => {
        changePlanetData({
          id: 0,
          info: null,
          error: true,
          planetImageUrl: null,
        });
      });
  };

  return (
    <div className={styles.planetContainer}>
      {planetData.error && <DisplayError />}
      {planetData.info && (
        <div>
          <img
            onError={AppFunctions.setDefaultImage}
            src={planetData.planetImageUrl}
            alt="star-wars-planet"
          ></img>
          <h3>{planetData.info.name}</h3>
          <ul>
            <li>Gravity: {planetData.info.gravity}</li>
            <li>Climate: {planetData.info.climate}</li>
            <li>Terrain: {planetData.info.terrain}</li>
          </ul>
        </div>
      )}

      <div className={styles.buttonContainer}>
        {planetData.error ? (
          <button onClick={renderFirstPlanet}>Back to the first</button>
        ) : (
          <button onClick={nextPlanet}>Next</button>
        )}
      </div>
    </div>
  );
};

export default Planets;
