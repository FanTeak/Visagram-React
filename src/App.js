import logo from './logo.svg';
import './App.css';
import { Container, Typography } from "@material-ui/core";
import Payment from "./components/Payment";

function App() {
  return (
    <Container maxWidth="md">
      <Typography gutterBottom variant="h2" align="center">
        Visagram App
      </Typography>
      <Payment/>
    </Container>
  );
}

export default App;
