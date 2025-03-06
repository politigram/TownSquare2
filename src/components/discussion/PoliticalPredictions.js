import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import styles from "../styles/PoliticalPredictions.module.css";

const PoliticalPredictions = () => {
  const predictions = [
    { question: "Will Candidate X win the 2025 election?", probability: "68%" },
    { question: "Will Congress pass Bill Y?", probability: "45%" },
    { question: "Will the Supreme Court rule on Z case?", probability: "52%" },
  ];

  return (
    <Box className={styles.predictionsContainer}>
      <Typography variant="h6">📊 Political Predictions</Typography>
      {predictions.map((prediction, index) => (
        <Card key={index} className={styles.predictionCard}>
          <CardContent>
            <Typography variant="body1">{prediction.question}</Typography>
            <Typography variant="h6" className={styles.probability}>
              {prediction.probability} chance
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PoliticalPredictions;
