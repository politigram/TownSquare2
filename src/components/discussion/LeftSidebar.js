import React from "react";
import styles from "./styles/LeftSidebar.module.css";

const LeftSidebar = () => {
  return (
    <div className={styles.leftSidebar}>
      <button>🏛 Town Hall</button>
      <button>🍻 The Pub</button>
    </div>
  );
};

export default LeftSidebar;
