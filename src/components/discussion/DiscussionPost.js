import React from "react";
import styles from "./styles/DiscussionPost.module.css";

const DiscussionPost = ({ post }) => {
  return (
    <div className={styles.postContainer}>
      <h4>{post.username}</h4>
      <p>{post.body}</p>
    </div>
  );
};

export default DiscussionPost;
