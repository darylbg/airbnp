import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";

function App() {
  return (
    <div>
      <Header />
      <Homepage />
      <Footer />

      <Footer />
    </div>
  );
}

export default App;
