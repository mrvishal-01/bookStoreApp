import React from "react";
import Home from "./Home/Home";
import Courses from "./Courses/Courses";
import { Navigate, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Contacts from "./Contacts/Contacts";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";

function App() {
    const [authUser, setAuthUser] = useAuth();
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route
           path = "/Course" element = {authUser ? <Courses /> : <Navigate to="/signup" />}
        />
        <Route path = "/Contact" element = {<Contacts />} />
        <Route path = "/Signup" element = {<Signup />} />
      </Routes>
      <Toaster />
      </div>
    </>
  );
}

export default App;