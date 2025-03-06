import React from "react";
import { Box, Typography } from "@mui/material";
import styles from "../styles/Leaderboard.module.css";

const Leaderboard = () => {
  const users = [
    { name: "Alice", points: 120 },
    { name: "Bob", points: 95 },
    { name: "Charlie", points: 88 },
  ];

  return (
    <Box className={styles.leaderboardContainer}>
      <Typography variant="h6">🏆 Top Users</Typography>
      {users.map((user, index) => (
        <Typography key={index} className={styles.leaderboardItem}>
          {index + 1}. {user.name} ({user.points} pts)
        </Typography>
      ))}
    </Box>
  );
};

export default Leaderboard;
