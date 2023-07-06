import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import Homepage from './pages/Homepage'


function App() {
  return (
  <div>
    <Header />
    <Homepage />

    <Footer />
  </div>
  );
}


export default App;
