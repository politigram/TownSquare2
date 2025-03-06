import React from "react";
import { Box, Typography } from "@mui/material";
import styles from "../styles/TrendingTopics.module.css";

const TrendingTopics = () => {
  const trending = ["#Election2024", "#Economy", "#PolicyDebate", "#ForeignAffairs"];

  return (
    <Box className={styles.trendingContainer}>
      <Typography variant="h6">📈 Trending Topics</Typography>
      {trending.map((topic, index) => (
        <Typography key={index} className={styles.trendingItem}>
          {topic}
        </Typography>
      ))}
    </Box>
  );
};

export default TrendingTopics;
