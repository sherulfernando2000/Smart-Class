import React, { useState } from 'react';

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
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Student</h2>
              <button onClick={handleClosePopup} className="text-gray-500 hover:text-gray-700">&times;</button>
            </div>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Full Name</label>
                <input type="text" className="border p-2 rounded w-full" />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700">Contact</label>
                <input type="text" className="border p-2 rounded w-full" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Parent Name</label>
                <input type="text" className="border p-2 rounded w-full" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Parent Number</label>
                <input type="text" className="border p-2 rounded w-full" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <input type="text" className="border p-2 rounded w-full" />
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

      <div className='border-b-2 black'></div>

      <div>
        <div className="titles flex mb-2">
          <h3 className="image w-1/4 text-center">Image</h3>
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
              <h3 className="text-lg font-semibold">20251001</h3>
            </div>
            <div className="w-1/4 text-center">
              <h3 className="text-lg font-semibold">Sherul</h3>
            </div>
            <div className="w-1/4 text-center">
              <p className="text-gray-600">0778626300</p>
            </div>
            <div className="edit w-1/4 text-center">
              <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">View</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllStudent;
