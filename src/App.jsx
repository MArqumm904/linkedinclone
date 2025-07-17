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
import RouteLoader from "./components/preloader/RouteLoader"; 
import { PostsProvider } from './components/contexts/PostsContext';
import "./App.css";

function App() {
  return (
    <PostsProvider>
    <Router>
      <RouteLoader>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/pages" element={<Pages />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </RouteLoader>
    </Router>
    </PostsProvider>
  );
}

export default App;