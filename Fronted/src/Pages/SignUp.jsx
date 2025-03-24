import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();  // ✅ Navigation hook

  // Handle Form Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/signup", formData);
      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Welcome!',
          text: 'Sign Up Successfully!',
          showConfirmButton: false,
          timer: 2000
        });
        localStorage.setItem('token', response.data.token);
        navigate('/');
        setFormData({ username: '', email: '', password: '' });
      } else {
        alert("Failed to register");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        alert(error.response.data.message);  //Backend error message
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className='w-full bg-gray-400 h-screen flex justify-center items-center'>
      <div className='bg-gray-700 w-[400px] p-6 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold text-white text-center mb-4'>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder='Enter your username'
            className='w-full bg-gray-300 px-3 py-2 rounded mb-3 outline-none focus:ring-2 focus:ring-blue-500'
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder='Enter your email'
            className='w-full bg-gray-300 px-3 py-2 rounded mb-3 outline-none focus:ring-2 focus:ring-blue-500'
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder='Enter your password'
            className='w-full bg-gray-300 px-3 py-2 rounded mb-3 outline-none focus:ring-2 focus:ring-blue-500'
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition'>
            Sign Up
          </button>
        </form>

        <div className='text-center text-white mt-4'>
          Already have an account?
          <span
            className='text-red-400 cursor-pointer ml-1 hover:underline'
            onClick={() => navigate('/')}
          >
            Log In
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
