import React, { useEffect, useState } from "react";
import axios from "axios";
import background from "../../assets/img/Geography.jpg";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { toast } from "react-toastify";

function Card() {
  const [classes, setClasses] = useState([]);
  const [editClass, setEditClass] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [updatedClassName, setUpdatedClassName] = useState("");
  const [updatedSubject, setUpdatedSubject] = useState("");

  // Fetch classes from backend
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/class/getAll",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setClasses(response.data.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, []);

  // Handle delete class
  const handleDelete = async (classId) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      try {
        await axios.delete(
          `http://localhost:8080/api/v1/class/delete/${classId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setClasses(classes.filter((cls) => cls.classId !== classId));
        toast.success("Class deleted successfully!");
      } catch (error) {
        console.error("Error deleting class:", error);
        alert("Failed to delete class.");
      }
    }
  };

  // Handle update class
  const handleUpdate = (classItem) => {
    setEditClass(classItem);
    setUpdatedClassName(classItem.className);
    setUpdatedSubject(classItem.subject);
    setEditModalOpen(true);
  };
  console.log(handleUpdate); // Should NOT be undefined


  // Submit updated class
  const handleUpdateSubmit = async () => {
    console.log(editClass);
    const idClass = editClass.classId;
    console.log(idClass)
    if (!updatedClassName || !updatedSubject) {
      alert("Class Name and Subject are required.");
      return;
    }

    const updatedClass = {
      classId: idClass,
      className: updatedClassName,
      subject: updatedSubject
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/class/update`,updatedClass,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      alert(`Class Updated: ${response.data.data.className}`);

      // Update the class list without refreshing the page
      setClasses((prevClasses) =>
        prevClasses.map((cls) =>
          cls.classId === editClass.classId
            ? { ...cls, className: updatedClassName, subject: updatedSubject }
            : cls
        )
      );

      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating class:", error);
      alert("Failed to update class.");
    }
  };

  return (
    <div className="grid grid-cols-3 gap-5">
      {classes.length === 0 ? (
        <p className="text-gray-500 text-center col-span-3">
          No classes available.
        </p>
      ) : (
        classes.map((classItem) => (
          <div
            key={classItem.classId}
            className="max-w-xs rounded overflow-hidden shadow hover:bg-slate-200"
          >
            <div className="relative">
              <img className="w-full" src={background} alt="Class Background" />
              <div className="absolute top-0 left-0 p-4">
                <h2 className="text-white text-xl font-bold">
                  {classItem.className}
                </h2>
                <p className="text-white">{classItem.subject}</p>
              </div>
            </div>
            <div className="px-6 py-4 h-32">
              <div className="h-16 overflow-y-auto">
                Welcome to {classItem.subject} class
              </div>
              <div className="flex justify-end items-center h-10 gap-5 border-t-2 p-2">
                <FaEdit
                  className="w-4 h-4 text-blue-500 cursor-pointer hover:text-blue-700"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents unwanted bubbling issues
                    handleUpdate(classItem);
                  }}
                />

                <FaTrash
                  className="w-4 h-4 text-red-400 cursor-pointer hover:text-red-700"
                  onClick={() => handleDelete(classItem.classId)}
                />
              </div>
            </div>
          </div>
        ))
      )}

      {/* Update Class Modal */}
      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Update Class
          </Typography>
          <TextField
            fullWidth
            label="Class Name"
            variant="outlined"
            sx={{ mb: 2 }}
            value={updatedClassName}
            onChange={(e) => setUpdatedClassName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Subject"
            variant="outlined"
            sx={{ mb: 2 }}
            value={updatedSubject}
            onChange={(e) => setUpdatedSubject(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleUpdateSubmit}
          >
            Update Class
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Card;
