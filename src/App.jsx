import Header from "./components/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FlightsList from "./components/FlightsList/FlightsList";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<FlightsList />} />
      </Routes>
    </Router>
  );
}

export default App;
