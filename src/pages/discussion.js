import { Box } from "@mui/material";
import LeftSidebar from "../discussion/LeftSidebar";
import DiscussionBoard from "../discussion/DiscussionBoard";
import TrendingTopics from "../discussion/TrendingTopics";
import Leaderboard from "../discussion/Leaderboard";
import PoliticalPredictions from "../discussion/PoliticalPredictions";
import styles from "../components/discussion/styles/Discussion.module.css";

const DiscussionPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("new");
  const [selectedSection, setSelectedSection] = useState("townHall");

  return (
    <Box className={styles.container}>
      {/* ✅ Left Sidebar */}
      <Box className={styles.leftSidebar}>
        <LeftSidebar 
          selectedFilter={selectedFilter} 
          setSelectedFilter={setSelectedFilter} 
          selectedSection={selectedSection} 
          setSelectedSection={setSelectedSection} 
        />
      </Box>

      {/* ✅ Main Discussion Feed */}
      <Box className={styles.mainContent}>
        <DiscussionBoard filter={selectedFilter} section={selectedSection} />
      </Box>

      {/* ✅ Right Sidebar (No Duplicates) */}
      <Box className={styles.rightSidebar}>
        <TrendingTopics />
        <Leaderboard />
        <PoliticalPredictions />
      </Box>
    </Box>
  );
};

export default DiscussionPage;
