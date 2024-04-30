import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { context, server } from "./main";

function App() {
  const { setUser, setIsAuthenticated, setLoader } = useContext(context);

  useEffect(() => {
    setLoader(true);
    axios
      .get(`${server}/users/profile`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoader(false);
      })
      .catch((err) => {
        setUser({});
        setIsAuthenticated(false);
        setLoader(false);
      });
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
}

export default App;
