import { useState, useEffect } from "react";
import styles from "./People.module.css";
import AppService from "../../../services/sw-service";
import AppFunctions from "../../../util/common";
import DisplayError from "../../Error/Error";

const People = () => {
  const [personData, changePersonData] = useState({
    id: 0,
    info: null,
    error: null,
    personImageUrl: null,
  });

  useEffect(() => {
    renderFirstCharacter();
  }, []);

  const nextPerson = () => {
    AppService.fetchPeople(personData.id + 1)
      .then((character) => {
        changePersonData({
          id: personData.id + 1,
          info: character.data,
          error: null,
          personImageUrl: `${AppFunctions.peopleBaseImageUrl}/${
            personData.id + 1
          }.jpg`,
        });
      })
      .catch(() => {
        changePersonData({
          id: 0,
          info: null,
          error: true,
          personImageUrl: null,
        });
      });
  };

  const renderFirstCharacter = () => {
    AppService.fetchPeople(1)
      .then((character) => {
        changePersonData({
          id: 1,
          info: character.data,
          error: null,
          personImageUrl:
            "https://starwars-visualguide.com/assets/img/characters/1.jpg",
        });
      })
      .catch(() => {
        changePersonData({
          id: 0,
          info: null,
          error: true,
          personImageUrl: null,
        });
      });
  };

  return (
    <div className={styles.peopleContainer}>
      {personData.error && <DisplayError />}
      {personData.info && (
        <div>
          <img
            onError={AppFunctions.setDefaultImage}
            src={personData.personImageUrl}
            alt="star-wars-person"
          ></img>
          <h3>{personData.info.name}</h3>
          <ul>
            <li>Gender: {personData.info.gender}</li>
            <li>Birth year: {personData.info.birth_year}</li>
            <li>Eye color: {personData.info.eye_color}</li>
          </ul>
        </div>
      )}
      <div className={styles.buttonContainer}>
        {personData.error ? (
          <button onClick={renderFirstCharacter}>Back to the first</button>
        ) : (
          <button onClick={nextPerson}>Next</button>
        )}
      </div>
    </div>
  );
};

export default People;
