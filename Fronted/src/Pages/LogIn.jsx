import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LogIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://task-app-adqr.onrender.com/api/login", form);

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Welcome!',
          text: 'User successfully logged in!',
          showConfirmButton: false,
          timer: 2000
        });

        // Token को localStorage में सेव करें
        localStorage.setItem('token', response.data.token);

        // // टैब्स को अपडेट करने के लिए localStorage event trigger करें
        // window.dispatchEvent(new Event("storage"));

        // setIsAuthenticated(true);
        navigate('/home');
        setForm({ email: '', password: '' });
      } else {
        Swal.fire('Failed', 'Invalid login details', 'error');
      }
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response) {
        Swal.fire('Error', error.response.data.message, 'error');
      } else {
        Swal.fire('Oops!', 'Something went wrong. Please try again.', 'error');
      }
    }
  };

  return (
    <div className='w-full bg-gray-400 h-screen flex justify-center items-center'>
      <div className='bg-gray-700 w-[400px] p-6 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold text-white text-center mb-4'>Log In</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder='Enter your email'
            className='w-full bg-gray-300 px-3 py-2 rounded mb-3 outline-none focus:ring-2 focus:ring-blue-500'
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder='Enter your password'
            className='w-full bg-gray-300 px-3 py-2 rounded mb-3 outline-none focus:ring-2 focus:ring-blue-500'
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition'>
            Log In
          </button>
        </form>

        <div className='text-center text-white mt-4'>
          New User?
          <span
            className='text-red-400 cursor-pointer ml-1 hover:underline'
            onClick={() => navigate('/signup')}>
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
