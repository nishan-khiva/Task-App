import React, { useState, useEffect } from 'react'
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

const Profile = () => {
    const [userName, setUserName] = useState("Guest");
    const [email, setEmail] = useState("N/A");
    const [totalTasks, setTotalTasks] = useState(0);
    const [completedTasks, setCompletedTasks] = useState(0);
    const [incompletedTasks, setIncompletedTasks] = useState(0);
    const [importantTasks, setImportantTasks] = useState(0);
    const [editMode, setEditMode] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken);
                setUserName(decoded.username || "Guest");
                setEmail(decoded.email || "N/A");
                setToken(storedToken);
            } catch (error) {
                console.error("Invalid Token:", error);
                setUserName("Guest");
                setEmail("N/A");
            }
        }
    }, []);

    useEffect(() => {
        if (token) {
            fetchTasksCount(token);
        }
    }, [token]);
    const fetchTasksCount = async (token) => {
        try {
            const response = await axios.get("https://task-app-adqr.onrender.com/api/task/count", {
                headers: { Authorization: `Bearer ${token}` }
            });

            const { total, completed, incomplete, important } = response.data;

            // Correct field names
            setTotalTasks(total);
            setCompletedTasks(completed);
            setIncompletedTasks(incomplete);  // Ensure you're using `incomplete` not `incompleted`
            setImportantTasks(important);

        } catch (error) {
            console.error("Error fetching task count:", error);
        }
    };
    const handleEdit = () => {
        setEditMode(true);
    };
    const handleSave = async () => {
        try {
            const response = await axios.put('https://task-app-adqr.onrender.com/api/update',
                { username: userName, email },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("Updated:", response.data);
            setEditMode(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <>
            <div className="flex justify-between p-4">
                <h1 className="text-xl md:text-2xl font-bold">My Profile</h1>
            </div>

            {/* Profile Section */}
            <div className='bg-gray-200 rounded-lg p-4 py-6 shadow-2xl font-medium text-[18px] max-w-5xl mx-auto'>
                <div className='flex flex-col md:flex-row md:gap-6'>
                    <div className='flex items-center w-full md:w-1/2'>
                        <label className='w-1/3 md:w-[12vw] font-semibold'>Username</label>
                        {editMode ? (
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="border p-2 rounded w-full"
                            />
                        ) : (
                            <p className="text-gray-700">: {userName}</p>
                        )}
                    </div>

                    <div className='flex items-center w-full md:w-1/2'>
                        <label className='w-1/3 md:w-[12vw] font-semibold'>Email ID</label>
                        {editMode ? (
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border p-2 rounded w-full"
                            />
                        ) : (
                            <p className="text-gray-700">: {email}</p>
                        )}
                    </div>
                </div>

                <div className="mt-4">
                    {editMode ? (
                        <button
                            onClick={handleSave}
                            className='bg-blue-500 text-white px-4 py-2 rounded-lg transition hover:bg-blue-600'>
                            Update
                        </button>
                    ) : (
                        <button
                            onClick={handleEdit}
                            className='bg-green-400 text-white px-4 py-2 rounded-lg transition hover:bg-green-500'>
                            Edit
                        </button>
                    )}
                </div>
            </div>

            {/* Stats Section */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 w-full text-center'>
                <div className='bg-gray-200 rounded-lg p-5 shadow-lg transition hover:scale-105'>
                    <h3 className='text-lg font-bold'>Total Task</h3>
                    <div className='text-4xl font-mono text-gray-600 mt-4'>{totalTasks}</div>
                </div>

                <div className='bg-gray-200 rounded-lg p-5 shadow-lg transition hover:scale-105'>
                    <h3 className='text-lg font-bold'>Completed Task</h3>
                    <div className='text-4xl font-mono text-green-500 mt-4'>{completedTasks}</div>
                </div>

                <div className='bg-gray-200 rounded-lg p-5 shadow-lg transition hover:scale-105'>
                    <h3 className='text-lg font-bold'>Incomplete Task</h3>
                    <div className='text-4xl font-mono text-red-500 mt-4'>{incompletedTasks}</div>
                </div>

                <div className='bg-gray-200 rounded-lg p-5 shadow-lg transition hover:scale-105'>
                    <h3 className='text-lg font-bold'>Important Task</h3>
                    <div className='text-4xl font-mono text-yellow-500 mt-4'>{importantTasks}</div>
                </div>
            </div>
        </>
    );
}

export default Profile;
