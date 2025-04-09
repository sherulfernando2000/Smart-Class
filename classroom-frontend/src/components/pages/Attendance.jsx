import { useEffect, useState } from "react";
import { Calendar as CalendarIcon, Check, X, Clock, User } from "lucide-react";
import Swal from "sweetalert2";
import { use } from "react";
import axios from "axios";

const AttendancePage = ({ id }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAbsentPage, setShowAbsentPage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalStudent, setModalStudent] = useState({
    id: "",
    name: "",
    date: "",
  });
  const [students, setStudents] = useState([]);

  const [gstudents, setGstudents] = useState([]);

  const [StudentEnroll, setStudentEnroll] = useState([]);

  const [fetchedStudents, setFetchedStudents] = useState([]);

  // Handle attendance status change
  const handleStatusChange = (studentId, status) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId ? { ...student, status } : student
      )
    );
  };

  const fetchStudents = async () => {
    try {
      const resp = await axios.get(
        "http://localhost:8080/api/v1/student/getAll"
      );
      console.log(resp.data);
      setGstudents(resp.data);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const fetchStudentEnroll = async () => {
    try {
      const resp = await axios.get(
        "http://localhost:8080/api/v1/enrollments/getAll",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setStudentEnroll(resp.data.data);
      console.log(`student enroll`, resp.data.data);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchStudentEnroll();
  }, []);

  useEffect(() => {
    const filterStuIds = StudentEnroll.filter(
      (enroll) => enroll.classId === id
    ).map((enroll) => enroll.studentId);

    const filteredStudents = gstudents.filter((student) =>
      filterStuIds.includes(student.studentId)
    );

    const studs = filteredStudents.map((student) => ({
      id: parseInt(student.studentId, 10),
      name: student.fullName,
      status: "",
    }));

    setStudents(studs);
  }, [StudentEnroll, gstudents, id]); // Run this when data is available

  

  // const studs = filteredStudents.map(student => ({
  //     id: parseInt(student.studentId),
  //     name: student.fullName,
  //     status: '',
  // }))

  

  // Sample student data

  // { id: 1, name: 'John Doe', status: '' },
  // { id: 2, name: 'Jane Smith', status: '' },
  // { id: 3, name: 'Robert Johnson', status: '' },
  // { id: 4, name: 'Emily Davis', status: '' },
  // { id: 5, name: 'Michael Wilson', status: '' },

  // Status button component
  const StatusButton = ({
    status,
    currentStatus,
    onClick,
    icon: Icon,
    color,
  }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded-md flex items-center justify-center ${
        currentStatus === status
          ? `bg-${color}-100 text-${color}-600 border-${color}-300`
          : "bg-gray-100 hover:bg-gray-200"
      } border`}
    >
      <Icon size={18} />
    </button>
  );

  // Submit attendance
  const submitAttendance = async () => {
    // Validate all students have status
    const hasEmptyStatus = students.some((student) => !student.status);

    if (hasEmptyStatus) {
      Swal.fire({
        title: "Incomplete",
        text: "Please mark attendance for all students",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
        
        const attendanceData = students.map((student) => ({
          studentId: student.id,    
          date: selectedDate.toISOString().split("T")[0],
          status: student.status,
          classId: id
        }))
    
        // Here you would typically send data to your backend
        const resp = await axios.post("http://localhost:8080/api/v1/attendance/saveAll",attendanceData, {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });
        console.log(resp.data.data);
        
         Swal.fire({
          title: "Success!",
          text: `Attendance for ${selectedDate.toLocaleDateString()} submitted successfully`,
          icon: "success",
          confirmButtonText: "OK",
        });
    
        // Reset statuses after submission
        setStudents((prevStudents) =>
          prevStudents.map((student) => ({ ...student, status: "" }))
        );
    } catch (error) {
        alert("Failed to submit attendance.");
        console.error("Error submitting attendance:", error);
    }

  };

  const fetchStudentAttendance = async () => {
    try {
        const resp = await axios.get(
            `http://localhost:8080/api/v1/attendance/getAll/${id}`,
            {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            }
        );
        console.log(resp.data.data);
        setFetchedStudents(resp.data.data);
    }catch(error){
        alert("Failed to fetch student attendance.");
        console.error("Error fetching student attendance:", error);

    }

}


  //----------------------------------
  const handleSearchStudent = () => {
        fetchStudentAttendance();
        setShowModal(true);

  }

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-2">
      <div
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
        style={{ height: "calc(100vh - 2rem)" }}
      >
        {/* Header */}
        <div className="bg-blue-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Student Attendance System</h1>
          <p className="mt-1">Mark daily attendance for students</p>
        </div>

        {/* Date Selection */}
        <div className="p-4 border-b flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center">
            <CalendarIcon className="mr-2" size={20} />
            <input
              type="date"
              value={selectedDate.toISOString().split("T")[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleSearchStudent()}//setShowModal(true)}
              className="px-4 py-2 rounded-md font-medium bg-gray-600 text-white hover:bg-gray-700"
            >
              Search Student attendance
            </button>
            <button
              onClick={() => setShowAbsentPage(!showAbsentPage)}
              className={`px-4 py-2 rounded-md font-medium ${
                showAbsentPage
                  ? "bg-gray-200 text-gray-800"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {showAbsentPage ? "Back to Attendance" : "View Absent Page"}
            </button>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-md w-3/4 h-3/4 flex flex-col">
              <button
                onClick={() => setShowModal(false)}
                className="self-end p-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300"
              >
                <X size={20} />
              </button>
              <h2 className="text-xl font-semibold mb-4 text-center">
                SEARCH STUDENT ATTENDANCE
              </h2>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Student ID
                  </label>
                  <input
                    type="text"
                    value={modalStudent.id}
                    onChange={(e) =>
                      setModalStudent({ ...modalStudent, id: e.target.value })
                    }
                    className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Student Name
                  </label>
                  <input
                    type="text"
                    value={modalStudent.name}
                    onChange={(e) =>
                      setModalStudent({ ...modalStudent, name: e.target.value })
                    }
                    className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    value={modalStudent.date}
                    onChange={(e) =>
                      setModalStudent({ ...modalStudent, date: e.target.value })
                    }
                    className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mb-4 flex-1 overflow-auto">
                <h3 className="text-sm font-medium text-gray-700">
                  Attendance Details
                </h3>
                <div className="mt-2 space-y-4">
                  {fetchedStudents.map((student) => (
                    <div
                      key={student.studentId}
                      className="flex justify-between items-center p-4 border rounded-md shadow-sm bg-gray-50"
                    >
                      <span className="text-sm font-medium text-gray-700">
                        ID: {student.studentId}
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        Name: {student.studentName}
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        Date: {student.date}
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        Status: {student.status || "Not Marked"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto">
          {showAbsentPage ? (
            /* Absent Page */
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Absent Students Report
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Absent Dates
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students
                      .filter((s) => s.status === "absent")
                      .map((student) => (
                        <tr key={student.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {student.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {student.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {selectedDate.toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    {students.filter((s) => s.status === "absent").length ===
                      0 && (
                      <tr>
                        <td
                          colSpan={3}
                          className="px-6 py-4 text-center text-gray-500"
                        >
                          No absent students for selected date
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Attendance Page */
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Attendance for {selectedDate.toLocaleDateString()}
              </h2>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {student.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap flex items-center">
                          <User className="mr-2" size={16} />
                          {student.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            <StatusButton
                              status="present"
                              currentStatus={student.status}
                              onClick={() =>
                                handleStatusChange(student.id, "present")
                              }
                              icon={Check}
                              color="green"
                            />
                            <StatusButton
                              status="absent"
                              currentStatus={student.status}
                              onClick={() =>
                                handleStatusChange(student.id, "absent")
                              }
                              icon={X}
                              color="red"
                            />
                            <StatusButton
                              status="late"
                              currentStatus={student.status}
                              onClick={() =>
                                handleStatusChange(student.id, "late")
                              }
                              icon={Clock}
                              color="yellow"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Submit Button and Legend */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-100 rounded-md mr-2 flex items-center justify-center border border-green-300">
                  <Check size={12} className="text-green-600" />
                </div>
                <span className="text-sm">Present</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-100 rounded-md mr-2 flex items-center justify-center border border-red-300">
                  <X size={12} className="text-red-600" />
                </div>
                <span className="text-sm">Absent</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-100 rounded-md mr-2 flex items-center justify-center border border-yellow-300">
                  <Clock size={12} className="text-yellow-600" />
                </div>
                <span className="text-sm">Late</span>
              </div>
            </div>
            <button
              onClick={submitAttendance}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit Attendance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
