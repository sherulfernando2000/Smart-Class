import React, { useState, useEffect } from 'react';
import { FaUser, FaMailBulk, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import { toast } from "react-toastify";

function UserSetting() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    role: '',
  });

  // Fetch user details on page load
  useEffect(() => {
    const email = localStorage.getItem('email'); 
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/user/get/${email}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("uset",response.data.data)
        setUserDetails(response.data.data);
      } catch (err) {
        console.error('Failed to fetch user details:', err);
      }
    };

    fetchUserDetails();
  }, []);

  const handlePasswordSubmit = async (e) => {
    const email = localStorage.getItem('email');
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }
    try {
      await axios.post('http://localhost:8080/api/v1/user/change-password', {
        email,
        currentPassword,
        newPassword,
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
      toast.success("Password changed successfully!");
      console.log('Password changed successfully!');
      setShowPasswordModal(false);
    } catch (err) {
      setError('Failed to change password. Please try again.');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-2xl border-2 border-gray-300 ">
      <h1 className="text-2xl font-bold mb-2">Your Profile</h1>
      <p className="text-gray-500 mb">Please update your profile settings here.Student only can change there password</p>
      <p className="text-gray-500 mb-6">Only teachers can change there other details</p>
      <form className="space-y-6">
        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <div className="flex items-center border rounded-full px-4 py-2 bg-blue-300">
            <FaUser className="text-gray-500 mr-3" />
            <input
              type="text"
              value={userDetails.name}
              className="bg-transparent outline-none flex-1"
              readOnly
            />
          </div>
          <p className='text-xs text-gray-500'>This will be how your name will be displayed in the account section and in reviews</p>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="flex items-center border rounded-full px-4 py-2 bg-blue-300">
            <FaMailBulk className="text-gray-500 mr-3" />
            <input
              type="text"
              value={userDetails.email}
              className="bg-transparent outline-none flex-1"
              readOnly
            />
          </div>
          <p className='text-xs text-gray-500'>All notifications are send to this email</p>
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <div className="flex items-center border rounded-full px-4 py-2 bg-blue-300">
            <FaUser className="text-gray-500 mr-3" />
            <input
              type="text"
              value={userDetails.role}
              className="bg-transparent outline-none flex-1"
              readOnly
            />
          </div>
        </div>

        {/* Change Password Button */}
        <div>
          <button
            type="button"
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={() => setShowPasswordModal(true)}
          >
            <FaEdit className="mr-2" /> Change the password
          </button>
        </div>
      </form>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input
                  type="password"
                  className="w-full border rounded-lg px-4 py-2 outline-none bg-blue-300"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  className="w-full border rounded-lg px-4 py-2 outline-none bg-blue-300"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  className="w-full border rounded-lg px-4 py-2 outline-none bg-blue-300"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                  onClick={() => setShowPasswordModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserSetting;
