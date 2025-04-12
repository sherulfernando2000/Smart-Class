import React, { useState, useEffect } from "react";
import { FaEdit, FaLink, FaEllipsisV } from "react-icons/fa";
import background from "../../assets/img/Honors.jpg";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ProfilePicture from "../ProfilePicture";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { toast } from "react-toastify";
import LoadingOverlay from '../LoadingOverlay'; 
// import toast from 'react-hot-toast';

const Announcement = ({ id }) => {
  const [showForm, setShowForm] = useState(false);
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [announcementText, setAnnouncementText] = useState("");
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [menuOpen, setMenuOpen] = useState(null);
  const [isSaving, setIsSaving] = useState(false); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setEmail(decodedToken.sub);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

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

  const handleFormToggle = () => {
    setShowForm(!showForm);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  //------------------------------------------Post Announcement--------------------------------------------------------------
  const handlePostAnnouncement = async () => {
    if (!announcementText) {
      alert("Please enter an announcement text");
      return;
    }

    const formData = new FormData();
    formData.append("text", announcementText);
    formData.append("classId", id);
    formData.append("email", email);
    formData.append("file", file);

    try {
      setIsSaving(true); 
      const response = await axios.post(
        "http://localhost:8080/api/v1/announcement/save",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "content-type": "multipart/form-data",
          },
        }
      );
      toast.success("Announcement send successfully")
      console.log(response.data.msg);
      fetchAnnouncements();
      setAnnouncementText("");
      setFile(null);
      setShowForm(false);
    } catch (error) {
      toast.error("Failed to post announcement")
      alert("Failed to post announcement", error.message);
    }finally{
      setIsSaving(false); 
    }
  };

  const handleEdit = (announcement) => {
    setSelectedAnnouncement(announcement);
    setEditedText(announcement.message);
    setEditModalOpen(true);
    setMenuOpen(null);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/v1/announcement/update`,
        { 
          announcementId: selectedAnnouncement.announcementId,
          message: editedText 
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Announcement updated successfully");
      console.log("Announcement updated successfully");
      fetchAnnouncements();
      setEditModalOpen(false);
    } catch (error) {
      toast.error("Failed to update announcement");
      console.error("Failed to update announcement", error);
    }
  };

  const handleDelete = (announcementId) => {
    toast(
      (t) => (
        <div className="text-sm">
          <p>Are you sure you want to delete this announcement?</p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={async () => {
                toast.dismiss(t.id); // Dismiss the toast
                try {
                  await axios.delete(
                    `http://localhost:8080/api/v1/announcement/delete/${announcementId}`,
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                      },
                    }
                  );
                  fetchAnnouncements();
                  toast.success("Announcement deleted successfully!");
                } catch (error) {
                  toast.error("Failed to delete announcement.");
                  console.error("Delete error:", error);
                }
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded text-xs"
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        duration: 10000, // how long the toast stays
      }
    );
  }

  return (
    <div className="container mx-auto p-6">
      <LoadingOverlay isLoading={isSaving} message="Saving..." />
      {/* Class Header */}
      <div
        className="p-4 bg-white rounded shadow mb-4 flex justify-between items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="bg-white bg-opacity-75 p-4 rounded">
          <h1 className="text-2xl font-bold mb-2"> Announcements</h1>
          <h2 className="text-xl font-semibold">{`${classData?.className ?? ""} ${classData?.subject ?? ""}`}</h2>
        </div>
        <FaEdit className="text-gray-600 cursor-pointer" />
      </div>

      {/* Add New Announcement Button */}
      <div
        className="p-4 bg-white rounded shadow mb-4 cursor-pointer border-2"
        onClick={handleFormToggle}
      >
        <h2 className="text-xl font-semibold">Add New Announcement</h2>
      </div>

      {/* Announcement Form */}
      {showForm && (
        <div className="p-4 bg-white rounded shadow mb-4 border-2 ">
          <ReactQuill
            theme="snow"
            value={announcementText}
            onChange={setAnnouncementText}
            placeholder="Write your announcement..."
            className="mb-4"
          />
          <div className="flex items-center">
            <FaLink className="text-gray-600 mr-2" />
            <input
              type="file"
              className="border p-2 rounded text-sm"
              onChange={handleFileChange}
            />
            <button
              className="bg-green-700 hover:bg-green-900 text-white px-4 py-1 rounded ml-auto"
              onClick={handlePostAnnouncement}
            >
              Post
            </button>
          </div>
        </div>
      )}

      {/* Previous Announcements */}
      <div className="container mx-auto p-6">
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

                {/* Dropdown Menu */}
                {menuOpen === announcement.announcementId && (
                  <div className="absolute right-4 top-8 bg-white shadow-md rounded-md border p-2">
                    <p
                      className="cursor-pointer hover:bg-gray-200 p-2"
                      onClick={() => handleEdit(announcement)}
                    >
                      Edit
                    </p>
                    <p
                      className="cursor-pointer hover:bg-gray-200 p-2"
                      onClick={() => handleDelete(announcement.announcementId)}
                    >
                      Delete
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

        {/* Edit Modal */}
        {editModalOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
            onClick={() => setEditModalOpen(false)} // Close modal on background click
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg w-1/2"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              <h2 className="text-xl font-semibold mb-4">Edit Announcement</h2>
              <ReactQuill
                theme="snow"
                value={editedText}
                onChange={setEditedText}
                className="mb-4"
              />
              <button
                className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded"
                onClick={handleSaveEdit}
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcement;
