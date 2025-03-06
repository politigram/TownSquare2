import React from "react";
import styles from "./styles/SortingOptions.module.css";

const SortingOptions = ({ setSortBy }) => {
  return (
    <div className={styles.sortingOptions}>
      <button onClick={() => setSortBy("newest")}>📅 Newest</button>
      <button onClick={() => setSortBy("popular")}>🔥 Most Popular</button>
      <button onClick={() => setSortBy("controversial")}>⚖️ Controversial</button>
    </div>
  );
};

export default SortingOptions;
