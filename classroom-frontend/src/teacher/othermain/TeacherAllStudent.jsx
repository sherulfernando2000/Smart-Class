import { ContactSupportOutlined, Email } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GraduationCap, Search, User } from "lucide-react";

// import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from "../../components/LoadingOverlay"; // Adjust the path as needed
import { toast } from "react-toastify";

function AllStudent() {
  const [showPopup, setShowPopup] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState("");

  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [dob, setDob] = useState(""); // Added missing dob state
  const [gender, setGender] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentContact, setParentContact] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [students, setStudents] = useState([]);

  const [showViewPopup, setShowViewPopup] = useState(false); // New state for view popup
  const [selectedStudent, setSelectedStudent] = useState(null); // Store selected student

  const [search, setSearch] = useState("");

  const [isSaving, setIsSaving] = useState(false); // Add this with your other state declarations

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
      return null;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "SmartClass");

    try {
      setLoading(true);
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dzkqfsaxo/image/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setLoading(false);
      return res.data.secure_url; // Return the URL instead of setting state
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Image upload failed!");
      setLoading(false);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true); // Start loading
    console.log("Save clicked");

    const uploadedImageUrl = await urlUploaded(); // Get the uploaded URL
    if (!uploadedImageUrl) {
      alert("Image upload failed. Cannot submit student data.");
      setIsSaving(false); // Stop loading on error
      return;
    }

    console.log("uploadedImageUrl", uploadedImageUrl);

    const studentData = {
      fullName: fullName,
      contact: contact,
      gender: gender,
      address: address,
      parent_name: parentName,
      parent_contact: parentContact,
      image_url: uploadedImageUrl, // Use the returned URL directly
      email: email,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/student/save",
        studentData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("response", response);
      if (response.data.code === 201) {
        // alert(
        //   `Message: ${response.data.msg}\nEmail: ${response.data.data.email}\nPassword: ${response.data.data.password}`
        // );
        toast.success("student saved successfully");
        setShowPopup(false);
        fetchStudent();
        emptyFields();
      } else {
        toast.error("Failed to add student.");
        // alert("Failed to add student.");
      }
    } catch (error) {
      console.error("Error:", error);
      tost.error("Failed to add student.");
    } finally {
      setIsSaving(false); // Stop loading whether successful or not
    }
  };

  //get student in initialize
  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const reponse = await axios.get(
        "http://localhost:8080/api/v1/student/getAll"
      );
      console.log("response", reponse.data);
      setStudents(reponse.data);
    } catch (error) {
      alert("Failed to fetch student.");
    }
  };

  // delete studetn
  const handleDeleteStudent = async (studentId) => {
    toast(
      (t) => (
        <span className="text-sm">
          Are you sure you want to delete this student?
          <div className="mt-2 flex gap-2 justify-end">
            <button
              onClick={async () => {
                toast.dismiss(t.id); // Close the confirmation toast

                try {
                  const resp = await axios.delete(
                    `http://localhost:8080/api/v1/student/delete/${studentId}`,
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                      },
                    }
                  );
                  fetchStudent(); // Refresh student list
                  toast.success("Student deleted successfully");
                  console.log("response", resp);
                } catch (err) {
                  console.error("Error:", err);
                  toast.error("Failed to delete student.");
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
        duration: 10000,
      }
    );
  };

  //view student
  const handleViewStudent = async (studentId) => {
    console.log("Clicked and View student with ID:", studentId);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/student/get/${studentId}`
      );
      console.log("response", response.data);
      setSelectedStudent(response.data);
      setShowViewPopup(true);
    } catch (error) {
      alert("Failed to fetch student details.");
    }
  };

  const handleCloseViewPopup = () => {
    setShowViewPopup(false);
    setSelectedStudent(null);
  };

  //update student
  const handleUpdate = async () => {
    console.log("click Update student with ID:", selectedStudent.studentId);
    if (!selectedStudent) return;

    const updateStudentData = {
      studentId: selectedStudent.studentId,
      fullName: selectedStudent.fullName,
      contact: selectedStudent.contact,
      address: selectedStudent.address,
      parent_name: selectedStudent.parent_name,
      parent_contact: selectedStudent.parent_contact,
      email: selectedStudent.email,
    };

    try {
      const resp = await axios.put(
        "http://localhost:8080/api/v1/student/update",
        updateStudentData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("response", resp.data);
      toast.success(resp.data.msg);
      fetchStudent();
      setShowViewPopup(false);
    } catch (err) {
      console.error("Error updating student:", err);
      toast.error("Failed to update student.");
    }
  };

  return (
    <div className="p-4">
      <LoadingOverlay isLoading={isSaving} message="Saving..." />
      <h1 className="text-2xl font-bold mb-4 text-center flex items-center justify-center gap-2 text-black">
        <GraduationCap className="w-6 h-6" />
        All Students
      </h1>

      {/* Search bar and button to Add student */}
      <div className="flex justify-between items-end mb-4 flex-wrap gap-4">
        {/* Search Input Section */}
        <div className="flex flex-col w-full sm:w-2/3">
          <label htmlFor="search" className="text-black font-medium mb-1">
            Search
          </label>
          <div className="relative">
            <input
              id="search"
              type="text"
              placeholder="Search student..."
              className="border p-2 pr-10 rounded w-full hover:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-400 transition"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Add Student Button */}
        <button
          onClick={handleAddStudent}
          className="bg-green-500 text-white px-4 py-2 rounded h-fit"
        >
          Add Student
        </button>
      </div>

      {/* Add Student Popup */}
      {showPopup && (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-[1000] p-4">
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
  <div className="flex flex-col w-full">
    <h2 className="text-2xl font-bold flex items-center gap-2 justify-center">
      <User className="w-6 h-6 text-black" />
      ADD STUDENT
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


      {/* Form */}
      <form className="text-sm">
  {/* Input Row Template */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {/* Full Name */}
    <div>
      <label className="block text-black mb-1">Full Name</label>
      <div className="relative">
        <input
          type="text"
          className="bg-blue-200 border border-blue-300 hover:border-blue-500 p-2 pl-10 rounded-full w-full focus:outline-none focus:border-blue-500"
          onChange={(e) => setFullName(e.target.value)}
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M5.121 17.804A8.966 8.966 0 0112 15c2.21 0 4.222.805 5.879 2.134M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
    </div>

    {/* Contact */}
    <div>
      <label className="block text-black mb-1">Contact</label>
      <div className="relative">
        <input
          type="text"
          className=" bg-blue-200 border border-blue-300 hover:border-blue-500 p-2 pl-10 rounded-full w-full focus:outline-none focus:border-blue-500"
          onChange={(e) => setContact(e.target.value)}
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M22 16.92v3a2 2 0 01-2.18 2A19.72 19.72 0 013 5.18 2 2 0 015 3h3a2 2 0 012 1.72c.2 1.38.73 2.68 1.56 3.85a2 2 0 01-.45 2.82L9 12a16 16 0 007 7l1.61-1.61a2 2 0 012.82-.45c1.17.83 2.47 1.36 3.85 1.56A2 2 0 0122 16.92z" />
        </svg>
      </div>
    </div>

    {/* Date of Birth */}
    <div>
      <label className="block text-black mb-1">Date of Birth</label>
      <input
        type="date"
        className="bg-blue-200 border border-blue-300 hover:border-blue-500 p-2 rounded-full w-full focus:outline-none focus:border-blue-500"
        onChange={(e) => setDob(e.target.value)}
      />
    </div>

    {/* Gender */}
    <div>
      <label className="block text-black mb-1">Gender</label>
      <select
        className="bg-blue-200 border border-blue-300 hover:border-blue-500 p-2 rounded-full w-full focus:outline-none focus:border-blue-500"
        onChange={(e) => setGender(e.target.value)}
        value={gender}
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>

    {/* Parent Name */}
    <div>
      <label className="block text-black mb-1">Parent Name</label>
      <input
        type="text"
        className="bg-blue-200 border border-blue-300 hover:border-blue-500 p-2 rounded-full w-full focus:outline-none focus:border-blue-500"
        onChange={(e) => setParentName(e.target.value)}
      />
    </div>

    {/* Parent Contact */}
    <div>
      <label className="block text-black mb-1">Parent Contact</label>
      <input
        type="text"
        className="bg-blue-200 border border-blue-300 hover:border-blue-500 p-2 rounded-full w-full focus:outline-none focus:border-blue-500"
        onChange={(e) => setParentContact(e.target.value)}
      />
    </div>

    {/* Email */}
    <div>
      <label className="block text-black mb-1">Email</label>
      <input
        type="email"
        className="bg-blue-200 border border-blue-300 hover:border-blue-500 p-2 rounded-full w-full focus:outline-none focus:border-blue-500"
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    {/* Address */}
    <div>
      <label className="block text-black mb-1">Address</label>
      <input
        type="text"
        className="bg-blue-200 border border-blue-300 hover:border-blue-500 p-2 rounded-full w-full focus:outline-none focus:border-blue-500"
        onChange={(e) => setAddress(e.target.value)}
      />
    </div>
  </div>

  {/* Image Upload */}
  <div className="mb-4 mt-4">
    <label className="block text-black mb-2">Upload Image</label>
    <div className="w-40 h-40 border-2 border-blue-300 hover:border-blue-500 rounded-full flex items-center justify-center relative overflow-hidden">
      <input
        type="file"
        id="fileInput"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      {preview ? (
        <img
          src={preview}
          alt="Uploaded Preview"
          className="w-full h-full object-cover rounded-full"
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
  <div className="flex justify-end mt-6">
    <button
      type="button"
      className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition"
      onClick={handleSubmit}
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
          {students
            .filter((student) => {
              const searchTerm = search.toLowerCase();
              return (
                searchTerm === "" || // If search is empty, show all students
                student.fullName.toLowerCase().includes(searchTerm) || // Match name
                student.contact.includes(searchTerm) || // Match contact
                student.studentId.toString().includes(searchTerm) // Match student ID
              );
            })
            .map((student) => (
              <div
                key={student.studentId}
                className="student flex items-center p-4 border rounded-lg mb-2 hover:bg-gray-200"
              >
                <div className="w-1/5 flex justify-center">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={student.image_url || "https://via.placeholder.com/40"}
                    alt={student.fullName}
                  />
                </div>
                <div className="w-1/5 text-center">{student.studentId}</div>
                <div className="w-1/5 text-center">{student.fullName}</div>
                <div className="w-1/5 text-center">{student.contact}</div>
                <div className="w-1/5 text-center">
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                    onClick={() => handleViewStudent(student.studentId)}
                  >
                    View
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded"
                    onClick={() => handleDeleteStudent(student.studentId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* View Student Popup */}
      {showViewPopup && selectedStudent && (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-[1000]">
    <div className="bg-white p-8 rounded-lg shadow-lg w-2/3">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-center">Student Details</h2>
        <button
          onClick={handleCloseViewPopup}
          className="hover:bg-red-400 rounded-full p-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
      </div>

      <form className="text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Student ID */}
          <div>
            <label className="block text-black mb-1">Student ID</label>
            <input
              type="text"
              className="bg-blue-200 border border-blue-300 hover:border-blue-500 p-2 pl-10 rounded-full w-full focus:outline-none focus:border-blue-500"
              value={selectedStudent.studentId}
              readOnly
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-black mb-1">Full Name</label>
            <input
              type="text"
              className="bg-blue-200 border border-blue-300 hover:border-blue-500 p-2 pl-10 rounded-full w-full focus:outline-none focus:border-blue-500"
              value={selectedStudent.fullName}
              onChange={(e) =>
                setSelectedStudent({ ...selectedStudent, fullName: e.target.value })
              }
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-black mb-1">Contact</label>
            <input
              type="text"
              className="bg-blue-200 border border-blue-300 hover:border-blue-500 p-2 pl-10 rounded-full w-full focus:outline-none focus:border-blue-500"
              value={selectedStudent.contact}
              onChange={(e) =>
                setSelectedStudent({ ...selectedStudent, contact: e.target.value })
              }
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-black mb-1">Gender</label>
            <input
              type="text"
              className="bg-blue-200 border border-blue-300 hover:border-blue-500 p-2 pl-10 rounded-full w-full focus:outline-none focus:border-blue-500"
              value={selectedStudent.gender}
              onChange={(e) =>
                setSelectedStudent({ ...selectedStudent, gender: e.target.value })
              }
            />
          </div>

          {/* Parent Name */}
          <div>
            <label className="block text-black mb-1">Parent Name</label>
            <input
              type="text"
              className="bg-blue-200 border border-blue-300 hover:border-blue-500 p-2 pl-10 rounded-full w-full focus:outline-none focus:border-blue-500"
              value={selectedStudent.parent_name}
              onChange={(e) =>
                setSelectedStudent({ ...selectedStudent, parent_name: e.target.value })
              }
            />
          </div>

          {/* Parent Contact */}
          <div>
            <label className="block text-black mb-1">Parent Contact</label>
            <input
              type="text"
              className="bg-blue-200 border border-blue-300 hover:border-blue-500 p-2 pl-10 rounded-full w-full focus:outline-none focus:border-blue-500"
              value={selectedStudent.parent_contact}
              onChange={(e) =>
                setSelectedStudent({ ...selectedStudent, parent_contact: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-black mb-1">Email</label>
            <input
              type="text"
              className="bg-blue-200 border border-blue-300 hover:border-blue-500 p-2 pl-10 rounded-full w-full focus:outline-none focus:border-blue-500"
              value={selectedStudent.email}
              onChange={(e) =>
                setSelectedStudent({ ...selectedStudent, email: e.target.value })
              }
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-black mb-1">Address</label>
            <input
              type="text"
              className="bg-blue-200 border border-blue-300 hover:border-blue-500 p-2 pl-10 rounded-full w-full focus:outline-none focus:border-blue-500"
              value={selectedStudent.address}
              onChange={(e) =>
                setSelectedStudent({ ...selectedStudent, address: e.target.value })
              }
            />
          </div>
        </div>

        {/* Image Preview */}
        <div className="my-4 flex justify-center">
          <img
            className="w-32 h-32 rounded-full object-cover border border-gray-300"
            src={selectedStudent.image_url || "https://via.placeholder.com/100"}
            alt={selectedStudent.fullName}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition"
            onClick={handleUpdate}
          >
            Update
          </button>

          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition"
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

export default AllStudent;
