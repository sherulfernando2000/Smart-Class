import React, { useState } from "react";
import { FaEdit, FaLink } from "react-icons/fa";
import background from "../../assets/img/Honors.jpg";

const Announcement = ({ id }) => {
    const [showForm, setShowForm] = useState(false);

    const handleFormToggle = () => {
        setShowForm(!showForm);
    };

   

    return (
        <div className="container mx-auto p-6">
            {/* Card for class name and subject with edit icon */}
            <div className="p-4 bg-white rounded shadow mb-4 flex justify-between items-center bg-cover bg-center" style={{ backgroundImage: `url(${background})`}}>
                <div className="bg-white bg-opacity-75 p-4 rounded">
                    <h1 className="text-2xl font-bold mb-2">Class {id} Announcements</h1>
                    <h2 className="text-xl font-semibold">Subject: Advanced API Development</h2>
                </div>
                <FaEdit className="text-gray-600 cursor-pointer" />
            </div>

            {/* Card to pop up a form */}
            <div className="p-4 bg-white rounded shadow mb-4 cursor-pointer border-2" onClick={handleFormToggle}>
                <h2 className="text-xl font-semibold">Add New Announcement</h2>
            </div>

            {showForm && (
                <div className="p-4 bg-white rounded shadow mb-4 border-2">
                    <textarea className="w-full p-2 border rounded mb-2" rows="4" placeholder="Write your announcement..."></textarea>
                    <div className="flex items-center">
                        <FaLink className="text-gray-600 mr-2" />
                        <input type="file" className="border p-2 rounded text-sm from-neutral-950"  />
                        <button className="bg-green-700 hover:bg-green-900 text-white px-4 py-1 rounded ml-auto ">Post</button>
                    </div>
                </div>
            )}

            {/* Card to show previous announcements */}
            <div className="p-4 bg-white rounded shadow border-2">
                <h2 className="text-xl font-semibold mb-2">Previous Announcements</h2>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">SHERUL FERNANDO</h3>
                    <p className="text-gray-600">12:24</p>
                    <p className="mt-2">Dear Students,</p>
                    <p className="mt-2">
                        We would like to inform you that the ITS 1114 - Advanced API Development module was successfully concluded last week. As we move forward, please focus on your ITS 1114 - Advanced API Development coursework on next week.
                    </p>
                    <p className="mt-2">
                        Additionally, we will update you soon regarding the Third Semester start dates.
                    </p>
                </div>
                {/* Add more previous announcements here */}
            </div>
        </div>
    );
};

export default Announcement;
