import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa";

const People = () => {
  const [showTeacherForm, setShowTeacherForm] = useState(false);
  const [showStudentForm, setShowStudentForm] = useState(false);

  const handleTeacherFormToggle = () => {
    setShowTeacherForm(!showTeacherForm);
  };

  const handleStudentFormToggle = () => {
    setShowStudentForm(!showStudentForm);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Teachers Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Teachers</h2>
          <FaUserPlus
            className="text-gray-600 cursor-pointer"
            onClick={handleTeacherFormToggle}
          />
        </div>
        {showTeacherForm && (
          <div className="flex-col p-4 bg-white rounded shadow mb-4 border-2">
            <input
              type="email"
              className="w-full p-2 border rounded mb-2"
              placeholder="Enter teacher's email address"
            />
            <p className="text-xs">
              Teachers added by you can do everything that you can except delete
              the class.
            </p>

            {/* Button aligned to the right */}
            <div className="flex justify-end">
              <button className="bg-blue-700 hover:bg-blue-900 text-white px-4 py-1 rounded">
                Invite
              </button>
            </div>
          </div>
        )}
        <div className="p-4 bg-white rounded shadow mb-4">
          <h3 className="text-sm ">SHERUL FERNANDO</h3>
        </div>
        {/* Add more teachers here */}
      </div>

      {/* Students Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Students</h2>
          <FaUserPlus
            className="text-gray-600 cursor-pointer"
            onClick={handleStudentFormToggle}
          />
        </div>
        {showStudentForm && (
          <div className="p-4 bg-white rounded shadow mb-4 border-2">
            <input
              type="email"
              className="w-full p-2 border rounded mb-2"
              placeholder="Enter student's email address"
            />
            <p className="text-xs">
              Student only can see the announcementz and people.
            </p>
             <div className="flex justify-end">
              <button className="bg-blue-700 hover:bg-blue-900 text-white px-4 py-1 rounded">
                Invite
              </button>
            </div>
          </div>
        )}
        <div className="p-4 bg-white rounded shadow mb-4">
          <h3 className="text-sm ">Sherul Dhanushka</h3>
        </div>
        {/* Add more students here */}
      </div>
    </div>
  );
};

export default People;
