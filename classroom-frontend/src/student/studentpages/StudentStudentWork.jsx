import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa"; // Import PDF icon

const StudentStudentWork = () => {
    const location = useLocation();
    const { assignment, classId } = location.state || {}; // Retrieve assignment and classId from state
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

    const handleBackClick = () => {
        navigate(`/studentindexclass/studentclass/${classId}`); // Navigate back to the relevant ClassPage
    };

    const handleAddOrCreateClick = () => {
        setShowPopup(true); // Show the popup form
    };

    const handleClosePopup = () => {
        setShowPopup(false); // Close the popup form
    };

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
                    <h1 className="text-3xl font-semibold">{assignment?.title || "Assignment"}</h1>
                    <h3 className="text-sm text-gray-500">{assignment.uploadedBy}</h3>
                    <h6 className="text-sm text-gray-500">due: {new Date(assignment.dueDate).toLocaleDateString()}</h6>
                    <br />
                    <hr className="bg-black" />
                    <div
                        className="mt-2 text-sm"
                        dangerouslySetInnerHTML={{ __html: assignment?.description || "No instructions available." }}
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
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Work</h2>
                    <p className="text-sm text-gray-600 mb-6">
                        Submit your work here. You can upload files or create new content.
                    </p>
                    <button
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition duration-200"
                        onClick={handleAddOrCreateClick}
                    >
                        
                        <FaFilePdf className="inline-block mr-2" size={14} /> {/* PDF icon */}
                        Add or Create
                    </button>
                </div>
            </div>

            {/* Popup Form */}
            {showPopup && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-[500px] h-[400px]">
                        <h3 className="text-lg font-semibold mb-4">Submit Your Work</h3>
                        <form>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
                                <div className="flex justify-center items-center h-52 border border-gray-300 rounded-md shadow-sm focus-within:ring-blue-500 focus-within:border-blue-500">
                                    <span className="px-3 text-gray-500">
                                        <FaFilePdf className="text-xl" />
                                    </span>
                                    <input
                                        type="file"
                                        id="file-upload"
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="py-2 px-4 text-sm text-white bg-blue-500 rounded-md text-center cursor-pointer hover:bg-blue-600"
                                    >
                                        Browse
                                    </label>
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
