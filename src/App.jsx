import Header from "./components/Header/Header";
import SortFilters from "./components/Filters/SortFilters";
import FlightsList from "./components/FlightsList/FlightsList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./components/Hero/HeroSection";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HeroSection />} />
      </Routes>
    </Router>
  );
}

export default App;
