import React from "react";
import styles from "./styles/RightSidebar.module.css";

const RightSidebar = () => {
  return (
    <div className={styles.rightSidebar}>
      <div className={styles.trendingTopics}>
        <h3>📈 Trending Topics</h3>
        <p>#Election2024</p>
        <p>#PolicyDebate</p>
      </div>
      <div className={styles.leaderboard}>
        <h3>🏆 Top Users</h3>
        <p>1. Alice (120 pts)</p>
        <p>2. Bob (95 pts)</p>
      </div>
    </div>
  );
};

export default RightSidebar;
