import { useState, useEffect } from "react";
import styles from "./Starships.module.css";
import AppService from "../../../services/sw-service";
import AppFunctions from "../../../util/common";
import DisplayError from "../../Error/Error";

const Starships = () => {
  const [starshipData, changeStarshipData] = useState({
    id: 0,
    info: null,
    error: null,
    starshipImageUrl: null,
  });

  useEffect(() => {
    renderFirstStarship();
  }, []);

  const nextStarship = () => {
    AppService.fetchStarships(starshipData.id + 1)
      .then((starship) => {
        changeStarshipData({
          id: starshipData.id + 1,
          info: starship.data,
          error: null,
          starshipImageUrl: `${AppFunctions.starshipsBaseImageUrl}/${
            starshipData.id + 1
          }.jpg`,
        });
      })
      .catch(() => {
        changeStarshipData({
          id: 0,
          info: null,
          error: true,
          starshipImageUrl: null,
        });
      });
  };

  const renderFirstStarship = () => {
    AppService.fetchStarships(2).then((character) => {
      changeStarshipData({
        id: 2,
        info: character.data,
        error: null,
        starshipImageUrl:
          "htpst://starwars-visualguide.com/assets/img/starships/2.jpg",
      });
    });
  };

  return (
    <div className={styles.starshipsContainer}>
      {starshipData.error && <DisplayError />}
      {starshipData.info && (
        <div>
          <img
            onError={AppFunctions.setDefaultImage}
            src={starshipData.starshipImageUrl}
            alt="star-wars-starship"
          ></img>
          <h3>{starshipData.info.name}</h3>
          <ul>
            <li>Model: {starshipData.info.model}</li>
            <li>Manufacturer: {starshipData.info.manufacturer}</li>
            <li>Cost in credits: {starshipData.info.cost_in_credits}</li>
          </ul>
        </div>
      )}

      <div className={styles.buttonContainer}>
        {starshipData.error ? (
          <button onClick={renderFirstStarship}>Back to the first</button>
        ) : (
          <button onClick={nextStarship}>Next</button>
        )}
      </div>
    </div>
  );
};

export default Starships;
