import "bootstrap-icons/font/bootstrap-icons.css";
import "../src/sass/main.css";
import "typeface-montserrat";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import BubblesWelcome from "./components/BubblesWelcome";
import BubblesRegister from "./components/BubblesRegister";
import BubblesLogin from "./components/BubblesLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={<BubblesWelcome />} />
        <Route path="/registration" element={<BubblesRegister />} />
        <Route path="/login" element={<BubblesLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
