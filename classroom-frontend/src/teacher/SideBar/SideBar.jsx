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
          to="/teacherindexclass"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          Teacher Home
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
              <NavLink to="/teacherindexclass/teacherclass/1" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                Class 1
              </NavLink>
              <NavLink to="/teacherindexclass/teacherclass/2" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                Class 2
              </NavLink>
            </div>
          )}

        
         
             <NavLink to="/teacherindexclass/teacherallstudent" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                All Students
              </NavLink>
             
        </div>

        {/* <NavLink
          to="/indexclass/allteacher"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          Teachers
        </NavLink> */}

        <NavLink
          to="/teacherindexclass/teacherstudentenrollment"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          Student Enrollment
        </NavLink>

        {/* <NavLink
          to="/indexclass/teacherenrollment"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          Teacher Enrollment
        </NavLink> */}


        <NavLink
          to="/teacherindexclass/teacherusersetting"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          User Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;