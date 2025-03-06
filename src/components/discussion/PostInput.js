import React, { useState } from "react";
import styles from "./styles/PostInput.module.css";

const PostInput = ({ setPosts }) => {
  const [body, setBody] = useState("");

  const handlePost = async () => {
    if (!body.trim()) return;

    const response = await fetch("/api/discussions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body, userId: null, username: "Guest" }),
    });

    if (response.ok) {
      const newPost = await response.json();
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setBody("");
    }
  };

  return (
    <div className={styles.postInputContainer}>
      <textarea
        className={styles.postInput}
        placeholder="Share your thoughts..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button onClick={handlePost} className={styles.postButton}>Post</button>
    </div>
  );
};

export default PostInput;
