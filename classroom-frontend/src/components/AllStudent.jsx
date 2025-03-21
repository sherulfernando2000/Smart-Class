import { Email } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import { ToastContainer, toast } from 'react-toastify';


function AllStudent() {
  const [showPopup, setShowPopup] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageURL,setImageURL] = useState("");

  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [dob, setDob] = useState(""); // Added missing dob state
  const [gender, setGender] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentContact, setParentContact] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [students,setStudents] = useState([]);

  const handleAddStudent = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setImage(null);
    setPreview(null);
  };

  

  // Handle file selection and update preview
  const handleFileChange = (e) => {
   const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const urlUploaded = async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "SmartClass"); 
  
    try {
      setLoading(true);
      const res = await axios.post("https://api.cloudinary.com/v1_1/dzkqfsaxo/image/upload", formData, {
        headers: 
        { "Content-Type": "multipart/form-data"},
      });
      console.log("url",res.data.secure_url);
      setImageURL(res.data.secure_url); // Store Cloudinary URL instead of file object
      setLoading(false);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Image upload failed!");
      setLoading(false);
    }
  };
  

  const emptyFields = () => {
    setFullName("");
    setContact("");
    setDob(""); // Reset dob field
    setGender("");
    setParentName("");
    setParentContact("");
    setAddress("");
    setImage(null);
  };

  // Submit Data to Backend
  const handleSubmit = async (e) => {
    console.log("saved clicked");
    e.preventDefault();
    await urlUploaded(); // Added await to ensure image is uploaded before submitting

    const studentData = {
      full_name: fullName,
      contact: contact,
      gender: gender,
      address: address,
      parent_name: parentName,
      parent_contact: parentContact,
      image_url: imageURL,
      email: email
    };

    try {
      const response = await axios.post("http://localhost:8080/api/v1/student/save", studentData,
        { headers: { 
          "Content-Type": "application/json" ,
           "Authorization":`Bearer ${localStorage.getItem("token")}`
        } }
      );
      console.log("response"+response);
      if (response.data.code === 201) {
        alert("message:" + response.data.msg + "  \nemail:" + response.data.data.email + "  \npassword:" + response.data.data.password);
        setShowPopup(false);
        // Reset fields after submission
        emptyFields();
      } else {
        alert("Failed to add student.");
        
      }
    } catch (error) {
      console.error("Error:", error);
      
    }
  };

  //get student in initialize
  useEffect(() => {
    fetchStudent();
  },[])

  const fetchStudent = async () =>{
    try{
      const reponse = await axios.get("http://localhost:8080/api/v1/student/getAll")
      console.log("response",reponse.data);
      setStudents(reponse.data);

    }catch(error){
        alert("Failed to fetch student.");
  }
  }


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">All Students</h1>

      {/* Search bar and button to Add student */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="🔎 Search student..."
          className="border p-2 rounded w-3/4"
        />
        <button
          onClick={handleAddStudent}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Student
        </button>
      </div>

      {/* Add Student Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center top-5 z-[1000]">
          <div className="bg-white p-8 rounded-lg shadow-lg w-2/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-center">ADD STUDENT</h2>
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
                  <label className="block text-black">Contact</label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full border-gray-300"
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
              </div>

              {/* Second Row */}
              <div className="flex gap-3">
                <div className="mb-4 w-1/2">
                  <label className="block text-black">Date of Birth</label>
                  <input
                    type="date"
                    className="border p-2 rounded w-full border-gray-300"
                    onChange={(e) => setDob(e.target.value)} // Added onChange handler for dob
                  />
                </div>

                <div className="mb-4 w-1/2">
                  <label className="block text-black">Gender</label>
                  <select className="border p-2 rounded w-full border-gray-300"
                    onChange={(e) => setGender(e.target.value)}
                    value={gender}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              {/* Third Row */}
              <div className="flex gap-3">
                <div className="mb-4 w-1/2">
                  <label className="block text-black">Parent Name</label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full border-gray-300"
                    onChange={(e) => setParentName(e.target.value)}
                  />
                </div>

                <div className="mb-4 w-1/2">
                  <label className="block text-black">Parent Contact</label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full border-gray-300"
                    onChange={(e) => setParentContact(e.target.value)}
                  />
                </div>
              </div>

              {/* fourth Row */}
              <div className="flex gap-3">
                <div className="mb-4 w-1/2">
                  <label className="block text-black">Email</label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full border-gray-300"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-4 w-1/2">
                  <label className="block text-black">Address</label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full border-gray-300"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              
              {/* Image Upload */}
              <div className="mb-4">
                <label className="block text-black mb-2">Upload Image</label>
                <div className="w-40 h-40 border-2 border-gray-300 rounded flex items-center justify-center relative cursor-pointer overflow-hidden">
                  {/* Hidden File Input */}
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />

                  {/* Preview Image */}
                  {preview ? (
                    <img
                      src={preview}
                      alt="Uploaded Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <label
                      htmlFor="fileInput"
                      className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 hover:bg-gray-200 transition cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="black"
                      >
                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                      </svg>
                      Upload Photo
                    </label>
                  )}
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

      {/* Student List Section */}
      <div className="relative top-8">
        <div className="titles flex mb-2 font-medium">
          <h3 className="w-1/4 text-center">Image</h3>
          <h3 className="w-1/4 text-center">Student ID</h3>
          <h3 className="w-1/4 text-center">Name</h3>
          <h3 className="w-1/4 text-center">Phone Number</h3>
          <h3 className="w-1/4 text-center">Edit</h3>
        </div>



       
        <div className="students">
          {students.map((student) => (
            <div key={student.studentId} className="student flex items-center p-4 border rounded-lg mb-2 hover:bg-gray-200">
              <div className="w-1/5 flex justify-center">
                <img
                  className="w-10 h-10 rounded-full"
                  src={student.image_url || "https://via.placeholder.com/40"}
                  alt={student.full_name}
                />
              </div>
              <div className="w-1/5 text-center">{student.studentId}</div>
              <div className="w-1/5 text-center">{student.full_name}</div>
              <div className="w-1/5 text-center">{student.contact}</div>
              <div className="w-1/5 text-center">
                <button className="bg-blue-500 text-white px-4 py-1 rounded mr-2">View</button>
                <button className="bg-red-500 text-white px-4 py-1 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>


      </div>
    </div>
  );
}


export default AllStudent;
