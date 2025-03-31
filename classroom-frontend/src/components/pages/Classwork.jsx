import React, { useState, useEffect } from "react";
import { FaPlus, FaClipboard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios"; // Import Axios

const Classwork = ({ id }) => {
  const [showForm, setShowForm] = useState(false);
  const [assignmentText, setAssignmentText] = useState("");
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [points, setPoints] = useState("100");
  const [file, setFile] = useState(null);
  const [assignTo, setAssignTo] = useState("This Class");
  const [assignments, setAssignments] = useState([]); // State to store assignments
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/assignment/getAll/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = Array.isArray(response.data.data) ? response.data.data : []; // Ensure data is an array
        setAssignments(data); // Update assignments state
      } catch (error) {
        console.error("Error fetching assignments:", error);
        setAssignments([]); // Fallback to an empty array on error
      }
    };

    fetchAssignments();
  }, [id]); // Fetch assignments when component mounts or id changes

  const handleCreateClick = () => {
    setShowForm(true);
  };

  const handleCloseClick = () => {
    setShowForm(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Capture the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const teacherEmail = localStorage.getItem("email");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("instructions", assignmentText);
    formData.append("dueDate", dueDate);
    formData.append("uploadedBy", teacherEmail);
    formData.append("file", file);
    formData.append("classId", id);

    try {
      const response = await axios.post("http://localhost:8080/api/v1/assignment/save", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Assignment created successfully:");
      console.log("Assignment created successfully:", response.data);
      setShowForm(false); // Close the form on success
    } catch (error) {
      alert("Error creating assignment: ", error);
      console.error("Error creating assignment:", error);
    }
  };

  const handleCardClick = (assignment) => {
    navigate(`/indexclass/student-work/${assignment.assignmentId}`, {
      state: { assignment, classId: id },
    }); // Pass assignment details and class ID
  };

  return (
    <div className="p-2">
      {/* Create Button */}
      <button
        className="flex items-center px-4 py-2 bg-blue-500 text-white text-sm rounded"
        onClick={handleCreateClick}
      >
        <FaPlus className="mr-2" size={14} /> Create
      </button>

      {/* Assignment Cards */}
      <div className="mt-4 space-y-3">
        {assignments.length === 0 ? (
          <p className="text-gray-500 text-sm">No assignments available.</p>
        ) : (
          assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="flex items-center p-4 bg-gray-100 rounded-lg shadow hover:bg-blue-200 cursor-pointer"
              onClick={() => handleCardClick(assignment)}
            >
              <FaClipboard className="text-blue-500 mr-4" size={24} />
              <div className="w-full">
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium">{assignment.title}</h3>
                  <h6 className=" text-sm">due date: {new Date(assignment.dueDate).toLocaleDateString()}</h6>
                </div>
                <p className="text-xs text-gray-500">Posted by {assignment.uploadedBy}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Popup Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 z-[1000]">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl relative top-5">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-medium">Assignment</h2>
              <button
                onClick={handleCloseClick}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                &times;
              </button>
            </div>

            {/* Assignment Form */}
            <form className="mt-4" onSubmit={handleSubmit}>
              {/* Title & Instructions */}
              <div className="bg-gray-100 p-4 rounded">
                <input
                  type="text"
                  className="w-full px-3 py-2 border-b text-sm focus:outline-none bg-transparent"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <ReactQuill
                  theme="snow"
                  value={assignmentText}
                  onChange={setAssignmentText}
                  placeholder="Write your instruction..."
                  className="mb-4"
                />
              </div>

              {/* Upload File */}
              <div className="my-3">
                <label className="block text-gray-700">Upload File</label>
                <input
                  type="file"
                  className="w-full px-3 py-2 border rounded text-sm"
                  onChange={handleFileChange}
                />
              </div>

              {/* Assignment Details */}
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <label className="block text-gray-700">For</label>
                  <select
                    className="w-full px-3 py-2 border rounded text-sm"
                    value={assignTo}
                    onChange={(e) => setAssignTo(e.target.value)}
                  >
                    <option>This Class</option>
                    <option>All Classes</option>
                    <option>Specific Classes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Points</label>
                  <select
                    className="w-full px-3 py-2 border rounded text-sm"
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                  >
                    <option>100</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Due</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border rounded text-sm"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end mt-6 space-x-3">
                <button
                  type="button"
                  onClick={handleCloseClick}
                  className="px-5 py-2 bg-gray-300 text-black-700 rounded text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-500 text-black-700 rounded text-sm hover:bg-blue-600"
                >
                  Assign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classwork;
