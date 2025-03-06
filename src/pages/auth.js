import React, { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Box, TextField, Button, Typography } from "@mui/material";
import styles from "../styles/Auth.module.css"; // Ensure this file exists

const AuthPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign Up & Sign In
  const [error, setError] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    setError(""); // Clear errors before attempting auth

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/"); // Redirect to Home after login/signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box className={styles.authContainer}>
      <Typography variant="h4">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
      {error && <Typography color="error">{error}</Typography>}
      
      <form onSubmit={handleAuth}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>
      </form>

      <Button onClick={() => setIsSignUp(!isSignUp)} sx={{ mt: 2 }}>
        {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
      </Button>
    </Box>
  );
};

export default AuthPage;
