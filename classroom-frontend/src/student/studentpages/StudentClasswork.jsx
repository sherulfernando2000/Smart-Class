import React, { useState,useEffect} from "react";
import { FaPlus,FaClipboard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentClasswork = ({ id }) => {
    const [showForm, setShowForm] = useState(false);
    const [assignments, setAssignments] = useState([]);
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


  const handleCardClick = (assignment) => {
    navigate(`/studentindexclass/student-work/${assignment.assignmentId}`, {
      state: { assignment, classId: id },
    }); // Pass assignment details and class ID
  };


  return (
    <div className="p-2">
      {/* Create Button
      <button
        className="flex items-center px-4 py-2 bg-blue-500 text-white text-sm rounded"
        onClick={handleCreateClick}
      >
        <FaPlus className="mr-2" size={14} /> Create
      </button> */}

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
                  <h6 className=" text-sm">
                    due date:{" "}
                    {new Date(assignment.dueDate).toLocaleDateString()}
                  </h6>
                </div>
                <p className="text-xs text-gray-500">
                  Posted by {assignment.uploadedBy}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

     
    </div>
  );
};

export default StudentClasswork;
