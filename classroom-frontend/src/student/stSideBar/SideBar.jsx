import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Sidebar = () => {
  // const [teachingOpen, setTeachingOpen] = useState(false);
  const [learningOpen, setLearningOpen] = useState(false);
  const [allStudentOpen, setAllStudentOpen] = useState(false);
  const [classes, setClasses] = useState([]);

  // Fetch classes from backend
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/class/getByEmail/${localStorage.getItem("email")}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setClasses(response.data.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, []);


  

  return (
    <div className="w-64 bg-white shadow-lg min-h-screen font-normal text-black">
      <nav className="mt-4 ">
        {/* Home */}
        <NavLink
          to="/studentindexclass"
          className="block px-4 py-2  hover:bg-gray-200"
        >
          <span className="flex items-center gap-2">
            <svg
              className="text-black "
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="black"
            >
              <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
            </svg>
            <span>Home</span>
          </span>
        </NavLink>

        {/* Teaching Section */}
        <div>
          <button
            onClick={() => setLearningOpen(!learningOpen)}
            className="w-full flex justify-between items-center px-4 py-2 text-black hover:bg-gray-200"
          >
            <span className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="black"
              >
                <path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z" />
              </svg>
              Student Enrollment
            </span>
            <span
              className={`transition-transform ${learningOpen ? "rotate-180" : ""}`}
            >
              &#9660;
            </span>
          </button>
          {learningOpen && (
            <div className="pl-6">
              {classes.length > 0 ? (
                classes.map((cls) => (
                  <NavLink
                    key={cls.classId}
                    to={`/studentindexclass/studentclass/${cls.classId}`}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 text-black hover:bg-gray-200 ${
                        isActive ? "bg-gray-300 font-medium text-black" : ""
                      }`
                    }
                  >
                    <span className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="black"
                      >
                        <path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z" />
                      </svg>
                      {cls.className + " " + cls.subject}
                    </span>
                  </NavLink>
                ))
              ) : (
                <p className="px-4 py-2 text-gray-500">No classes available</p>
              )}
            </div>
          )}

         
        </div>


        <NavLink
          to="/studentindexclass/studentpayment"
          className="block px-4 py-2 hover:bg-gray-200"
        >
          <span className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="black"
            >
              <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
            </svg>
            Payment
          </span>
        </NavLink>
      
        <NavLink
          to="/studentindexclass/studentusersetting"
          className="block px-4 py-2 hover:bg-gray-200"
        >
          <span className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="black"
            >
              <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
            </svg>
            User Settings
          </span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
