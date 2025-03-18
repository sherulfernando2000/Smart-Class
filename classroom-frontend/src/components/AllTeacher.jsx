import React, { useState } from 'react'

function AllTeacher() {
  const [showPopup, setShowPopup] = useState(false);

  const handleAddTeacher = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
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
        />
        <button
          onClick={handleAddTeacher}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Teacher
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-[1000]">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Teacher</h2>
              <button
                onClick={handleClosePopup}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Full Name</label>
                <input type="text" className="border p-2 rounded w-full" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input type="email" className="border p-2 rounded w-full" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Phone Number</label>
                <input type="text" className="border p-2 rounded w-full" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Subjects</label>
                <input type="text" className="border p-2 rounded w-full" placeholder="e.g., Math, Science" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Qualification</label>
                <input type="text" className="border p-2 rounded w-full" placeholder="e.g., MSc in Mathematics" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Experience (Years)</label>
                <input type="number" className="border p-2 rounded w-full" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Image</label>
                <input type="file" className="border p-2 rounded w-full" />
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

      <div>
        <div className="titles flex mb-2">
          <h3 className="image w-1/5 text-center">Image</h3>
          <h3 className="id w-1/5 text-center">Teacher ID</h3>
          <h3 className="name w-1/5 text-center">Name</h3>
          <h3 className="subject w-1/5 text-center">Subjects</h3>
          <h3 className="edit w-1/5 text-center">Edit</h3>
        </div>

        <div className="teachers">
          <div className="teacher flex items-center p-4 border rounded-lg mb-2 hover:bg-gray-200">
            <div className="cart-product flex items-center w-1/5 justify-center">
              <img className="w-10 h-10 rounded-full" alt="Teacher" />
            </div>
            <div className="w-1/5 text-center">
              <h3 className="text-lg font-semibold">TCH2025</h3>
            </div>
            <div className="w-1/5 text-center">
              <h3 className="text-lg font-semibold">John Doe</h3>
            </div>
            <div className="w-1/5 text-center">
              <p className="text-gray-600">Math, Physics</p>
            </div>
            <div className="edit w-1/5 text-center">
              <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                View
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllTeacher
