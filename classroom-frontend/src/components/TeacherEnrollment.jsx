import React, { useState } from "react";

function TeacherEnrollment() {
  const teachers = [
    { email: "alice@school.com", id: "T101", name: "Alice Johnson" },
    { email: "bob@school.com", id: "T102", name: "Bob Smith" },
  ];

  const classes = [
    { name: "Physics 101", id: "C101" },
    { name: "History 202", id: "C102" },
  ];

  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [teacherName, setTeacherName] = useState("");

  const [classSearch, setClassSearch] = useState("");
  const [classId, setClassId] = useState("");

  const [enrollments, setEnrollments] = useState([]);

  const handleTeacherSearch = (email) => {
    const teacher = teachers.find((t) => t.email === email);
    if (teacher) {
      setTeacherId(teacher.id);
      setTeacherName(teacher.name);
    } else {
      setTeacherId("");
      setTeacherName("");
    }
  };

  const handleClassSearch = (name) => {
    const selectedClass = classes.find((c) => c.name === name);
    if (selectedClass) {
      setClassId(selectedClass.id);
    } else {
      setClassId("");
    }
  };

  const handleEnroll = () => {
    if (teacherId && classSearch) {
      const newEnrollment = {
        id: enrollments.length + 1,
        teacherId,
        className: classSearch,
        date: new Date().toLocaleDateString(),
      };
      setEnrollments([...enrollments, newEnrollment]);
      setTeacherEmail("");
      setTeacherId("");
      setTeacherName("");
      setClassSearch("");
      setClassId("");
    } else {
      alert("Please select a valid teacher and class.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Teacher Enrollment</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg w-4/4 mx-auto">
        {/* Teacher Search Row */}
        <div className="flex gap-6 mb-4">
          <div className="w-1/3">
            <label className="block text-gray-700 font-medium">Search Teacher by Email</label>
            <input
              type="text"
              className="border p-2 rounded w-full hover:border-blue-500 transition"
              placeholder="Enter teacher email..."
              value={teacherEmail}
              onChange={(e) => {
                setTeacherEmail(e.target.value);
                handleTeacherSearch(e.target.value);
              }}
            />
          </div>
          <div className="w-1/3">
            <label className="block text-gray-700 font-medium">Teacher ID</label>
            <input
              type="text"
              className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed"
              value={teacherId}
              disabled
            />
          </div>
          <div className="w-1/3">
            <label className="block text-gray-700 font-medium">Teacher Name</label>
            <input
              type="text"
              className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed"
              value={teacherName}
              disabled
            />
          </div>
        </div>

        {/* Horizontal Line */}
        <hr className="border-t-2 border-gray-300 my-4" />

        {/* Class Search Row */}
        <div className="flex gap-6 mb-4">
          <div className="w-2/3">
            <label className="block text-gray-700 font-medium">Search Class</label>
            <input
              type="text"
              className="border p-2 rounded w-full hover:border-blue-500 transition"
              placeholder="Enter class name..."
              value={classSearch}
              onChange={(e) => {
                setClassSearch(e.target.value);
                handleClassSearch(e.target.value);
              }}
            />
          </div>
          <div className="w-1/3">
            <label className="block text-gray-700 font-medium">Class ID</label>
            <input
              type="text"
              className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed"
              value={classId}
              disabled
            />
          </div>
        </div>

        {/* Enrollment Button */}
        <div className="flex justify-end">
          <button
            onClick={handleEnroll}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Enroll Teacher
          </button>
        </div>
      </div>

      {/* Enrollment Table */}
      <div className="mt-8 w-4/4 mx-auto">
        <h2 className="text-xl font-bold mb-4">Teacher Enrollment Records</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Enrollment ID</th>
              <th className="border border-gray-300 px-4 py-2">Teacher ID</th>
              <th className="border border-gray-300 px-4 py-2">Class Name</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.length > 0 ? (
              enrollments.map((enrollment) => (
                <tr key={enrollment.id} className="text-center hover:bg-gray-200 transition">
                  <td className="border border-gray-300 px-4 py-2">{enrollment.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{enrollment.teacherId}</td>
                  <td className="border border-gray-300 px-4 py-2">{enrollment.className}</td>
                  <td className="border border-gray-300 px-4 py-2">{enrollment.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border border-gray-300 px-4 py-2 text-center">
                  No enrollments yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeacherEnrollment;
