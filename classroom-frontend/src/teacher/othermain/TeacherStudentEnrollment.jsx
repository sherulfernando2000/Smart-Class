import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Mail, User, BadgeInfo, BookOpen, GraduationCap } from "lucide-react";


function StudentEnrollment() {
  const [studentEmail, setStudentEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [emailSuggestions, setEmailSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  const [classSearch, setClassSearch] = useState("");
  const [teacherName, setTeacherName] = useState("");

  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);

  const [classSuggestions, setClassSuggestions] = useState([]);
  const [selectedClassIndex, setSelectedClassIndex] = useState(-1);

  useEffect(() => {
    fetchStudent();
    fetchClasses();
    fetchEnrollments();
  }, []);

  const fetchStudent = async () => {
    try {
      const reponse = await axios.get(
        "http://localhost:8080/api/v1/student/getAll"
      );
      console.log("response", reponse.data);
      setStudents(reponse.data);
    } catch (error) {
      alert("Failed to fetch student.");
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

  // const students = [
  //   { email: "john@example.com", id: "S20251", name: "John Doe" },
  //   { email: "emma@example.com", id: "S20252", name: "Emma Watson" },
  // ];

  // const classes = [
  //   { name: "Math 101", id: "C101", teacher: "Mr. Smith" },
  //   { name: "Science 202", id: "C102", teacher: "Ms. Johnson" },
  // ];

  const handleStudentSearch = (email) => {
    const student = students.find((s) => s.email === email);
    if (student) {
      setStudentId(student.studentId);
      setStudentName(student.fullName);
    } else {
      setStudentId("");
      setStudentName("");
    }
  };

  const handleClassSearch = (name) => {
    const selectedClass = classes.find((c) => c.className === name);
    if (selectedClass) {
      setTeacherName(selectedClass.subject);
    } else {
      setTeacherName("");
    }
  };

  const fetchEnrollments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/enrollments/getAll",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // If authentication is required
          },
        }
      );
      setEnrollments(response.data.data); // Update state with new enrollments
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  };

  const handleEnroll = async () => {
    if (!studentEmail || !classSearch) {
      alert("Please select a valid student and class.");
      return;
    }
    console.log("classSerch" + classSearch);
    console.log("token", localStorage.getItem("token"));
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/enrollments/student/enroll?email=${encodeURIComponent(studentEmail)}&className=${encodeURIComponent(classSearch)}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // If authentication is needed
          },
        }
      );

      console.log("Enrollment successful:", response.data);

      // Fetch updated enrollments
      fetchEnrollments();

      // Reset form fields
      setStudentEmail("");
      setStudentId("");
      setStudentName("");
      setClassSearch("");
      setTeacherName("");

      toast.success("Student successfully enrolled!");
    } catch (error) {
      console.error("Error enrolling student:", error);
      toast.error("Failed to enroll student. Please try again.");
    }
  };

  // ----------------------------------------auto suggestion student email bar--------------------------------

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setStudentEmail(value);

    if (value) {
      const filteredSuggestions = students
        .filter((s) => s.email.toLowerCase().includes(value.toLowerCase()))
        .map((s) => s.email);

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
    setStudentEmail(email);
    handleStudentSearch(email);
    setEmailSuggestions([]);
  };

  // ----------------------------------------auto suggestion class name bar--------------------------------

  const handleClassChange = (e) => {
    const value = e.target.value;
    setClassSearch(value);

    if (value) {
      const filtered = classes
        .filter((c) =>
          `${c.className}`.toLowerCase().includes(value.toLowerCase())
        )
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

  // ----------------------------------------delete enrollment--------------------------------
  const handleDeleteEnrollment = async (enrollmentId) => {
    if (!enrollmentId) return;

    toast(
      (t) => (
        <span className="text-sm">
          Are you sure you want to delete this enrollment?
          <div className="mt-2 flex gap-2 justify-end">
            <button
              onClick={async () => {
                toast.dismiss(t.id);

                try {
                  await axios.delete(
                    `http://localhost:8080/api/v1/enrollments/delete`,
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                      },
                      params: {
                        enrollmentId: enrollmentId,
                      },
                    }
                  );

                  toast.success("Enrollment deleted successfully!");
                  fetchEnrollments(); // Refresh enrollments
                } catch (error) {
                  console.error("Error deleting enrollment:", error);
                  toast.error("Failed to delete enrollment.");
                }
              }}
              className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 bg-gray-300 text-black rounded text-xs hover:bg-gray-400"
            >
              No
            </button>
          </div>
        </span>
      ),
      {
        duration: 10000,
      }
    );
  };

  return (
    <div className="p-2">
      <h1 className="text-xl font-bold text-center mb-4 flex items-center justify-center gap-2 text-black">
  <GraduationCap className="w-6 h-6" />
  Student Enrollment
</h1>

      <div className="bg-slate-300 p-6 rounded-xl shadow-xl w-full max-w-6xl mx-auto">
        {/* Student Search Row */}
        <div className="flex gap-4 flex-wrap lg:flex-nowrap">
          {/* Search Student by Email */}
          <div className="w-full lg:w-1/3 relative">
            <label className="block text-black font-medium mb-1 flex items-center gap-1">
              <Mail className="w-4 h-4 text-balck-500" />
              Search Student by Email
            </label>
            <input
              type="text"
              className="border p-2 rounded-full w-full hover:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-400 transition"
              placeholder="Enter student email..."
              value={studentEmail}
              onChange={handleEmailChange}
              onKeyDown={handleKeyDown}
            />
            {emailSuggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded shadow-md max-h-40 overflow-y-auto">
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

          {/* Student ID */}
          <div className="w-full lg:w-1/3">
            <label className="block text-black font-medium mb-1 flex items-center gap-1">
              <BadgeInfo className="w-4 h-4 text-black" />
              Student ID
            </label>
            <input
              type="text"
              className="border p-2 rounded-full w-full bg-gray-100 text-gray-600 cursor-not-allowed"
              value={studentId}
              disabled
            />
          </div>

          {/* Student Name */}
          <div className="w-full lg:w-1/3">
            <label className="block text-black font-medium mb-1 flex items-center gap-1">
              <User className="w-4 h-4 text-black" />
              Student Name
            </label>
            <input
              type="text"
              className="border p-2 rounded-full w-full bg-gray-100 text-gray-600 cursor-not-allowed"
              value={studentName}
              disabled
            />
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t-2 border-gray-200 my-6" />

        {/* Class Search Row */}
        <div className="flex gap-4 flex-wrap">
          <div className="w-full lg:w-2/3 relative">
            <label className="block text-black font-medium mb-1 flex items-center gap-1">
              <BookOpen className="w-4 h-4 text-black" />
              Search Class
            </label>
            <input
              type="text"
              className="border p-2 rounded-full w-full hover:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-400 transition"
              placeholder="Enter class name..."
              value={classSearch}
              onChange={handleClassChange}
              onKeyDown={handleClassKeyDown}
            />
            {classSuggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded shadow-md max-h-40 overflow-y-auto">
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
        </div>

        {/* Enrollment Button */}
        <div className="flex justify-end">
          <button
            onClick={handleEnroll}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
          >
            Enroll Student
          </button>
        </div>
      </div>

      {/* Enrollment Table */}
      <div className="mt-8 w-4/4 mx-auto">
        <h2 className="text-xl font-bold mb-3">Enrollment Records</h2>
        <table className="w-full  rounded-2xl border-collapse  ">
          <thead>
            <tr className="bg-slate-300">
              <th className="rounded-2xl  px-4 py-2">Student ID</th>
              <th className=" rounded-2xl px-4 py-2">Student Name</th>
              <th className=" rounded-2xl  px-4 py-2">Class Name</th>
              <th className=" rounded-2xl px-4 py-2">Date</th>
              <th className=" rounded-2xl  px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {enrollments.length > 0 ? (
              enrollments.map((enrollment) => (
                <tr
                  key={enrollment.enrollmentId}
                  className="text-center hover:bg-gray-200  transition"
                >
                  <td className=" border-gray-300 px-4 py-2">
                    {enrollment.studentId}
                  </td>
                  <td className=" border-gray-300 px-4 py-2">
                    {enrollment.studentName}
                  </td>
                  <td className=" border-gray-300 px-4 py-2">
                    {enrollment.className}
                  </td>
                  <td className=" border-gray-300 px-4 py-2">
                    {enrollment.enrollmentDate}
                  </td>
                  <td className=" border-gray-300 px-4 py-2">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                      onClick={() =>
                        handleDeleteEnrollment(enrollment.enrollmentId)
                      }
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
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

export default StudentEnrollment;
