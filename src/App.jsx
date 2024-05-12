// import "bootstrap/dist/css/bootstrap.min.css";
import "../src/sass/main.css";
import "typeface-montserrat";
import "./App.css";
// import MyNav from "./components/MyNav";
import { Button } from "react-bootstrap";
import Bubbles from "./components/Bubbles";

function App() {
  return (
      <>
      {/* <MyNav /> */}
      <Button variant="secondary">Hello</Button>
      <Bubbles />
      </>
  );
}

export default App;
