import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useState } from 'react';

const LogIn = () => {
  const [form, setForm] = useState({
    email: 'nishankhiva@gmail.com',
    password: '1234'
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const url = import.meta.env.VITE_API_URL
      const response = await axios.post(
        `${url}/login`,
        form
      );

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);

        setForm({
          email: '',
          password: ''
        });

        Swal.fire({
          icon: 'success',
          title: 'Welcome!',
          text: 'Login Successful',
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          navigate('/home');
        });
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        Swal.fire(
          'Error',
          error.response.data.message,
          'error'
        );
      } else {
        Swal.fire(
          'Oops!',
          'Something went wrong',
          'error'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 overflow-hidden">

      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full"></div>

      <div className="relative z-10 w-full max-w-7xl rounded-[35px] overflow-hidden border border-white/10 bg-[#0f172a]/90 backdrop-blur-xl shadow-2xl grid lg:grid-cols-2">

        {/* LEFT SECTION */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] relative">

          <div>

            {/* LOGO */}
            <div className="flex items-center gap-4 mb-20">

              <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300 text-2xl font-bold shadow-lg shadow-cyan-500/10">
                TM
              </div>

              <div>
                <h1 className="text-3xl font-bold text-white tracking-wide">
                  TaskFlow
                </h1>

                <p className="text-slate-400 mt-1">
                  Modern Workspace Platform
                </p>
              </div>
            </div>

            {/* TEXT */}
            <div>

              <h2 className="text-6xl font-black text-white leading-tight">
                Organize
                <br />
                Your Work
                <br />
                Efficiently
              </h2>

              <p className="text-slate-400 text-lg leading-relaxed mt-8 max-w-xl">
                Track projects, manage daily tasks, collaborate with
                teams and improve workflow using one powerful dashboard.
              </p>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-6 mt-16">

              <div className="bg-white/5 border border-white/10 rounded-3xl p-7 backdrop-blur-xl">
                <h3 className="text-5xl font-bold text-cyan-300">
                  12K+
                </h3>

                <p className="text-slate-400 mt-3">
                  Completed Tasks
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-7 backdrop-blur-xl">
                <h3 className="text-5xl font-bold text-cyan-300">
                  98%
                </h3>

                <p className="text-slate-400 mt-3">
                  Productivity Growth
                </p>
              </div>

            </div>
          </div>

          {/* BOTTOM BOX */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-7 backdrop-blur-xl mt-12">

            <p className="text-slate-300 text-lg leading-relaxed">
              Smart task management with real-time collaboration,
              secure workspace and powerful analytics tools.
            </p>

          </div>

        </div>

        {/* RIGHT SECTION */}
        <div className="bg-[#020617]/80 p-8 lg:p-16 flex items-center justify-center">

          <div className="w-full max-w-md">

            {/* HEADING */}
            <div className="mb-10">

              <h2 className="text-5xl font-bold text-white">
                Welcome Back
              </h2>

              <p className="text-slate-400 mt-4 text-lg">
                Login to continue to your workspace.
              </p>

            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* EMAIL */}
              <div>

                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full h-14 px-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:bg-white/[0.07] transition-all"
                  required
                />

              </div>

              {/* PASSWORD */}
              <div>

                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full h-14 px-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:bg-white/[0.07] transition-all"
                  required
                />

              </div>

              {/* OPTIONS */}
              <div className="flex items-center justify-between text-sm">

                <label className="flex items-center gap-2 text-slate-400 cursor-pointer">

                  <input
                    type="checkbox"
                    className="accent-cyan-400"
                  />

                  Remember me

                </label>

                <button
                  type="button"
                  className="text-cyan-400 hover:text-cyan-300 transition"
                >
                  Forgot Password?
                </button>

              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 rounded-2xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-70 disabled:cursor-not-allowed transition-all text-black font-bold text-lg shadow-lg shadow-cyan-500/20"
              >
                {
                  loading
                    ? 'Signing In...'
                    : 'Sign In'
                }
              </button>

            </form>

            {/* DIVIDER */}
            <div className="relative my-10">

              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>

              <div className="relative flex justify-center text-sm">

                <span className="bg-[#020617] px-4 text-slate-500">
                  OR CONTINUE WITH
                </span>

              </div>

            </div>

            {/* SOCIAL BUTTONS */}
            <div className="grid grid-cols-2 gap-4">

              <button className="h-14 rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all">
                Google
              </button>

              <button className="h-14 rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all">
                GitHub
              </button>

            </div>

            {/* FOOTER */}
            <div className="text-center mt-10">

              <p className="text-slate-500 text-sm">
                Don&apos;t have an account?
              </p>

              <button
                onClick={() => navigate('/signup')}
                className="mt-4 w-full h-14 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 font-semibold hover:bg-cyan-400 hover:text-black transition-all duration-300 shadow-lg shadow-cyan-500/10"
              >
                Create New Account
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;