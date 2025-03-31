import React, { useState, useEffect } from "react";
import { FaEdit, FaLink, FaEllipsisV } from "react-icons/fa";
import background from "../../assets/img/Honors.jpg";
import axios from "axios";
import ProfilePicture from "../../components/ProfilePicture";
     

const StudentAnnouncement = ({ id }) => {
    const [showForm, setShowForm] = useState(false);
    const [announcements, setAnnouncements] = useState([]);
    const [classData, setClassData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [menuOpen, setMenuOpen] = useState(null);

    const handleFormToggle = () => {
        setShowForm(!showForm);
    };

    const fetchAnnouncements = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/v1/announcement/byClass/${id}`,
            {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            }
          );
          setAnnouncements(response.data.data);
        } catch (error) {
          console.error("Failed to fetch announcements", error);
        }
      };
    
      useEffect(() => {
        const fetchClassDetails = async () => {
          try {
            const response = await axios.get(
              `http://localhost:8080/api/v1/class/get/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  "Content-Type": "application/json",
                },
              }
            );
            setClassData(response.data);
          } catch (error) {
            setError("Failed to fetch class details");
          } finally {
            setLoading(false);
          }
        };
    
        fetchClassDetails();
        fetchAnnouncements();
      }, [id]);
   

    return (
        <div className="container mx-auto p-6">
            {/* Card for class name and subject with edit icon */}
            <div className="p-4 bg-white rounded shadow mb-4 flex justify-between items-center bg-cover bg-center" style={{ backgroundImage: `url(${background})`}}>
                <div className="bg-white bg-opacity-75 p-4 rounded">
                    <h1 className="text-2xl font-bold mb-2"> Announcements</h1>
                    <h2 className="text-xl font-semibold">{`${classData?.className ?? ""} ${classData?.subject ?? ""}`}</h2>
                </div>
                <FaEdit className="text-gray-600 cursor-pointer" />
            </div>

            {/* Card to pop up a form */}
            <div className="p-4 bg-white rounded shadow mb-4 cursor-pointer border-2" onClick={handleFormToggle}>
                <h2 className="text-xl font-semibold">Add Comment</h2>
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

        
        {/* Announcements List */}
        <div className="p-4 bg-white rounded shadow border-2">
          <h2 className="text-xl font-semibold mb-2">Previous Announcements</h2>
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <div
                key={announcement.announcementId}
                className="mb-4 p-4 border rounded relative"
              >
                {/* User & Date */}
                <div className="flex items-center mb-2 gap-2">
                  <ProfilePicture name={announcement.email} />
                  <h3 className="text-lg font-semibold">
                    {announcement.fullName}
                  </h3>
                  <h6 className="text-gray-600 text-xs">
                    {new Date(announcement.postedAt).toLocaleString()}
                  </h6>
                  <FaEllipsisV
                    className="ml-auto cursor-pointer"
                    onClick={() =>
                      setMenuOpen(
                        menuOpen === announcement.announcementId
                          ? null
                          : announcement.announcementId
                      )
                    }
                  />
                </div>

                Dropdown Menu
                {menuOpen === announcement.announcementId && (
                  <div className="absolute right-4 top-8 bg-white shadow-md rounded-md border p-2">
                    <p
                      className="cursor-pointer hover:bg-gray-200 p-2"
                    //   onClick={() => handleEdit(announcement)}
                    >
                      Report
                    </p>
                    
                  </div>
                )}

                {/* Announcement Content */}
                <div
                  className="mt-2 text-sm"
                  dangerouslySetInnerHTML={{ __html: announcement.message }}
                />

                {/* Show File Preview if Available */}
                {announcement.fileUrl && (
                  <div className="mt-2 p-2 border rounded bg-gray-100">
                    <p className="font-semibold">Attached File:</p>
                    <a
                      href={`http://localhost:8080/api/v1/announcement/file/${announcement.fileUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      File
                    </a>
                    <img
                      src={`http://localhost:8080/api/v1/announcement/file/${announcement.fileUrl}`}
                      className="w-20 h-20 mt-2 rounded"
                      alt="Attachment"
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No announcements yet.</p>
          )}
        </div>
        </div>
    );
};

export default StudentAnnouncement;
