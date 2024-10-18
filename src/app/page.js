import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";

const About = () => {
  return (
    <>
      <br/>
     <div className="imgdiv"> <img src="logoexpense.png" alt="Expense Tracker Logo" className="imag"/></div>
      <Container>
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h3" gutterBottom>
            Welcome to the Expense Tracker
          </Typography>
          <Typography variant="body1" paragraph>
            This is the starting point of our amazing app. Here you can find
            information about our features and how to get started.
          </Typography>
          <Box sx={{ mt: 4 }}>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default About;
