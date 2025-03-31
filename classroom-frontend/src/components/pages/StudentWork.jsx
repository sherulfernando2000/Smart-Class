import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa"; // Import PDF icon

const StudentWork = () => {
    const location = useLocation();
    const { assignment, classId } = location.state || {}; // Retrieve assignment and classId from state
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(`/indexclass/class/${classId}`); // Navigate back to the relevant ClassPage
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

            {/* Instruction Card */}
            <div className="p-4  rounded-lg shadow">
                <h1 className="text-3xl font-semibold">{assignment?.title || "Assignment"}</h1>
                <h3 className=" text-sm text-gray-500">{assignment.uploadedBy}</h3>
                <h6 className=" text-sm text-gray-500">due : {new Date(assignment.dueDate).toLocaleDateString()}</h6>
                
                <br />
                <hr className="bg-black"/>
               
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

            {/* Handed In and Assigned Counts */}
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-100 rounded-lg shadow text-center">
                    <h4 className="text-lg font-medium">Handed In</h4>
                    <p className="text-2xl font-bold text-blue-600">0</p>
                </div>
                <div className="p-4 bg-green-100 rounded-lg shadow text-center">
                    <h4 className="text-lg font-medium">Assigned</h4>
                    <p className="text-2xl font-bold text-green-600">0</p>
                </div>
            </div>

            {/* Student Submissions */}
            <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-gray-100 rounded-lg shadow flex justify-between items-center">
                    <span className="text-sm font-medium">John Doe</span>
                    <a
                        href="/path/to/submitted/file.pdf"
                        className="text-blue-500 text-sm underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View Submission
                    </a>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg shadow flex justify-between items-center">
                    <span className="text-sm font-medium">Jane Smith</span>
                    <a
                        href="/path/to/submitted/file.pdf"
                        className="text-blue-500 text-sm underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View Submission
                    </a>
                </div>
            </div>
        </div>
    );
};

export default StudentWork;
