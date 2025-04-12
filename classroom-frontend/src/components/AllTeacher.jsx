import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfilePicture from "./ProfilePicture";
import { ToastContainer, toast } from "react-toastify";
import { FaUserPlus } from "react-icons/fa";
import LoadingOverlay from './LoadingOverlay'; 

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
  const [isSaving, setIsSaving] = useState(false); 

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

  // const testTost = ()=>{
  //   console.log("button clicked")
  //   toast.success("student saved");
  // }
  // const [formData, setFormData] = useState({
  //   fullName: '',
  //   email: '',
  //   contact: '',
  //   address: '',
  //   subject: '',
  //   specialization: '',
  // });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!contact.trim()) {
      newErrors.contact = "Contact is required";
    } else if (!/^\d{10}$/.test(contact)) {
      newErrors.contact = "Contact must be 10 digits";
    }

    if (!address.trim()) newErrors.address = "Address is required";
    if (!subject.trim()) newErrors.subject = "Subject is required";
    if (!specialization.trim())
      newErrors.specialization = "Specialization is required";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("click save");

    const teacherData = {
      fullName,
      contact,
      address,
      email,
      specialization,
      subject,
    };

    try {
      setIsSaving(true);
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

      console.log("response", resp.data);

      if (resp.data.code === 201) {
        toast.success("Teacher saved successfully");
        alert(
          "Teacher added successfully\n" +
            "email:  " +
            resp.data.data.email +
            "\npassword:  " +
            resp.data.data.password
        );
        setShowPopup(false);
        fetchTeacher();
        // Reset form
        setFullName("");
        setEmail("");
        setContact("");
        setAddress("");
        setSubject("");
        setSpecialization("");
        setErrors({});
      } else {
        alert("Teacher not added");
      }
    } catch (error) {
      console.error("Teacher not added:", error);

      if (error.response && error.response.data) {
        const err = error.response.data;
        const errorMessages = Object.entries(err.data || {})
          .map(([field, msg]) => `${field}: ${msg}`)
          .join("\n");

        toast.error("Teacher not added. Check your inputs.");
        console.log(errorMessages);
      } else {
        alert("Teacher not added due to unexpected error.");
      }
    }finally{
      setIsSaving(false); 
    }
  };

  // -----------------------------------saveTeacher---------------------------------------------------------------
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("click save ");

  //   const teacherData = {
  //     fullName: fullName,
  //     contact: contact,
  //     address: address,
  //     email: email,
  //     specialization: specialization,
  //   };

  //   try {
  //     const resp = await axios.post(
  //       "http://localhost:8080/api/v1/teacher/save",
  //       teacherData,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );

  //     console.log("response", resp.data);

  //     if (resp.data.code === 201) {
  //       toast.success("Teacher saved successfully");
  //       alert(
  //         "Teacher added successfully\n" +
  //           "email:  " +
  //           resp.data.data.email +
  //           "\npassword:  " +
  //           resp.data.data.password
  //       );
  //       setShowPopup(false);
  //       fetchTeacher();
  //     } else {
  //       alert("Teacher not added");
  //     }
  //   } catch (error) {
  //     console.error("Teacher not added:", error);

  //     if (error.response && error.response.data) {
  //       const err = error.response.data;
  //       const errorMessages = Object.entries(err.data || {})
  //         .map(([field, msg]) => `${field}: ${msg}`)
  //         .join("\n");

  //       // alert("Validation Failed:\n" + errorMessages);
  //       toast.error("Teacher not added. Check your inputs.\n");
  //     } else {
  //       alert("Teacher not added due to unexpected error.");
  //     }
  //   }
  // };

  useEffect(() => {
    fetchTeacher();
  }, []);

  // -----------------------------------loadTeacher---------------------------------------------------------------
  const fetchTeacher = async () => {
    try {
      const resp = await axios.get(
        "http://localhost:8080/api/v1/teacher/getAll"
      );
      console.log("resp " + resp.data.data[0].teacherId);
      setTeachers(resp.data.data);
    } catch (error) {
      alert("Teacher not loaded:" + error);
    }
  };

  // -----------------------------------viewTeacher---------------------------------------------------------------
  const handleViewTeacher = async (teacherId) => {
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
  };

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
      toast.success("Teacher updated successfully");
      fetchTeacher();
      setShowViewPopup(false);
    } catch (err) {
      console.error("Error updating Teacher:", err);
      toast.error("Teacher not updated")
    }
  };

  // -----------------------------------deleteTeacher---------------------------------------------------------------
  const handleDeleteTeacher = async (teacherId) => {
    toast(
      (t) => (
        <span className="text-sm">
          Are you sure you want to delete this teacher?
          <div className="mt-2 flex gap-2 justify-end">
            <button
              onClick={async () => {
                toast.dismiss(t.id); // Close the toast
  
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
                  toast.success("Teacher deleted successfully");
                  console.log("response", resp);
                } catch (err) {
                  console.error("Error:", err);
                  toast.error("Failed to delete Teacher.");
                }
              }}
              className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 bg-gray-300 text-black rounded text-xs hover:bg-gray-400"
            >
              No
            </button>
          </div>
        </span>
      ),
      {
        duration: 10000, // how long it stays if not dismissed
      }
    );
  };
  

  return (
    
    <div className="p-4">
      <LoadingOverlay isLoading={isSaving} message="Saving..." />
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

        {/* <button onClick={testTost}>Click</button> */}
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center top-5 z-[1000]">
          <div className="bg-white p-8 rounded-lg shadow-lg w-2/3">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center justify-center gap-3 mb-6">
                <FaUserPlus className="text-black-600 text-2xl" />
                <h2 className="text-2xl font-bold text-gray-800">
                  Add Teacher
                </h2>
              </div>
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
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-md"
            >
              {[
                {
                  label: "Full Name",
                  value: fullName,
                  set: setFullName,
                  name: "fullName",
                },
                {
                  label: "Email",
                  value: email,
                  set: setEmail,
                  name: "email",
                },
                {
                  label: "Contact",
                  value: contact,
                  set: setContact,
                  name: "contact",
                },
                {
                  label: "Address",
                  value: address,
                  set: setAddress,
                  name: "address",
                },
                {
                  label: "Subject",
                  value: subject,
                  set: setSubject,
                  name: "subject",
                },
                {
                  label: "Specialization",
                  value: specialization,
                  set: setSpecialization,
                  name: "specialization",
                },
              ].map(({ label, value, set, name }) => (
                <div key={name} className="w-full">
                  <label className="block text-gray-700 font-medium mb-1">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => {
                      set(e.target.value);
                      setErrors((prev) => ({ ...prev, [name]: "" }));
                    }}
                    className={`w-full px-4 py-2 border rounded-lg shadow-sm transition-all duration-150 focus:outline-none ${
                      errors[name]
                        ? "border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:ring-2 focus:ring-blue-400"
                    }`}
                  />
                  {errors[name] && (
                    <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                  )}
                </div>
              ))}

              <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200 shadow-md"
                >
                  Submit
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
          {teachers
            .filter((teacher) => {
              const searchTerm = search.toLowerCase();
              return (
                searchTerm === "" || // If search is empty, show all students
                teacher.fullName.toLowerCase().includes(searchTerm) || // Match name
                teacher.contact.includes(searchTerm) || // Match contact
                teacher.teacherId.toString().includes(searchTerm) // Match student ID
              );
            })
            .map((teacher) => (
              <div
                key={teacher.teacherId}
                className="teacher flex items-center p-4 border rounded-lg mb-2 hover:bg-gray-200"
              >
                <div className="cart-product flex items-center w-1/5 justify-center">
                  {/* <img className="w-10 h-10 rounded-full" alt="Teacher" /> */}
                  <ProfilePicture name={teacher.fullName} />
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
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => {
                      handleViewTeacher(teacher.teacherId);
                    }}
                  >
                    View
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
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

            <form className="text-sm p-6 bg-white rounded-lg shadow-md space-y-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Update Teacher Details
              </h2>

              <div className="md:flex gap-4">
                <div className="mb-4 w-full">
                  <label className="block text-gray-700 mb-1">Teacher ID</label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-100"
                    value={selectedTeacher.teacherId}
                    readOnly
                  />
                </div>
                <div className="mb-4 w-full">
                  <label className="block text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
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

              <div className="md:flex gap-4">
                <div className="mb-4 w-full">
                  <label className="block text-gray-700 mb-1">Contact</label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    value={selectedTeacher.contact}
                    onChange={(e) =>
                      setSelectedTeacher({
                        ...selectedTeacher,
                        contact: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-4 w-full">
                  <label className="block text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
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

              <div className="md:flex gap-4">
                <div className="mb-4 w-full">
                  <label className="block text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="border p-2 rounded w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    value={selectedTeacher.email}
                    onChange={(e) =>
                      setSelectedTeacher({
                        ...selectedTeacher,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-4 w-full">
                  <label className="block text-gray-700 mb-1">
                    Specialization
                  </label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
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

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded transition duration-200"
                >
                  Update
                </button>

                <button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition duration-200"
                >
                  Print ID
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
