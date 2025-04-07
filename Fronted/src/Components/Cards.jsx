import React, { useEffect, useState } from 'react';
import { FaHeart, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import axios from 'axios';
import InputData from './InputData';
import { FaPlusCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Cards = ({ filter, pageTitle }) => {
    const [inputDiv, setInputDiv] = useState("hidden");
    const [editTask, setEditTask] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('token');

    // Fetch Tasks
    const fetchTasks = async () => {
        try {
            setLoading(true);   // ⏳ लोडिंग शुरू
            const response = await axios.get(`https://task-app-adqr.onrender.com/api/task/?${filter}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching completed tasks:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [filter]);

    // Delete Task
    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setLoading(true);
                    await axios.delete(`https://task-app-adqr.onrender.com/api/task/${id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setTasks((prevTasks) => prevTasks.filter(task => task._id !== id));
                    setLoading(false);
                    Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
                } catch (error) {
                    console.error("Error deleting task:", error);
                    setLoading(false);
                    Swal.fire('Error!', 'Failed to delete the task.', 'error');
                }
            }
        });
    };
    // Edit Task
    const handleEdit = (task) => {
        setEditTask(task);
        setInputDiv("fixed");
    };
    // Complete/Incomplete  & Important
    const handleToggle = async (id, type, currentStatus) => {
        try {
            const updateField = type === "complete" ? { complete: !currentStatus } : { important: !currentStatus };
            await axios.put(`https://task-app-adqr.onrender.com/api/task/${id}`, updateField, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === id
                        ? { ...task, ...updateField }
                        : task
                )
            );
        } catch (error) {
            console.error(`Error updating ${type} status:`, error);
        }
    };
    return (
        <>
            {/* Header Section */}
            <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold">{pageTitle}</h1>
                <button onClick={() => setInputDiv("fixed")}
                    className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                    <FaPlusCircle size={24} />
                    <span>Add Task</span>
                </button>
            </div>

            {/* Task Grid */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 p-4">
                {tasks.map((item) => (
                    <div key={item._id} className="flex flex-col justify-between p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="max-h-[150px] overflow-y-auto break-words">
                            <h3 className="font-bold text-xl text-gray-800">{item.tittle}</h3>
                            <p className="text-gray-600 mt-2">{item.desc}</p>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={() => handleToggle(item._id, "complete", item.complete)}
                                className={`px-4 py-2 rounded-lg text-white font-semibold transition ${item.complete ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>
                                {item.complete ? "Complete" : "Incomplete"}
                            </button>

                            <div className="flex gap-3">
                                <button onClick={() => handleToggle(item._id, "important", item.important)}>
                                    <FaHeart size={22} className={item.important ? "text-red-500" : "text-gray-400 "} />
                                </button>
                                <button onClick={() => handleEdit(item)}>
                                    <FaEdit size={22} className="text-blue-500 hover:text-blue-700" />
                                </button>
                                <button onClick={() => handleDelete(item._id)}>
                                    <FaTrash size={22} className="text-gray-500 hover:text-red-500" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {/* Add Task Button */}
                <button onClick={() => setInputDiv("fixed")}
                    className="p-6 flex flex-col justify-center items-center bg-blue-100 rounded-xl hover:scale-105 hover:cursor-pointer transition-all duration-300">
                    <FaPlus size={40} className="text-blue-500" />
                    <h2 className="mt-2 font-bold text-blue-700">Add Task</h2>
                </button>
            </div>
            {/* InputData Component */}
            <InputData
                InputDiv={inputDiv}
                setInputDiv={setInputDiv}
                editTask={editTask}
                setEditTask={setEditTask}
                refresh={fetchTasks}
            />
        </>
    );
}

export default Cards;
