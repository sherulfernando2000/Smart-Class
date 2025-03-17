import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [teachingOpen, setTeachingOpen] = useState(false);
  const [learningOpen, setLearningOpen] = useState(false);
  const [allStudentOpen, setAllStudentOpen] = useState(false);

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

          <button
            onClick={() => setAllStudentOpen(!allStudentOpen)}
            className="w-full flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            <span>Students</span>
          </button>
          {allStudentOpen && (
            <div className="pl-6">
              <NavLink to="/indexclass/allstudent" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                All Students
              </NavLink>
            </div>
          )}   
        </div>

        <NavLink
          to="/indexclass/usersetting"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          User Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;