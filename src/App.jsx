import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-svg-core/styles.css"
import "../src/sass/main.css";
import "leaflet/dist/leaflet.css"
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
import LooDetail from "./components/loos/LooDetail";
import SearchByPosition from "./components/searchPages/SearchByPosition";
import Settings from "./components/settings/Settings";
import SearchByAddress from "./components/searchPages/SearchByAddress";
import MyBookings from "./components/bookings/MyBookings";
import Advertising from "./components/advertising/Advertising";

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
        <Route path="/settings" element={
          <>
           <MyNav />
           <Settings />
           <Footer />
          </>
        } />
        <Route path="/bookings" element={
          <div className="d-flex flex-column h-100">
            <MyNav />
            <div className="flex-grow-1">
              <MyBookings />
            </div>
            <div>
            <Footer />
            </div>
          </div>
        } />
        <Route path="/advertising" element={
          <>
          <MyNav />
          <Advertising />
          <Footer />
          </>
        } />
        <Route path="/loo/:looId" element={
          <>
            <MyNav />
            <LooDetail />
            <Footer />
          </> 
        }/>
        <Route path="/searchByPosition" element={
          <>
            <MyNav />
            <SearchByPosition />
            <Footer />
          </>
        } />
        <Route path="/searchByAddress" element = {
          <div className="d-flex flex-column h-100">
            <MyNav />
            <div className="flex-grow-1">
              <SearchByAddress/>
            </div>
            <Footer />
          </div>
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
