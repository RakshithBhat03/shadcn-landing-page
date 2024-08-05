import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Sellers from "./components/Sellers"; // Assuming you have a Sellers component
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sellers" element={<Sellers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
