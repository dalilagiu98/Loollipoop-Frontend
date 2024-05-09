// import "bootstrap/dist/css/bootstrap.min.css";
import "../src/sass/main.css";
import "typeface-montserrat";
import "./App.css";
import MyNav from "./components/MyNav";
import { Button } from "react-bootstrap";

function App() {
  return (
      <>
      <MyNav />
      <Button variant="primary">Hello</Button>
      </>
  );
}

export default App;
