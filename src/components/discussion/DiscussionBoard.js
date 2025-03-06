import React, { useState, useEffect } from "react";
import PostInput from "./PostInput";
import DiscussionPost from "./DiscussionPost";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import SortingOptions from "./SortingOptions";
import styles from "./components/DiscussionBoard.module.css";

const DiscussionBoard = () => {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState("newest"); // Sorting state

  useEffect(() => {
    fetch(`/api/discussions?sort=${sortBy}`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, [sortBy]);

  return (
    <div className={styles.discussionContainer}>
      <LeftSidebar />
      <div className={styles.mainContent}>
        <PostInput setPosts={setPosts} />
        <SortingOptions setSortBy={setSortBy} />
        {posts.length > 0 ? (
          posts.map((post) => <DiscussionPost key={post.id} post={post} />)
        ) : (
          <p>No discussions yet. Start the conversation!</p>
        )}
      </div>
      <RightSidebar />
    </div>
  );
};

export default DiscussionBoard;
