import "./App.css";
import { useState } from "react";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [title, setTitle] = useState("");
  const [pricesRange, setPricesRange] = useState([10, 100]);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 7, sameSite: "strict" });
    } else {
      Cookies.remove("token");
    }
    setToken(token);
  };

  return (
    <Router>
      <Header
        token={token}
        setToken={setToken}
        handleToken={handleToken}
        title={title}
        setTitle={setTitle}
        pricesRange={pricesRange}
        setPricesRange={setPricesRange}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              title={title}
              setTitle={setTitle}
              pricesRange={pricesRange}
              setPricesRange={setPricesRange}
            />
          }
        />
        <Route path="/offer/:id" element={<Offer />} />
        <Route
          path="/signup"
          element={<Signup setToken={setToken} handleToken={handleToken} />}
        />
        <Route
          path="/login"
          element={<Login setToken={setToken} handleToken={handleToken} />}
        />
        <Route path="/publish" element={<Publish />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}
export default App;
