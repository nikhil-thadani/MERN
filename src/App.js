import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Welcome from "./Welcome";

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <React.Fragment>
      <Header isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/user/:id" element={<Welcome />} />
        {!isLoggedIn && (
          <>
            {" "}
            <Route path="/login" element={<Login />} exact />
            <Route path="/signup" element={<Signup />} exact />
          </>
        )}
      </Routes>
    </React.Fragment>
  );
}

export default App;
