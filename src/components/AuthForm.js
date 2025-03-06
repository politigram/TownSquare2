import React, { useState } from "react";
import { Box, TextField, Button, Typography, Modal } from "@mui/material";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../lib/firebase";

const AuthForm = ({ closeModal }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      try {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        alert("Account created! Please verify your email.");
        closeModal();
      } catch (error) {
        alert(error.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        alert("Logged in!");
        closeModal();
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <Modal open={true} onClose={closeModal}>
      <Box sx={{ width: 400, p: 3, bgcolor: "white", mx: "auto", mt: "20vh", borderRadius: 2 }}>
        <Typography variant="h6" textAlign="center">
          {isSignUp ? "Create an Account" : "Sign In"}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField name="email" label="Email" variant="outlined" required onChange={handleChange} />
          {isSignUp && <TextField name="username" label="Username" variant="outlined" required onChange={handleChange} />}
          <TextField name="password" label="Password" type="password" variant="outlined" required onChange={handleChange} />
          {isSignUp && (
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              variant="outlined"
              required
              onChange={handleChange}
            />
          )}
          <Button type="submit" variant="contained" color="primary">
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <Button onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthForm;
