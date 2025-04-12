import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEdit, FaFilePdf } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { toast } from "react-toastify";

const StudentWork = () => {
  const location = useLocation();
  const { assignment, classId } = location.state || {};
  const navigate = useNavigate();
  const [submissionDetails, setSubmissionDetails] = useState([]);
  const [students, setStudents] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleBackClick = () => {
    navigate(`/indexclass/class/${classId}`);
  };

  const handleEditClick = () => {
    setTitle(assignment.title);
    setContent(assignment.description);
    setDueDate(assignment.dueDate);
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleUpdate = async () => {
    try {
      const updatedAssignment = { 
        assignmentId: assignment.assignmentId,
        title,
        description: content,
        dueDate ,
        uploadedBy: assignment.uploadedBy,
        url: assignment.url,
        classId: assignment.classId,
    };
      await axios.put(
        `http://localhost:8080/api/v1/assignment/update`,
        updatedAssignment,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Assignment updated successfully!");
      console.log("Assignment updated successfully!");
      setIsPopupOpen(false);
      // Optionally refresh the page or update state
    } catch (error) {
      console.error("Error updating assignment:", error);
      alert("Failed to update assignment.");
    }
  };

  const fetchStudent = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/student/getAll"
      );
      console.log("response", response.data);
      setStudents(response.data);
    } catch (error) {
      alert("Failed to fetch student.");
    }
  };

  const fetchSubmissionDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/submission/getAll/${assignment.assignmentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = Array.isArray(response.data.data) ? response.data.data : [];
      console.log(`submission details ${data}`);
      setSubmissionDetails(data);
    } catch (error) {
      alert(`Submission details not fetched successfully: ${error}`);
      console.error("Error fetching submission details:", error);
    }
  };

  useEffect(() => {
    fetchSubmissionDetails();
    fetchStudent();
  }, [assignment?.assignmentId]);

  return (
    <div className="p-4 space-y-6">
      {/* Back Button */}
      <button
        className="px-4 py-2 border border-blue-100 text-gray-700 rounded-full text-sm hover:bg-blue-100"
        onClick={handleBackClick}
      >
        Back
      </button>

      {/* Instruction Card */}
      <div className="p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-semibold">
            {assignment?.title || "Assignment"}
          </h1>
          <FaEdit
            className="text-gray-400 text-2xl mr-3"
            onClick={handleEditClick}
          />
        </div>

        <h3 className="text-sm text-gray-500">{assignment.uploadedBy}</h3>
        <h6 className="text-sm text-gray-500">
          due : {new Date(assignment.dueDate).toLocaleDateString()}
        </h6>

        <br />
        <hr className="bg-black" />

        <div
          className="mt-2 text-sm"
          dangerouslySetInnerHTML={{
            __html: assignment?.description || "No instructions available.",
          }}
        />

        {/* PDF Card for Assignment URL */}
        {assignment?.url && (
          <div
            className="flex items-center py-1 px-5 rounded-full shadow border border-gray-400 cursor-pointer hover:bg-gray-200 w-max"
            onClick={() =>
              window.open(
                `http://localhost:8080/api/v1/assignment/file/${assignment.url}`,
                "_blank",
                "noopener noreferrer"
              )
            }
          >
            <FaFilePdf className="text-red-500 text-2xl mr-3" />
            <span className="text-sm font-medium text-gray-600">
              {assignment.url.split("/").pop()}
            </span>
          </div>
        )}
      </div>

      {/* Handed In and Assigned Counts */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-100 rounded-lg shadow text-center">
          <h4 className="text-lg font-medium">Handed In</h4>
          <p className="text-2xl font-bold text-blue-600">
            {submissionDetails.length}
          </p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg shadow text-center">
          <h4 className="text-lg font-medium">Assigned</h4>
          <p className="text-2xl font-bold text-green-600">{students.length}</p>
        </div>
      </div>

      {/* Student Submissions */}
      {submissionDetails.length > 0 &&
        submissionDetails.map((submission) => {
          const student = students.find(
            (student) => student.studentId === submission.studentId
          );
          return (
            <div
              key={submission.submissionId}
              className="p-4 bg-gray-100 rounded-lg shadow flex justify-between items-center"
            >
              <span className="text-sm font-medium">{student.studentId}</span>
              <span className="text-sm font-medium">{student.fullName}</span>
              <div
                className="flex items-center py-1 px-5 rounded-full shadow border border-gray-400 cursor-pointer hover:bg-gray-200 w-max"
                onClick={() =>
                  window.open(
                    `http://localhost:8080/api/v1/submission/file/${submission.url}`,
                    "_blank",
                    "noopener noreferrer"
                  )
                }
              >
                <FaFilePdf className="text-red-500 text-2xl mr-3" />
                <span className="text-sm font-medium text-gray-600">
                  {submission.url.split("/").pop()}
                </span>
              </div>
            </div>
          );
        })}

      {/* Popup for Editing Assignment */}
      {isPopupOpen && (
        <div className=" fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 z-[1000]">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl relative top-5">
            <h2 className="text-center font-bold text-lg">Edit Assignment</h2>
            <label className="font-semibold">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />
            <label  className="font-semibold">Content:</label>
            <ReactQuill value={content} onChange={setContent} className="mb-4" />
            <label  className="font-semibold">Due Date:</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />
            <div className="popup-footer">
              <button
                onClick={handlePopupClose}
                className="px-4 py-2 bg-gray-300 rounded mr-2 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentWork;
