import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Announcement from "./TeacherAnnouncement"; // Import the Announcement component
import People from "./TeacherPeople"; // Import the People component
import Classwork from "./TeacherClasswork"; // Import the Classwork component

const TeacherClassPage = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("streams");

    const renderTabContent = () => {
        switch (activeTab) {
            case "streams":
                return (
                    <div className="p-4 bg-white rounded shadow">
                        <Announcement id={id} /> {/* Load Announcement component */}
                    </div>
                );
            case "people":
                return (
                    <div className="p-4 bg-white rounded shadow">
                        <People id={id} /> {/* Load People component */}
                    </div>
                );
            case "classwork":
                return (
                    <div className="p-4 bg-white rounded shadow">
                        <Classwork id={id} /> {/* Load Classwork component */}
                    </div>
                );
            case "payment":
                return (
                    <div class="p-4 bg-white rounded shadow">
                        <h2 class="text-xl font-semibold mb-4">Payment</h2>
                        {/* Add payment form and list of payments here */}
                    </div>
                );
            case "attendance":
                return (
                    <div class="p-4 bg-white rounded shadow">
                        <h2 class="text-xl font-semibold mb-4">Attendance</h2>
                        {/* Add attendance form and list of attendance records here */}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="tabs mb-6">
                <button
                    className={`px-4 py-2 mr-2 rounded ${activeTab === "streams" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setActiveTab("streams")}
                >
                    Streams
                </button>
                <button
                    className={`px-4 py-2 mr-2 rounded ${activeTab === "people" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setActiveTab("people")}
                >
                    People
                </button>
                <button
                    className={`px-4 py-2 mr-2 rounded ${activeTab === "classwork" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setActiveTab("classwork")}
                >
                    Classwork
                </button>
                <button
                    className={`px-4 py-2 mr-2 rounded ${activeTab === "payment" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setActiveTab("payment")}
                >
                    Payment
                </button>
                <button
                    className={`px-4 py-2 mr-2 rounded ${activeTab === "attendance" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setActiveTab("attendance")}
                >
                    Attendance
                </button>
            </div>
            {renderTabContent()}
            
        </div>
    );
};

export default TeacherClassPage;