import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [teachingOpen, setTeachingOpen] = useState(false);
  const [learningOpen, setLearningOpen] = useState(false);

  return (
    <div className="w-64 bg-white shadow-lg min-h-screen">
      <nav className="mt-4">
        {/* Home */}
        <NavLink
          to="/indexclass"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          Home
        </NavLink>

        {/* Teaching Section */}
        <div>
          <button
            onClick={() => setTeachingOpen(!teachingOpen)}
            className="w-full flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            <span>Teaching</span>
            <span className={`transition-transform ${teachingOpen ? "rotate-180" : ""}`}>&#9660;</span>
          </button>
          {teachingOpen && (
            <div className="pl-6">
              <NavLink to="/indexclass/class/1" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                Class 1
              </NavLink>
              <NavLink to="/indexclass/class/2" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                Class 2
              </NavLink>
            </div>
          )}
        </div>

        {/* Learning Section */}
        <div>
          <button
            onClick={() => setLearningOpen(!learningOpen)}
            className="w-full flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            <span>Learning</span>
            <span className={`transition-transform ${learningOpen ? "rotate-180" : ""}`}>&#9660;</span>
          </button>
          {learningOpen && (
            <div className="pl-6">
              <NavLink to="/indexclass/class/3" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                Class 3
              </NavLink>
              <NavLink to="/indexclass/class/4" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                Class 4
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
