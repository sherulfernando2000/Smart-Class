import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Main from "./components/Main";
import IndexClass from "./components/Indexclass";

import ClassPage from "./components/pages/ClassPage";
import HomePage from "./components/pages/HomePage";



const App = () => {
  return (
    <Router>
      <div>
        
        {/* Routes define the main content for each route */}
        <Routes>
          {/* Home route */}
          <Route
            path="/"
            element={<Main/> }
          />

          {/* Login route */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* IndexClass with Sidebar & Dynamic Content */}
        <Route path="/indexclass/*" element={<IndexClass />}>
          <Route index element={<HomePage />} />
          <Route path="class/:id" element={<ClassPage />} />
        </Route>


        </Routes>

       
      </div>
    </Router>
  );
};

export default App;
