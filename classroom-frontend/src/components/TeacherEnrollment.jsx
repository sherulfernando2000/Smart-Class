import React, { useState, useEffect } from "react";
import axios from "axios";

function TeacherEnrollment() {
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [emailSuggestions, setEmailSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  const [classSearch, setClassSearch] = useState("");
  const [classId, setClassId] = useState("");

  const [enrollments, setEnrollments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);

  const [classSuggestions, setClassSuggestions] = useState([]);
  const [selectedClassIndex, setSelectedClassIndex] = useState(-1);

  useEffect(() => {
    fetchTeachers();
    fetchClasses();
    fetchEnrollments();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/teacher/getAll"
      );
      console.log("response", response.data.data);
      setTeachers(response.data.data);
    } catch (error) {
      alert("Failed to fetch teachers.");
      console.error("Error fetching teachers:", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/class/getAll",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("response", response.data.data);
      setClasses(response.data.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const handleTeacherSearch = (email) => {
    const teacher = teachers.find((t) => t.email === email);
    if (teacher) {
      setTeacherId(teacher.teacherId);
      setTeacherName(teacher.fullName);
    } else {
      setTeacherId("");
      setTeacherName("");
    }
  };

  const handleClassSearch = (name) => {
    const selectedClass = classes.find((c) => c.className === name);
    if (selectedClass) {
      setClassId(selectedClass.classId);
    } else {
      setClassId("");
    }
  };

  const fetchEnrollments = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/classTeachers/getAll", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEnrollments(response.data.data);
    } catch (error) {
      console.error("Error fetching teacher enrollments:", error);
    }
  };
  
  const handleEnroll = async () => {
    if (!teacherEmail || !classSearch) {
      alert("Please select a valid teacher and class.");
      return;
    }
    
    console.log("classSearch", classSearch);
    console.log("token", localStorage.getItem("token"));
    
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/classTeachers/teacher/enroll?email=${encodeURIComponent(teacherEmail)}&className=${encodeURIComponent(classSearch)}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      console.log("Teacher enrollment successful:", response.data);
  
      // Fetch updated enrollments
      fetchEnrollments();
  
      // Reset form fields
      setTeacherEmail("");
      setTeacherId("");
      setTeacherName("");
      setClassSearch("");
      setClassId("");
  
      alert("Teacher successfully enrolled!");
    } catch (error) {
      console.error("Error enrolling teacher:", error);
      alert("Failed to enroll teacher. Please try again.");
    }
  };

  // Auto suggestion for teacher email
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setTeacherEmail(value);

    if (value) {
      const filteredSuggestions = teachers
        .filter((t) => t.email.toLowerCase().includes(value.toLowerCase()))
        .map((t) => t.email);

      setEmailSuggestions(filteredSuggestions);
      setSelectedSuggestionIndex(-1);
    } else {
      setEmailSuggestions([]);
    }
  };

  const handleKeyDown = (e) => {
    if (emailSuggestions.length > 0) {
      if (e.key === "ArrowDown") {
        setSelectedSuggestionIndex((prev) =>
          prev < emailSuggestions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter" && selectedSuggestionIndex !== -1) {
        selectSuggestion(emailSuggestions[selectedSuggestionIndex]);
      }
    }
  };

  const selectSuggestion = (email) => {
    setTeacherEmail(email);
    handleTeacherSearch(email);
    setEmailSuggestions([]);
  };

  // Auto suggestion for class name
  const handleClassChange = (e) => {
    const value = e.target.value;
    setClassSearch(value);
  
    if (value) {
      const filtered = classes
        .filter((c) => `${c.className}`.toLowerCase().includes(value.toLowerCase()))
        .map((c) => `${c.className}`);
  
      setClassSuggestions(filtered);
      setSelectedClassIndex(-1);
    } else {
      setClassSuggestions([]);
    }
  };
  
  const handleClassKeyDown = (e) => {
    if (classSuggestions.length > 0) {
      if (e.key === "ArrowDown") {
        setSelectedClassIndex((prev) =>
          prev < classSuggestions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        setSelectedClassIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter" && selectedClassIndex !== -1) {
        selectClass(classSuggestions[selectedClassIndex]);
      }
    }
  };
  
  const selectClass = (name) => {
    setClassSearch(name);
    handleClassSearch(name);
    setClassSuggestions([]);
  };

  // Delete teacher enrollment
  const handleDeleteEnrollment = async (enrollmentId) => {
    console.log("delete clicked", enrollmentId);
    if (!enrollmentId) return;
  
    const confirmDelete = window.confirm("Are you sure you want to delete this enrollment?");
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`http://localhost:8080/api/v1/classTeachers/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          teacherEnrollId: enrollmentId,
        },
      });
      console.log("Teacher enrollment deleted successfully!");
      fetchEnrollments(); // Refresh the enrollments list
    } catch (error) {
      console.error("Error deleting teacher enrollment:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Teacher Enrollment
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-lg w-4/4 mx-auto">
        {/* Teacher Search Row */}
        <div className="flex gap-6 mb-4">
          <div className="relative w-1/3 mb-4">
            <label className="block text-gray-700 font-medium">
              Search Teacher by Email
            </label>
            <input
              type="text"
              className="border p-2 rounded w-full hover:border-blue-500 transition"
              placeholder="Enter teacher email..."
              value={teacherEmail}
              onChange={handleEmailChange}
              onKeyDown={handleKeyDown}
            />
            {emailSuggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded shadow-lg">
                {emailSuggestions.map((email, index) => (
                  <li
                    key={email}
                    className={`p-2 cursor-pointer hover:bg-blue-100 ${
                      index === selectedSuggestionIndex ? "bg-blue-200" : ""
                    }`}
                    onClick={() => selectSuggestion(email)}
                  >
                    {email}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="w-1/3">
            <label className="block text-gray-700 font-medium">
              Teacher ID
            </label>
            <input
              type="text"
              className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed"
              value={teacherId}
              disabled
            />
          </div>
          <div className="w-1/3">
            <label className="block text-gray-700 font-medium">
              Teacher Name
            </label>
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
          <div className="relative w-2/3">
            <label className="block text-gray-700 font-medium">
              Search Class
            </label>
            <input
              type="text"
              className="border p-2 rounded w-full hover:border-blue-500 transition"
              placeholder="Enter class name..."
              value={classSearch}
              onChange={handleClassChange}
              onKeyDown={handleClassKeyDown}
            />
            {classSuggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded shadow-lg">
                {classSuggestions.map((name, index) => (
                  <li
                    key={name}
                    className={`p-2 cursor-pointer hover:bg-blue-100 ${
                      index === selectedClassIndex ? "bg-blue-200" : ""
                    }`}
                    onClick={() => selectClass(name)}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="w-1/3">
            <label className="block text-gray-700 font-medium">
              Class ID
            </label>
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
              <th className="border border-gray-300 px-4 py-2">
                Teacher ID
              </th>
              <th className="border border-gray-300 px-4 py-2">Teacher Name</th>
              <th className="border border-gray-300 px-4 py-2">Class Name</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {enrollments.length > 0 ? (
              enrollments.map((enrollment) => (
                <tr
                  key={enrollment.classTeacherId}
                  className="text-center hover:bg-gray-200 transition"
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {enrollment.teacherId}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {enrollment.teacherName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {enrollment.className}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {enrollment.enrollmentDate}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                      onClick={() => handleDeleteEnrollment(enrollment.classTeacherId)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="border border-gray-300 px-4 py-2 text-center"
                >
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