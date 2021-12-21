import logo from './logo.svg';
import './App.css';
import { Container, Typography } from "@material-ui/core";
import Payment from "./components/Payment";
import React from 'react'

function App() {
  return (
    <Container maxWidth="md">
      <Typography gutterBottom variant="h2" align="center">
        Visagram
      </Typography>
      <Payment/>
    </Container>
  );
}

export default App;
