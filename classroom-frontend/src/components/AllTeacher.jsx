import React, { useState,useEffect } from "react";
import axios from "axios";
import ProfilePicture from "./ProfilePicture";

function AllTeacher() {
  const [showPopup, setShowPopup] = useState(false);
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [address, setAddress] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [search, setSearch] = useState("");

  const handleAddTeacher = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleCloseViewPopup = () => {
    setShowViewPopup(false);
    setSelectedTeacher(null);
  };
  // -----------------------------------saveTeacher---------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("click save ");

    const teacherData = {
      fullName: fullName,
      contact: contact,
      address: address,
      email: email,
      specialization: specialization,
    };

    const resp = await axios.post(
      "http://localhost:8080/api/v1/teacher/save",
      teacherData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    try {
      console.log("response", resp.data);
      if (resp.data.code === 201) {
        alert(
          "Teacher added successfully\n" +
            "email:  " +
            resp.data.data.email +
            "\npassword:  " +
            resp.data.data.password
        );
        setShowPopup(false);
        fetchTeacher();
      } else {
        alert("Teacher not added");
      }
    } catch (error) {
      alert("Teacher not added:" + error);
    }
  };

  useEffect(()=>{
    fetchTeacher();
  },[])

  // -----------------------------------loadTeacher---------------------------------------------------------------
  const fetchTeacher = async () => {
    try {
      const resp = await axios.get("http://localhost:8080/api/v1/teacher/getAll");
      console.log("resp " + resp.data.data[0].teacherId);
      setTeachers(resp.data.data);
    } catch (error) {
      alert("Teacher not loaded:" + error);
    }
  };

  // -----------------------------------viewTeacher---------------------------------------------------------------
  const handleViewTeacher =  async (teacherId)=>{
      console.log("Clicked and View Teacher with ID:", teacherId);
          try {
            const response = await axios.get(
              `http://localhost:8080/api/v1/teacher/get/${teacherId}`
            );
            console.log("response", response.data);
            setSelectedTeacher(response.data);
            setShowViewPopup(true);
          } catch (error) {
            alert("Failed to fetch teacher details.");
          }
  }

  
  
  
  // -----------------------------------updateTeacher---------------------------------------------------------------
  const handleUpdate = async () => {
     console.log("click Update Teacher with ID:", selectedTeacher.teacherId);
     if (!selectedTeacher) return;
 
     const updateTeacherData = {
       teacherId: selectedTeacher.teacherId,
       fullName: selectedTeacher.fullName,
       contact: selectedTeacher.contact,
       address: selectedTeacher.address,
       email: selectedTeacher.email,
       specialization: selectedTeacher.specialization,
       
     };
 
     try {
       const resp = await axios.put(
         "http://localhost:8080/api/v1/teacher/update",
         updateTeacherData,
         {
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${localStorage.getItem("token")}`,
           },
         }
       );
       console.log("response", resp.data);
       alert(resp.data.msg);
       fetchTeacher();
       setShowViewPopup(false);
     } catch (err) {
       console.error("Error updating Teacher:", err);
       alert("Failed to update teacher.");
     }
   };

    // -----------------------------------deleteTeacher---------------------------------------------------------------
    const handleDeleteTeacher = async (teacherId) => {
      console.log("clicke delete id "+teacherId);
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this teacher?"
      );
      if (!confirmDelete) return;
  
      try {
        const resp = await axios.delete(
          `http://localhost:8080/api/v1/teacher/delete/${teacherId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        fetchTeacher();
        alert("Teacher deleted successfully");
        console.log("response", resp);
      } catch (err) {
        console.error("Error:", err);
        alert("Failed to delete Teacher.");
      }
    };


  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">All Teachers</h1>

      {/* Search bar and button to Add Teacher */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search teacher..."
          className="border p-2 rounded w-3/4"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={handleAddTeacher}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Teacher
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center top-5 z-[1000]">
          <div className="bg-white p-8 rounded-lg shadow-lg w-2/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-center">ADD TEACHER</h2>
              <button
                onClick={handleClosePopup}
                className="hover:bg-red-400 rounded-full p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="black"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </button>
            </div>
            <form className="text-sm">
              {/* First Row */}
              <div className="flex gap-3">
                <div className="mb-4 w-1/2">
                  <label className="block text-black">Full Name</label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full border-gray-300"
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="mb-4 w-1/2">
                  <label className="block text-black">Email</label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full border-gray-300"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Second Row */}
              <div className="flex gap-3">
                <div className="mb-4 w-1/2">
                  <label className="block text-black">Phone Number</label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full border-gray-300"
                    onChange={(e) => setContact(e.target.value)} // Added onChange handler for dob
                  />
                </div>

                <div className="flex gap-3"></div>

                <div className="mb-4 w-1/2">
                  <label className="block text-black">Address</label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full border-gray-300"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              {/* Third Row */}
              <div className="flex gap-3">
                <div className="mb-4 w-1/2">
                  <label className="block text-black">Subjects</label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full border-gray-300"
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div className="mb-4 w-1/2">
                  <label className="block text-black">specialization</label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full border-gray-300"
                    onChange={(e) => setSpecialization(e.target.value)}
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={handleSubmit} // Added onClick handler for Save button
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

     
      <div className="border-b-2 black"></div>

      <div>
        <div className="titles flex mb-2">
          <h3 className="image w-1/5 text-center">Image</h3>
          <h3 className="id w-1/5 text-center">Teacher ID</h3>
          <h3 className="name w-1/5 text-center">Name</h3>
          <h3 className="subject w-1/5 text-center">Subjects</h3>
          <h3 className="edit w-1/5 text-center">Edit</h3>
        </div>

        <div className="teachers">
          {teachers.filter((teacher) => {
              const searchTerm = search.toLowerCase();
              return (
                searchTerm === "" || // If search is empty, show all students
                teacher.fullName.toLowerCase().includes(searchTerm) || // Match name
                teacher.contact.includes(searchTerm) || // Match contact
                teacher.teacherId.toString().includes(searchTerm) // Match student ID
              );
             
            })
          .map((teacher)=>(
            <div key={teacher.teacherId} className="teacher flex items-center p-4 border rounded-lg mb-2 hover:bg-gray-200">
              <div className="cart-product flex items-center w-1/5 justify-center">
                {/* <img className="w-10 h-10 rounded-full" alt="Teacher" /> */}
                <ProfilePicture name={teacher.fullName}/>
              </div>
              <div className="w-1/5 text-center">
                <h3 className="text-lg font-semibold">{teacher.teacherId}</h3>
              </div>
              <div className="w-1/5 text-center">
                <h3 className="text-lg font-semibold">{teacher.fullName}</h3>
              </div>
              <div className="w-1/5 text-center">
                <p className="text-gray-600">{teacher.contact}</p>
              </div>
              <div className="edit w-1/5 text-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={() => {handleViewTeacher(teacher.teacherId)}}>
                  View
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded" 
                onClick={() => handleDeleteTeacher(teacher.teacherId)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          
        </div>
      </div>

      {showViewPopup && selectedTeacher && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-[1000]">
          <div className="bg-white p-8 rounded-lg shadow-lg w-2/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-center">Teacher Details</h2>
              <button
                onClick={handleCloseViewPopup}
                className="hover:bg-red-400 rounded-full p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="black"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </button>
            </div>

            <form className="text-sm">
              <div className="flex gap-3">
                <div className="mb-4 w-1/2">
                  <label className="block text-black">Teacher ID</label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full border-gray-300"
                    value={selectedTeacher.teacherId}
                    readOnly
                  />
                </div>
                <div className="mb-4 w-1/2">
                  <label className="block text-black">Full Name</label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full border-gray-300"
                    value={selectedTeacher.fullName}
                    onChange={(e) =>
                      setSelectedTeacher({
                        ...selectedTeacher,
                        fullName: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <div className="mb-4 w-1/2">
                  <label className="block text-black">Contact</label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full border-gray-300"
                    value={selectedTeacher.contact}
                    onChange={(e) =>
                      setSelectedTeacher({
                        ...selectedTeacher,
                        contact: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-4 w-1/2">
                  <label className="block text-black">Address</label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full border-gray-300"
                    value={selectedTeacher.address}
                    onChange={(e) =>
                      setSelectedTeacher({
                        ...selectedTeacher,
                        address: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <div className="mb-4 w-1/2">
                  <label className="block text-black">Email</label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full border-gray-300"
                    value={selectedTeacher.email}
                    onChange={(e) =>
                      setSelectedTeacher({
                        ...selectedTeacher,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-4 w-1/2">
                  <label className="block text-black">Specialization</label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full border-gray-300"
                    value={selectedTeacher.specialization}
                    onChange={(e) =>
                      setSelectedTeacher({
                        ...selectedTeacher,
                        specialization: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              

              

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                   onClick={handleUpdate} // Bind the handleUpdate function
                >
                  Update
                </button>

                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Print Id
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default AllTeacher;
