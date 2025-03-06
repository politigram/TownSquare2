import React from "react";
import { Box, Modal, Typography, Button } from "@mui/material";

const AuthModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ backgroundColor: "white", padding: 3, borderRadius: 2 }}>
        <Typography variant="h5">Sign Up / Sign In</Typography>
        {/* Authentication Form Goes Here */}
        <Button onClick={onClose}>Close</Button>
      </Box>
    </Modal>
  );
};

export default AuthModal;
