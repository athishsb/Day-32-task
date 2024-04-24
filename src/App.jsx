import "./App.css";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import { Route, Routes, useLocation } from "react-router-dom";
import Shop from "./components/Shop";
import Header from "./components/Header"; 

function App() {
  const location = useLocation();

  return (
    <>
      <section className="sticky-top">
        <Navbar />
        {location.pathname === "/cart" && <Header />}
      </section>
      <Routes>
        <Route path="/" Component={Shop} />
        <Route path="/cart" Component={Cart} />
      </Routes>
    </>
  );
}

export default App;
