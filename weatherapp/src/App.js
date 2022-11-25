import "./App.css";
import Header from "./components/header/Header";
import Tab from "./components/tab/Tab";
import Favourite from "./pages/Favourite/Favourite";
import Home from "./pages/home/Home";
import Recent from "./pages/recent/Recent";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Header />
      <Tab />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fav" element={<Favourite />} />
        <Route path="/rec" element={<Recent />} />
      </Routes>
    </div>
  );
}

export default App;
