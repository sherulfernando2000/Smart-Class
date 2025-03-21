import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaChalkboardTeacher,
  FaUsers,
  FaUserGraduate,
  FaUserPlus,
  FaCogs,
  FaUserFriends,
  FaCopyright 
} from "react-icons/fa";

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
          className="flex items-center gap-2 px-4 py-2 text-black hover:bg-gray-200"  
        >
          <span className="flex items-center gap-2">
            <svg className="text-black "xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
            <span>Home</span>
          </span>
        </NavLink>

        {/* Teaching Section */}
        <div>
          <button
            onClick={() => setTeachingOpen(!teachingOpen)}
            className="w-full flex justify-between items-center px-4 py-2  text-black hover:bg-gray-200"
          >
            <span className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"/></svg>
              <span>Teaching</span>
            </span>
            <span
              className={`transition-transform ${teachingOpen ? "rotate-180" : ""}`}
            >
              &#9660;
            </span>
          </button>
          {teachingOpen && (
            <div className="pl-6">
              <NavLink
                to="/indexclass/class/1"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 text-black hover:bg-gray-200 ${
                    isActive ? "bg-gray-300 font-medium text-black" : ""
                  }`
                }
              >
                <span className="flex items-center gap-2">
                <FaCopyright />
                Class 1
                </span>
              </NavLink>
              <NavLink
                to="/indexclass/class/2"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 text-black hover:bg-gray-200 ${
                    isActive ? "bg-gray-300 font-medium text-black" : ""
                  }`
                }
              >
                <span className="flex items-center gap-2">
                <FaCopyright />
                Class 2
                </span>
              </NavLink>
              
            </div>
          )}
        </div>
        <div >
          <NavLink
            to="/indexclass/allstudent"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 text-black hover:bg-gray-200 ${
                isActive ? "bg-gray-300 font-medium text-black" : ""
              }`
            }
          >
            <span className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M411-480q-28 0-46-21t-13-49l12-72q8-43 40.5-70.5T480-720q44 0 76.5 27.5T597-622l12 72q5 28-13 49t-46 21H411Zm24-80h91l-8-49q-2-14-13-22.5t-25-8.5q-14 0-24.5 8.5T443-609l-8 49ZM124-441q-23 1-39.5-9T63-481q-2-9-1-18t5-17q0 1-1-4-2-2-10-24-2-12 3-23t13-19l2-2q2-19 15.5-32t33.5-13q3 0 19 4l3-1q5-5 13-7.5t17-2.5q11 0 19.5 3.5T208-626q1 0 1.5.5t1.5.5q14 1 24.5 8.5T251-596q2 7 1.5 13.5T250-570q0 1 1 4 7 7 11 15.5t4 17.5q0 4-6 21-1 2 0 4l2 16q0 21-17.5 36T202-441h-78Zm676 1q-33 0-56.5-23.5T720-520q0-12 3.5-22.5T733-563l-28-25q-10-8-3.5-20t18.5-12h80q33 0 56.5 23.5T880-540v20q0 33-23.5 56.5T800-440ZM0-240v-63q0-44 44.5-70.5T160-400q13 0 25 .5t23 2.5q-14 20-21 43t-7 49v65H0Zm240 0v-65q0-65 66.5-105T480-450q108 0 174 40t66 105v65H240Zm560-160q72 0 116 26.5t44 70.5v63H780v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5Zm-320 30q-57 0-102 15t-53 35h311q-9-20-53.5-35T480-370Zm0 50Zm1-280Z"/></svg>
              <span>Students</span>
            </span>
          </NavLink>
        </div>

        <NavLink
          to="/indexclass/allteacher"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 text-black hover:bg-gray-200 ${
              isActive ? "bg-gray-300 font-medium text-black" : ""
            }`
          }
        >
          <span className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M680-360q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM480-160v-56q0-24 12.5-44.5T528-290q36-15 74.5-22.5T680-320q39 0 77.5 7.5T832-290q23 9 35.5 29.5T880-216v56H480Zm-80-320q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-160ZM80-160v-112q0-34 17-62.5t47-43.5q60-30 124.5-46T400-440q35 0 70 6t70 14l-34 34-34 34q-18-5-36-6.5t-36-1.5q-58 0-113.5 14T180-306q-10 5-15 14t-5 20v32h240v80H80Zm320-80Zm0-320q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Z"/></svg>
          Teachers
          </span>
        </NavLink>

        <NavLink
          to="/indexclass/studentenrollment"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 text-black hover:bg-gray-200 ${
              isActive ? "bg-gray-300 font-medium text-black" : ""
            }`
          }
        >
          <span className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/></svg>
          Student Enrollment
          </span>
        </NavLink>

        <NavLink
          to="/indexclass/teacherenrollment"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 text-black hover:bg-gray-200 ${
              isActive ? "bg-gray-300 font-medium text-black" : ""
            }`
          }
        >
          <span className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M391-480q-36 0-60-27t-19-63l13-98q8-57 52-94.5T480-800q59 0 103 37.5t52 94.5l13 98q5 36-19 63t-60 27H391Zm0-80h178l-13-96q-4-28-25.5-46T480-720q-29 0-50.5 18T404-656l-13 96Zm89 0ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240 0Z"/></svg>
          Teacher Enrollment
          </span>
        </NavLink>

        <NavLink
          to="/indexclass/usersetting"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 text-black hover:bg-gray-200 ${
              isActive ? "bg-gray-300 font-medium text-black" : ""
            }`
          }
        >
          <span className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/></svg>
          User Settings
          </span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
