import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const Classwork = ({ id }) => {
    const [showForm, setShowForm] = useState(false);

    const handleCreateClick = () => {
        setShowForm(true);
    };

    const handleCloseClick = () => {
        setShowForm(false);
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

            {/* Popup Form */}
            {showForm && (
                <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 z-[1000]">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl relative top-5">
                        {/* Header */}
                        <div className="flex justify-between items-center border-b pb-2">
                            <h2 className="text-lg font-medium">Assignment</h2>
                            <button onClick={handleCloseClick} className="text-gray-500 hover:text-gray-700 text-xl">
                                &times;
                            </button>
                        </div>

                        {/* Assignment Form */}
                        <form className="mt-4">
                            {/* Title & Instructions */}
                            <div className="bg-gray-100 p-4 rounded">
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border-b text-sm focus:outline-none bg-transparent"
                                    placeholder="Title"
                                />
                                <textarea
                                    className="w-full px-3 py-2 mt-2 border-b text-sm focus:outline-none bg-transparent"
                                    placeholder="Instructions (optional)"
                                    rows="2"
                                />
                            </div>

                            {/* Upload File */}
                            <div className="my-3">
                                <label className="block text-gray-700">Upload File</label>
                                <input type="file" className="w-full px-3 py-2 border rounded text-sm" />
                            </div>

                            {/* Assignment Details */}
                            <div className="grid grid-cols-2 gap-4 mt-3">
                                <div>
                                    <label className="block text-gray-700">For</label>
                                    <select className="w-full px-3 py-2 border rounded text-sm">
                                        <option>Grade 9 (2025)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700">Assign to</label>
                                    <button className="w-full px-3 py-2 border rounded text-blue-600 text-sm">
                                        👥 All students
                                    </button>
                                </div>
                                <div>
                                    <label className="block text-gray-700">Points</label>
                                    <select className="w-full px-3 py-2 border rounded text-sm">
                                        <option>100</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700">Due</label>
                                    <input type="date" className="w-full px-3 py-2 border rounded text-sm"/>
                                </div>
                                <div>
                                    <label className="block text-gray-700">Topic</label>
                                    <select className="w-full px-3 py-2 border rounded text-sm">
                                        <option>No topic</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700">Rubric</label>
                                    <button className="w-full px-3 py-2 border rounded text-gray-600 text-sm">
                                        + Rubric
                                    </button>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end mt-6 space-x-3">
                                <button
                                    type="button"
                                    onClick={handleCloseClick}
                                    className="px-5 py-2 bg-gray-300 text-gray-700 rounded text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-gray-300 text-gray-700 rounded text-sm"
                                >
                                    Assign
                                </button>
                                <button className="px-4 py-2 bg-blue-500 text-white rounded text-sm">
                                    ⬇️
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
