import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }
    try {
      const response = await axios.put(
        'https://task-app-adqr.onrender.com/api/password',
        { oldPassword, newPassword, confirmPassword },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      Swal.fire({
        icon: 'success',
        title: 'Welcome!',
        text: 'Password Successfully Updated',
        showConfirmButton: false,
        timer: 2000
      });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');

    } catch (error) {
      console.error('Error changing password:', error);
      setError(error.response?.data?.message || "Failed to change password");
    }
  };
  return (
    <div className='flex justify-center items-center min-h-screen p-4'>
    <form
        onSubmit={handleSubmit}
        className="flex flex-col p-6 bg-white rounded-lg shadow-2xl w-full max-w-lg gap-4"
    >
        <h2 className="text-2xl font-bold mb-4 text-center">Change Password</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {message && <p className="text-green-500 text-center">{message}</p>}

        <label className="text-gray-700">Old Password:</label>
        <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Enter your old password"
            className="p-3 border rounded w-full focus:ring-2 focus:ring-blue-500"
            required
        />

        <label className="text-gray-700">New Password:</label>
        <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Create new password"
            className="p-3 border rounded w-full focus:ring-2 focus:ring-blue-500"
            required
        />

        <label className="text-gray-700">Confirm Password:</label>
        <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="p-3 border rounded w-full focus:ring-2 focus:ring-blue-500"
            required
        />

        <button 
            type="submit" 
            className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-300"
        >
            Submit
        </button>
    </form>
</div>

  );
};

export default ChangePassword;
