import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Navbar from "./components/Navbar";
import BlogFeed from "./pages/BlogFeed";
import WriteBlog from "./pages/WriteBlog";
import BlogDetails from "./pages/BlogDetails";
import Profile from "./pages/Profile";
import EditBlog from "./pages/EditBlog";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { token, isLoading } = useContext(AuthContext);

  if (isLoading) return null;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/blogs" element={<BlogFeed />} />
        <Route path="/write" element={<WriteBlog />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/edit/:id" element={<EditBlog />} />
        <Route
          path="/profile"
          element={token ? <Profile /> : <Navigate to="/signin" />}
        />
      </Routes>
    </>
  );
};

export default App;
