import React, { useState } from "react";

function StudentEnrollment() {
  const students = [
    { email: "john@example.com", id: "S20251", name: "John Doe" },
    { email: "emma@example.com", id: "S20252", name: "Emma Watson" },
  ];

  const classes = [
    { name: "Math 101", id: "C101", teacher: "Mr. Smith" },
    { name: "Science 202", id: "C102", teacher: "Ms. Johnson" },
  ];

  const [studentEmail, setStudentEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");

  const [classSearch, setClassSearch] = useState("");
  const [teacherName, setTeacherName] = useState("");

  const [enrollments, setEnrollments] = useState([]);

  const handleStudentSearch = (email) => {
    const student = students.find((s) => s.email === email);
    if (student) {
      setStudentId(student.id);
      setStudentName(student.name);
    } else {
      setStudentId("");
      setStudentName("");
    }
  };

  const handleClassSearch = (name) => {
    const selectedClass = classes.find((c) => c.name === name);
    if (selectedClass) {
      setTeacherName(selectedClass.teacher);
    } else {
      setTeacherName("");
    }
  };

  const handleEnroll = () => {
    if (studentId && classSearch) {
      const newEnrollment = {
        id: enrollments.length + 1,
        studentId,
        className: classSearch,
        date: new Date().toLocaleDateString(),
      };
      setEnrollments([...enrollments, newEnrollment]);
      setStudentEmail("");
      setStudentId("");
      setStudentName("");
      setClassSearch("");
      setTeacherName("");
    } else {
      alert("Please select a valid student and class.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Student Enrollment</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg w-4/4 mx-auto">
        {/* Student Search Row */}
        <div className="flex gap-6 mb-4">
          <div className="w-1/3">
            <label className="block text-gray-700 font-medium">Search Student by Email</label>
            <input
              type="text"
              className="border p-2 rounded w-full hover:border-blue-500 transition"
              placeholder="Enter student email..."
              value={studentEmail}
              onChange={(e) => {
                setStudentEmail(e.target.value);
                handleStudentSearch(e.target.value);
              }}
            />
          </div>
          <div className="w-1/3">
            <label className="block text-gray-700 font-medium">Student ID</label>
            <input
              type="text"
              className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed"
              value={studentId}
              disabled
            />
          </div>
          <div className="w-1/3">
            <label className="block text-gray-700 font-medium">Student Name</label>
            <input
              type="text"
              className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed"
              value={studentName}
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
            <label className="block text-gray-700 font-medium">Teacher Name</label>
            <input
              type="text"
              className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed"
              value={teacherName}
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
            Enroll Student
          </button>
        </div>
      </div>

      {/* Enrollment Table */}
      <div className="mt-8 w-4/4 mx-auto">
        <h2 className="text-xl font-bold mb-4">Enrollment Records</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Enrollment ID</th>
              <th className="border border-gray-300 px-4 py-2">Student ID</th>
              <th className="border border-gray-300 px-4 py-2">Class Name</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.length > 0 ? (
              enrollments.map((enrollment) => (
                <tr key={enrollment.id} className="text-center hover:bg-gray-200 transition">
                  <td className="border border-gray-300 px-4 py-2">{enrollment.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{enrollment.studentId}</td>
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

export default StudentEnrollment;
