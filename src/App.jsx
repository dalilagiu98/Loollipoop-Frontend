import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-svg-core/styles.css"
import "../src/sass/main.css";
import "typeface-montserrat";
import "./App.css";
import BubblesWelcome from "./components/landingPages/BubblesWelcome"
import BubblesRegister from "./components/landingPages/BubblesRegister"
import BubblesLogin from "./components/landingPages/BubblesLogin"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import MyNav from "./components/MyNav"
import Profile from "./components/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={<BubblesWelcome />} />
        <Route path="/registration" element={<BubblesRegister />} />
        <Route path="/login" element={<BubblesLogin />} />
        <Route path="/" element={
          <MyNav />
        } />
        <Route path="/me" element={
          <>
          <MyNav />
          <Profile />
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
