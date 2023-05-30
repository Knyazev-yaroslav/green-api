import React from "react";
import "./App.css";
import Header from "./shared/Header";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
