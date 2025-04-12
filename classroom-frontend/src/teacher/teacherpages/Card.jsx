import React, { useEffect, useState } from "react";
import axios from "axios";
import background from "../../assets/img/Honors.jpg";
import { FaFileAlt , FaExclamationCircle  } from "react-icons/fa";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

function Card() {
  const [classes, setClasses] = useState([]);
 

  // Fetch classes from backend
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/class/getByEmailT/${localStorage.getItem("email")}`,
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
                <FaFileAlt 
                  className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-700"
                />

                <FaExclamationCircle 
                  className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-700"
                />
              </div>
            </div>
          </div>
        ))
      )}

      
    </div>
  );
}

export default Card;
