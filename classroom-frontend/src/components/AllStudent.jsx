import React, { useState } from "react";

function AllStudent() {
  const [showPopup, setShowPopup] = useState(false);

  const handleAddStudent = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">All Student</h1>

      {/* Search bar and button to Add student */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search student..."
          className="border p-2 rounded w-3/4"
        />
        <button
          onClick={handleAddStudent}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Student
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center top-5 z-[1000]">
          <div className="bg-white p-8 rounded-lg shadow-lg w-2/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-center">ADD STUDENT</h2>
              <button
                onClick={handleClosePopup}
                className="text-balck-500 hover:bg-red-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
              </button>
            </div>
            <form>
              {/* first row */}
              <div className="flex gap-3">
                <div className="mb-4 w-1/2">
                  <label className="block text-balck-700">Full Name</label>
                  <input type="text" className="border p-2 rounded w-full border-gray-300" />
                </div>

                <div className="mb-4 w-1/2">
                  <label className="block text-balck-700">Contact</label>
                  <input type="text" className="border p-2 rounded w-full border-gray-300" />
                </div>
              </div>

              {/*secnd row  */}
              <div className="flex gap-3">
                <div className="mb-4 w-1/2">
                  <label className="block text-black">Date of Birth</label>
                  <input type="text" className="border p-2 rounded w-full border-gray-300" />
                </div>

                <div className="mb-4 w-1/2">
                  <label className="block text-balck-700">Gender</label>
                  <input type="text" className="border p-2 rounded w-full border-gray-300" />
                </div>
              </div>

              <div className="flex gap-3">
                <div className="mb-4 w-1/2">
                  <label className="block text-balck-700">Parent Name</label>
                  <input type="text" className="border p-2 rounded w-full border-gray-300" />
                </div>

                <div className="mb-4 w-1/2">
                  <label className="block text-balck-700">Parent contact</label>
                  <input type="text" className="border p-2 rounded w-full border-gray-300" />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-balck-700">Address</label>
                <input type="text" className="border p-2 rounded w-full border-gray-300" />
              </div>

              <div className="mb-4">
                <label className="block text-balck-700">Image</label>
                <div className="w-40 h-40 border-2 border-gray-300 rounded flex items-center justify-center relative cursor-pointer">
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    onChange={(e) => console.log(e.target.files[0])} // Handle file upload
                  />
                  <label
                    htmlFor="fileInput"
                    className="absolute inset-0 flex items-center justify-center text-balck-600 font border-gray-300 hover:bg-gray-200"
                  > <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                    Upload Photo
                  </label>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="border-b-2 black"></div>

      <div className="relative top-8">
        <div className="titles flex mb-2 font-medium  ">
          <h3 className="image w-1/4 text-center ">Image</h3>
          <h3 className="image w-1/4 text-center">Student Id</h3>
          <h3 className="name w-1/4 text-center">Name</h3>
          <h3 className="phone-number w-1/4 text-center">Phone Number</h3>
          <h3 className="edit w-1/4 text-center">Edit</h3>
        </div>

        <div className="students">
          <div className="student flex items-center p-4 border rounded-lg mb-2 hover:bg-gray-200">
            <div className="cart-product flex items-center w-1/4 justify-center">
              <img className="w-5 h-5 rounded-full" alt="{image}" />
            </div>
            <div className="w-1/4 text-center">
              <h3 className="text-sm ">20251001</h3>
            </div>
            <div className="w-1/4 text-center">
              <h3 className="text-sm ">Sherul</h3>
            </div>
            <div className="w-1/4 text-center">
              <p className="text-balck-600 text-sm ">0778626300</p>
            </div>
            <div className="edit w-1/4 text-center text-sm">
              <button className="bg-blue-500 text-white px-4 py-1 rounded mr-2">
                View
              </button>
              <button className="bg-red-500 text-white px-4 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllStudent;
