import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa"; // Import PDF icon
import axios from "axios"; // Import Axios

const StudentStudentWork = () => {
  const location = useLocation();
  const { assignment, classId } = location.state || {}; // Retrieve assignment and classId from state
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [selectedFile, setSelectedFile] = useState(null); // State to store the selected file
  const [submissionDetails, setSubmissionDetails] = useState(null); // State to store submission details

  const studentId = localStorage.getItem("studentId"); // Replace with actual studentId logic
    

  useEffect(() => {
    const fetchSubmissionDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/submission/details`,
          {
            params: {
              assignmentId: assignment?.assignmentId,
              studentId: studentId,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSubmissionDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching submission details:", error);
      }
    };

    if (assignment?.assignmentId && studentId) {
      fetchSubmissionDetails();
    }
  }, [assignment?.assignmentId, studentId]);

  const handleBackClick = () => {
    navigate(`/studentindexclass/studentclass/${classId}`); // Navigate back to the relevant ClassPage
  };

  const handleAddOrCreateClick = () => {
    setShowPopup(true); // Show the popup form
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup form
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Update selected file
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    } else if (!studentId) {
      alert("Student ID is not available.");
      return;
    } else if (!assignment?.assignmentId) {
      alert("Assignment ID is not available.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("assignmentId", assignment?.assignmentId); // Use assignmentId from the passed assignment object
    formData.append("studentId", studentId);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/submission/save",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Submission successful!");
      setShowPopup(false); // Close the popup on success
      setSubmissionDetails(response.data); // Update submission details
    } catch (error) {
      console.error("Error submitting work:", error);
      alert("Failed to submit. Please try again.");
    }
  };


  const handleUnsubmitClick = async (submissionId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/submission/delete/${submissionId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
        }
      );
      alert("Submission deleted successfully!");
      setSubmissionDetails(null); // Clear submission details after deletion
    } catch (error) {
      console.error("Error deleting submission:", error);
      alert("Failed to delete submission. Please try again.");
    }
  }


  return (
    <div className="p-4 space-y-6">
      {/* Back Button */}
      <button
        className="px-4 py-2 border border-blue-100 text-gray-700 rounded-full text-sm hover:bg-blue-100"
        onClick={handleBackClick}
      >
        Back
      </button>

      {/* Cards Container */}
      <div className="flex space-x-4">
        {/* Instruction Card */}
        <div className="p-4 flex-1 rounded-lg shadow">
          <h1 className="text-3xl font-semibold">
            {assignment?.title || "Assignment"}
          </h1>
          <h3 className="text-sm text-gray-500">{assignment.uploadedBy}</h3>
          <h6 className="text-sm text-gray-500">
            due: {new Date(assignment.dueDate).toLocaleDateString()}
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

        {/* Your Work Card */}
        <div className="p-4 w-1/3 bg-gray-50 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-xl font-semibold">Your work</h2>
          <h2 className="font-semibold text-green-800 mb-4">
            {submissionDetails ? "Handed In" : "Assigned"}
          </h2>
          {submissionDetails ? (
            <div className="gap-4 flex flex-col items-center">
              <div className="flex items-center py-2 px-4 rounded-lg shadow border border-gray-300">
                <FaFilePdf className="text-red-500 text-2xl mr-3" />
                <span className="text-sm font-medium text-gray-600">
                  {submissionDetails.url}
                </span>
              </div>
              <button
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition duration-200"
                 onClick={()=>handleUnsubmitClick(submissionDetails.submissionId)} 
              >
                Unsubmit
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-6">
                Submit your work here. You can upload files or create new
                content.
              </p>
              <button
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition duration-200"
                onClick={handleAddOrCreateClick}
              >
                <FaFilePdf className="inline-block mr-2" size={14} />{" "}
                {/* PDF icon */}
                Add or Create
              </button>
            </>
          )}
        </div>
      </div>

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[500px] h-[400px]">
            <h3 className="text-lg font-semibold mb-4">Submit Your Work</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload File
                </label>
                <div className="flex justify-center items-center h-52 border border-gray-300 rounded-md shadow-sm focus-within:ring-blue-500 focus-within:border-blue-500">
                  <div className="flex flex-col justify-center items-center gap-3">
                    <span className="px-3 text-gray-500">
                      <FaFilePdf className="text-xl" />
                    </span>
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="file-upload"
                      className="py-2 px-4 text-sm text-white bg-blue-500 rounded-md text-center cursor-pointer hover:bg-blue-600"
                    >
                      Browse
                    </label>
                    {selectedFile && (
                      <p className="mt-2 text-sm text-gray-600  text-center">
                        Selected File:{" "}
                        <span className="font-bold">{selectedFile.name}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full text-sm hover:bg-gray-400"
                  onClick={handleClosePopup}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentStudentWork;
