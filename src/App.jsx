import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import Friends from "./pages/friends";
import Notifications from "./pages/notifications";
import Saved from "./pages/saved";
import Groups from "./pages/groups";
import Pages from "./pages/pages";
import Browse from "./pages/browse";
import Profile from "./pages/profile";
import CheckLoginOrNot from "./pages/CheckLoginOrNot";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<CheckLoginOrNot><Home /></CheckLoginOrNot>} />
        <Route path="/friends" element={<CheckLoginOrNot><Friends /></CheckLoginOrNot>} />
        <Route path="/notifications" element={<CheckLoginOrNot><Notifications /></CheckLoginOrNot>} />
        <Route path="/saved" element={<CheckLoginOrNot><Saved /></CheckLoginOrNot>} />
        <Route path="/groups" element={<CheckLoginOrNot><Groups /></CheckLoginOrNot>} />
        <Route path="/pages" element={<CheckLoginOrNot><Pages /></CheckLoginOrNot>} />
        <Route path="/browse" element={<CheckLoginOrNot><Browse /></CheckLoginOrNot>} />
        <Route path="/profile" element={<CheckLoginOrNot><Profile /></CheckLoginOrNot>} />
      </Routes>
    </Router>
  );
}

export default App;