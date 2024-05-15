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
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={<BubblesWelcome />} />
        <Route path="/registration" element={<BubblesRegister />} />
        <Route path="/login" element={<BubblesLogin />} />
        <Route path="/" element={
          <>
          <MyNav />
          <Footer />
          </>
        } />
        <Route path="/me" element={
          <>
          <MyNav />
          <Profile />
          <Footer />
          </>
        } />
        <Route path="*" element={
          <>
          <MyNav />
          <NotFound />
          <Footer />
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
