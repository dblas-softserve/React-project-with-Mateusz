import { useState } from "react";
import People from "../Subjects/People/People";
import Planets from "../Subjects/Planets/Planets";
import Starships from "../Subjects/Starships/Starships";
import Header from "../Header/Header";
import styles from "./App.module.css";

function App() {
  const [subjectShown, changeSubject] = useState("people");

  const onCurrentSubjectChange = (subject) => {
    changeSubject(subject);
  };

  return (
    <div className={styles.subjectsWrapper}>
      <Header onCurrentSubjectChange={onCurrentSubjectChange} />
      <main className={styles.subjectsContainer}>
        {subjectShown === "people" && <People />}
        {subjectShown === "planets" && <Planets />}
        {subjectShown === "starships" && <Starships />}
      </main>
    </div>
  );
}

export default App;
