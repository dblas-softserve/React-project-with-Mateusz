import styles from "./Header.module.css";

function Header({ onCurrentSubjectChange }) {
  return (
    <div className={styles.menu}>
      <span onClick={() => onCurrentSubjectChange("people")}>People</span>
      <span onClick={() => onCurrentSubjectChange("planets")}>Planets</span>
      <span onClick={() => onCurrentSubjectChange("starships")}>Starships</span>
    </div>
  );
}

export default Header;
